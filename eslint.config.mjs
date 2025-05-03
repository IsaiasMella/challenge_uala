import { fixupConfigRules } from "@eslint/compat";
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactJsx from "eslint-plugin-react/configs/jsx-runtime.js";
import react from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import ts from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";

export default [
  { 
    languageOptions: { 
      globals: globals.browser, 
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    files: ["**/*.ts", "**/*.tsx"]
  },
  {
    files: ["*.js", "*.jsx", "*.mjs", "*.cjs", "*.config.js", "*.config.mjs"],
    languageOptions: {
      globals: {
        ...globals.node,
        module: true
      },
      sourceType: 'module',
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...fixupConfigRules([
    {
      ...react,
      settings: {
        react: { version: "detect" },
      },
    },
    reactJsx,
  ]),
  {
    plugins: { 
      "react-hooks": reactHooks,
      "import": importPlugin
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
      "no-console": "off",
      "no-restricted-syntax": [
        "error",
        {
          "selector": "CallExpression[callee.object.name='console'][callee.property.name='log']",
          "message": "Unexpected console.log statement. Use console.error or console.warn instead."
        }
      ],
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "ignoreRestSiblings": true,
        "args": "none"
      }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": ["error", { "extensions": [".tsx", ".jsx"] }],
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "import/prefer-default-export": "off",
      "import/no-extraneous-dependencies": ["error", {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }],
      "arrow-body-style": "off",
      "no-param-reassign": ["error", { "props": false }],
      "no-underscore-dangle": "off",
      "react/function-component-definition": [
        2,
        { 
          "namedComponents": ["arrow-function", "function-declaration"],
          "unnamedComponents": "arrow-function"
        }
      ],
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
      "max-lines": ["error", { "max": 160, "skipBlankLines": true, "skipComments": true }],
      "max-len": ["warn", { 
        "code": 120,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true,
        "ignoreComments": true
      }]
    },
  },
  { ignores: ["dist/", "node_modules/", ".next/"] },
];
