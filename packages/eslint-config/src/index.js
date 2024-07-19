import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import parserTs from '@typescript-eslint/parser'
import pluginVue from 'eslint-plugin-vue'

const defaultConfig = [
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  }),
  ...tseslint.config(
    ...tseslint.configs.stylistic,
    ...tseslint.configs.strict,
    {
      plugins: {
        '@stylistic': stylistic,
      },
      languageOptions: {
        parser: parserTs,
      },
      rules: {
        'no-var': 'error',
        'prefer-const': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'no-undef-init': 'error',

        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-extra-semi': 'off',
        '@typescript-eslint/no-extra-semi': 'error',
        '@stylistic/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'comma',
              requireLast: true,
            },
            singleline: {
              delimiter: 'comma',
              requireLast: true,
            },
          },
        ],

      },
    },
  ),
]

export const vueConfig = [
  ...defaultConfig,
  ...pluginVue.configs['flat/strongly-recommended'],
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-quotes': ['error', 'single', { avoidEscape: true }],
      'vue/attributes-order': [
        'error',
        {
          order: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            ['UNIQUE', 'SLOT'],
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'OTHER_ATTR',
            'EVENTS',
            'CONTENT',
          ],
          alphabetical: true,
        },
      ],
    },
  },
]

export default defaultConfig
