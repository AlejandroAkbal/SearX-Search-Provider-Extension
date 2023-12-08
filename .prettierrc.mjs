/**
 * @type {import('prettier').Options}
 */
export default {
  printWidth: 120,
  semi: false,
  singleQuote: true,
  trailingComma: "none",

  vueIndentScriptAndStyle: true,
  singleAttributePerLine: true,

  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
  importOrder: [
    "<BUILTIN_MODULES>", // Node.js built-in modules
    "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
    "", // Empty line
    "^@plasmo/(.*)$",
    "",
    "^@plasmohq/(.*)$",
    "",
    "^~(.*)$",
    "",
    "^[./]"
  ]
}
