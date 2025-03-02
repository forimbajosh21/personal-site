export default {
  "*.{ts,tsx}": [
    "prettier --write",
    "eslint .",
    "bash -c 'tsc --noEmit'",
  ],
}