module.exports = {
  configs: {
    typescript: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint', 'jest', 'import'],
      extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:jest/recommended',
        'plugin:react/jsx-runtime',
        'prettier',
      ],
      env: {
        'jest/globals': true,
        browser: true,
      },
      rules: {
        '@typescript-eslint/no-use-before-define': [
          'error',
          {
            functions: false,
            typedefs: false,
          },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        'arrow-body-style': 'off',
        // No need to add the extension when importing a module.
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-import-module-exports': 'off',
        // Enforce named exports
        'import/prefer-default-export': 'off',
        'jsx-a11y/label-has-associated-control': [
          'error',
          {
            labelAttributes: ['htmlFor'],
          },
        ],
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
        'react/jsx-sort-props': 'error',
        // Not use bind() anymore.
        'react/jsx-no-bind': 'off',
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts', '.tsx', '.js', '.jsx'],
        },
        'import/extensions': ['.ts', '.tsx', '.js', '.jsx'],
        'import/resolver': {
          typescript: {
            // Always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`.
            // This make our linked packages work.
            alwaysTryTypes: true,
          },
        },
        react: { version: 'detect' },
      },
    },
  },
};
