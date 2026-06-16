import js from "@eslint/js";
import globals from "globals";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- NOTE(harunou): add typecheck once a type declarations is implemented
// @ts-ignore
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment -- NOTE(harunou): add typecheck once a type declarations is implemented
// @ts-ignore
import importPlugin from "eslint-plugin-import";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      "import/resolver": {
        typescript: true,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["error", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-import-type-side-effects": "error",
      "import/no-named-as-default-member": "off",
      "import/no-internal-modules": [
        "error",
        {
          allow: [
            "@reduxjs/toolkit/query/**",
            "@testing-library/jest-dom/**",
            "msw/**",
            "vitest/**",
            "react-dom/**",
            "**/utils/testing",
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "import/no-internal-modules": "off",
    },
  },
);
