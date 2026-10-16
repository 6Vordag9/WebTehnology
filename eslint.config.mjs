// Конфигурация ESLint для статических страниц лабораторных работ.
// Проверяются только js-файлы сайта: node_modules и venv исключены.

import js from '@eslint/js';

export default [
  {
    ignores: ['node_modules/**', 'venv/**'],
  },
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: 'error',
    },
  },
];