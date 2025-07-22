import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier/flat';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default {
  configs: {
    react: defineConfig([
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      reactHooks.configs['recommended-latest'],
      {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },
          globals: {
            ...globals.browser,
          },
        },
        extends: [
          importPlugin.flatConfigs.recommended,
          importPlugin.flatConfigs.typescript,
        ],
        rules: {
          'import/order': [
            'error',
            {
              groups: [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'type',
                'index',
                'object',
              ],
              pathGroups: [
                {
                  pattern: 'react',
                  group: 'builtin',
                },
                {
                  pattern: 'react-dom',
                  group: 'builtin',
                },
                {
                  pattern: '~/**',
                  group: 'internal',
                },
              ],
              pathGroupsExcludedImportTypes: ['react'],
              alphabetize: {
                caseInsensitive: true,
                order: 'asc',
                orderImportKind: 'desc',
              },
            },
          ],
          'jsx-a11y/label-has-associated-control': [
            'error',
            {
              labelAttributes: ['htmlFor'],
            },
          ],
          // In instance, inside the React.forwardRef component, the callback should be named.
          'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
          'react/jsx-props-no-spreading': 'off',
          // Not have to add the extension when importing a module.
          'react/jsx-filename-extension': 'off',
          // Only functions for named components.
          'react/function-component-definition': [
            'error',
            { namedComponents: 'function-declaration' },
          ],
          'react/prop-types': 'off',
          // Use functional component.
          'react/require-default-props': 'off',
          // Allows return <>{foo}</>;
          'react/jsx-no-useless-fragment': [
            'error',
            { allowExpressions: true },
          ],
          // Improves lisibility.
          'react/jsx-sort-props': [
            'error',
            {
              reservedFirst: true,
              ignoreCase: true,
            },
          ],
        },
        settings: {
          react: { version: 'detect' },
        },
      },
    ]),
    typescript: tseslint.config(
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.recommendedTypeChecked,
      prettierConfig,
      {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
          },
          globals: {
            ...globals.es2021,
          },
        },
        extends: [
          importPlugin.flatConfigs.recommended,
          importPlugin.flatConfigs.typescript,
        ],
        rules: {
          '@typescript-eslint/no-use-before-define': [
            'error',
            {
              functions: false,
              typedefs: false,
            },
          ],
          '@typescript-eslint/naming-convention': [
            'error',
            {
              selector: ['variable'],
              format: ['PascalCase', 'camelCase', 'snake_case', 'UPPER_CASE'],
              leadingUnderscore: 'allow',
            },
          ],
          // Array<>
          '@typescript-eslint/array-type': ['error', { default: 'generic' }],
          // Use only Type
          '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
          '@typescript-eslint/consistent-type-exports': 'error',
          // import type { } from ''
          '@typescript-eslint/consistent-type-imports': 'error',
          '@typescript-eslint/no-import-type-side-effects': 'error',
          // Prevents:
          // .map(a => {
          //    .map(a => {
          'no-shadow': 'error',
          'no-underscore-dangle': 'off',
          'arrow-body-style': 'off',
          // No need to add the extension when importing a module.
          'import/extensions': 'off',
          'import/no-extraneous-dependencies': 'off',
          'import/no-cycle': 'error',
          'import/no-import-module-exports': 'off',
          // Enforce named exports
          'import/prefer-default-export': 'off',
          'import/no-unresolved': 'error',
          'import/order': [
            'error',
            {
              groups: [
                'builtin',
                'external',
                'internal',
                'parent',
                'sibling',
                'type',
                'index',
                'object',
              ],
              pathGroups: [
                {
                  pattern: '~/**',
                  group: 'internal',
                },
              ],
              alphabetize: {
                caseInsensitive: true,
                order: 'asc',
                orderImportKind: 'desc',
              },
            },
          ],
          'no-console': 'warn',
          // Fixes fn() declarations
          'no-use-before-define': 'off',
        },
        settings: {
          'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
          },
          'import/extensions': ['.ts', '.tsx'],
          'import/resolver': {
            typescript: {
              alwaysTryTypes: true,
              node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
              },
            },
          },
        },
      }
    ),
  },
};
