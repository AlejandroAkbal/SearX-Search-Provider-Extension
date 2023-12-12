import { useSearxHostname } from '~composables/use-searx-hostname'

(async () => {
  const { searxHostname } = useSearxHostname()

  console.info(`Background script is running`)
})()