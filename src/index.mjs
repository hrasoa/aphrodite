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
      jsxA11y.flatConfigs.recommended,
      // react.configs.flat.recommended,
      // react.configs.flat['jsx-runtime'],
      {
        languageOptions: {
          parserOptions: {
            ecmaFeatures: {
              jsx: true,
            },
          },
        },
        plugins: {
          react,
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
          'jsx-a11y/no-static-element-interactions': 'off',
          'jsx-a11y/click-events-have-key-events': 'off',
          'jsx-a11y/no-autofocus': 'off',
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
      }
    ),
    formatter: defineConfig(
      prettierConfig,
    ),
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
          //   const opened = {
          //     icon: icon_opened_id && icon_opened_type ? {
          //       id: icon_opened_id, // error
          //       type: icon_opened_type, // error
          //     } : null,
          //     icon_custom_id: icon_opened_custom?.id || null, // error
          //   };
          '@typescript-eslint/no-unsafe-assignment': 'off',
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
                extensions: ['.js', '.ts', '.tsx'],
              },
            },
          },
        },
      }
    ),
  },
};
