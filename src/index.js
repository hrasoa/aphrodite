// eslint-disable-next-line no-undef
module.exports = {
  configs: {
    typescript: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'import'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/typescript',
        'plugin:import/warnings',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'prettier',
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
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        // Prevents:
        // .map(a => {
        //    .map(a => {
        'no-shadow': 'error',
        'no-underscore-dangle': 'off',
        'arrow-body-style': 'off',
        // No need to add the extension when importing a module.
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
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
              'index',
              'object',
            ],
            pathGroups: [
              {
                pattern: 'react',
                group: 'builtin',
              },
              {
                pattern: '~/**',
                group: 'internal',
              },
            ],
            pathGroupsExcludedImportTypes: ['react'],
            alphabetize: { order: 'asc', caseInsensitive: true },
          },
        ],
        'jsx-a11y/label-has-associated-control': [
          'error',
          {
            labelAttributes: ['htmlFor'],
          },
        ],
        'no-console': 'warn',
        // Fixes fn() declarations
        'no-use-before-define': 'off',
        // In instance, inside the React.forwardRef component, the callback should be named.
        'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
        'react/jsx-props-no-spreading': 'off',
        // Not have to add the extension when importing a module.
        'react/jsx-filename-extension': 'off',
        // Legacy
        'react/prop-types': 'off',
        // Only functions for named components.
        'react/function-component-definition': [
          'error',
          { namedComponents: 'function-declaration' },
        ],
        // Use functional component.
        'react/require-default-props': 'off',
        // Allows return <>{foo}</>;
        'react/jsx-no-useless-fragment': ['error', { allowExpressions: true }],
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
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
        },
        'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
        'import/resolver': {
          typescript: {
            alwaysTryTypes: true,
            project: '**/*/tsconfig.json',
            node: {
              extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
          },
        },
        react: { version: 'detect' },
      },
    },
  },
};
