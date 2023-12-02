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
      // "off" or 0 - turn the rule off
      // "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
      // "error" or 2 - turn the rule on as an error (exit code will be 1)
      rules: {
        '@typescript-eslint/no-use-before-define': [
          2,
          {
            functions: false,
            typedefs: false,
          },
        ],
        '@typescript-eslint/consistent-type-definitions': [2, 'type'],
        'arrow-body-style': 0,
        // We do not have to add the extension when importing a module.
        'import/extensions': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-import-module-exports': 0,
        // No!
        'import/prefer-default-export': 0,
        'jsx-a11y/label-has-associated-control': [
          2,
          {
            labelAttributes: ['htmlFor'],
          },
        ],
        // Fixes ts, fn()
        'no-use-before-define': 0,
        // In instance, inside the React.forwardRef component, the callback should be named.
        'prefer-arrow-callback': [2, { allowNamedFunctions: true }],
        'react/jsx-props-no-spreading': 0,
        // We do not have to add the extension when importing a module.
        'react/jsx-filename-extension': 0,
        // Ts only.
        'react/prop-types': 0,
        // Only functions for named components.
        'react/function-component-definition': [
          2,
          { namedComponents: 'function-declaration' },
        ],
        // We use functional component.
        'react/require-default-props': 0,
        // Allows return <>{foo}</>;
        'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
        // Improves lisibility.
        'react/jsx-sort-props': 2,
        // We do not use bind() anymore.
        'react/jsx-no-bind': 0,
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
