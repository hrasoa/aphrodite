import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';

export default {
  configs: {
    react: defineConfig(
      reactHooks.configs['recommended-latest'],
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      {
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
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
          'jsx-a11y/click-events-have-key-events': 'off',
          'jsx-a11y/no-autofocus': 'off',
          'jsx-a11y/no-static-element-interactions': 'off',
          // In instance named callback inside the `forwardRef`.
          'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
          'react/jsx-sort-props': [
            'error',
            {
              reservedFirst: true,
              ignoreCase: true,
            },
          ],
          'react/function-component-definition': [
            'error',
            { namedComponents: 'function-declaration' },
          ],
          'react/jsx-props-no-spreading': 'off',
          'react/jsx-filename-extension': 'off',
          // Allows return <>{foo}</>;
          'react/jsx-no-useless-fragment': [
            'error',
            { allowExpressions: true },
          ],
          'react/prop-types': 'off',
          'react/require-default-props': 'off',
        },
        settings: {
          react: { version: 'detect' },
        },
      }
    ),
    formatter: defineConfig(prettierConfig),
    typescript: tseslint.config(
      js.configs.recommended,
      tseslint.configs.strict,
      tseslint.configs.recommendedTypeChecked,
      {
        languageOptions: {
          parser: tseslint.parser,
          parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
          },
        },
        plugins: {
          'unused-imports': unusedImports,
        },
        extends: [
          importPlugin.flatConfigs.recommended,
          importPlugin.flatConfigs.typescript,
        ],
        rules: {
          // fixes:
          //   const x = {
          //     a: b ? {
          //       c: b, // error
          //     } : null,
          //   };
          '@typescript-eslint/no-unsafe-assignment': 'off',
          'no-use-before-define': 'off',
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
          '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
          '@typescript-eslint/consistent-type-exports': 'error',
          '@typescript-eslint/consistent-type-imports': 'error',
          '@typescript-eslint/no-redeclare': 'off',
          '@typescript-eslint/no-import-type-side-effects': 'error',
          'arrow-body-style': 'off',
          'import/extensions': 'off',
          'import/no-cycle': [
            'error',
            { allowUnsafeDynamicCyclicDependency: true },
          ],
          'import/no-extraneous-dependencies': 'off',
          'import/no-import-module-exports': 'off',
          'import/no-unresolved': 'error',
          'import/prefer-default-export': 'off',
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
          'no-redeclare': 'off',
          // Prevents:
          // .map(a => {
          //    .map(a => {
          'no-shadow': 'error',
          'no-underscore-dangle': 'off',
          'unused-imports/no-unused-imports': 'error',
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
                extensions: ['.ts', '.tsx'],
              },
            },
          },
        },
      }
    ),
  },
};
