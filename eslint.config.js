import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      // Remove ...tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "simple-import-sort": simpleImportSort,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react-x': reactX,
      'react-dom': reactDom,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // `react` related packages comes first
            ['^(react)', '^@?\\w'],
            // Packages that starts with `@` comes next
            ['^@?\\w'],
            // store, slices, hooks, models, constants, theme.
            [
              '^(app)(/.*|$)',
              '^(features/\\w*/slices)(/.*|$)',
              '^(features/\\w*/hooks)(/.*|$)',
              '^(features/\\w*/utils)(/.*|$)',
              '^(common/\\w*/models)(/.*|$)',
              '^(common/\\w*/constants)(/.*|$)',
              '^(common/\\w*/theme)(/.*|$)',
            ],

            // utils
            ['^(common/\\w*/utils)(/.*|$)'],

            // features (components, pages, etc.)
            ['^(features)(/.*|$)'],

            // navigations
            ['^(navigations)(/.*|$)'],

            // assets
            ['^(common/\\w*/assets)(/.*|$)'],

            // styles
            ['^(.css|.scss)$'],

            // other imports
            ['^\\u0000'],
          ],
        }
      ],
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...reactX.configs['recommended-typescript'].rules,
      ...reactDom.configs.recommended.rules,
    },
  },
)
