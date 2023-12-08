import { isEqual } from 'lodash-es'
import { ref, toRaw, watch } from 'vue'

import { Storage } from '@plasmohq/storage'


export enum StorageKey {
  searxHostname = 'searxHostname'
}

const storage = new Storage()

export function useSearxHostname() {
  const searxHostname = ref<string>('searx.be')

  // Save the value to storage when it changes
  watch(searxHostname, async (newValue, oldValue) => {
    newValue = toRaw(newValue)
    oldValue = toRaw(oldValue)

    if (isEqual(newValue, oldValue)) {
      return
    }

    // TODO: Skip until initial value is set

    await storage.set(StorageKey.searxHostname, newValue)

    console.debug('watch: searxHostname changed', { newValue, oldValue })
  })

  // Watch for changes to the storage
  storage.watch({
    [StorageKey.searxHostname]: (changes) => {
      searxHostname.value = changes.newValue

      setHostnameRules(changes.newValue)
    }
  })

  // Load the initial value from storage
  storage.get(StorageKey.searxHostname).then((value) => {
    if (value == null) {
      return
    }

    searxHostname.value = value

    console.debug('Loaded searxHostname from storage', value)
  })

  return {
    searxHostname
  }
}

async function setHostnameRules(searxHostname: string) {
  // Verify hostname
  try {
    new URL(`https://${searxHostname}`)
  } catch (error) {
    console.error('Invalid hostname:', searxHostname)
    return
  }

  const result = chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [3],
    addRules: [
      {
        id: 3,
        priority: 10,
        action: {
          type: 'redirect',
          redirect: {
            transform: {
              host: searxHostname
            }
          }
        },
        condition: {
          urlFilter: '||searx.localhost',
          resourceTypes: ['main_frame', 'sub_frame']
        }
      }
    ]
  })
}