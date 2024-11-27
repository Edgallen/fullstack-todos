import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import pluginNext from "@next/eslint-plugin-next";
import baseConfig from "./base.js";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
const config = [
    ...baseConfig,
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        ...pluginReact.configs.flat.recommended,
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
            },
        },
    },
    {
        plugins: {
            "@next/next": pluginNext,
        },
        rules: {
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs["core-web-vitals"].rules,
            "object-curly-spacing": ["error", "always"],
            "semi": [
                "error",
                "always"
            ],
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/adjacent-overload-signatures": "error",
            "quotes": ["error", "double", { "allowTemplateLiterals": true }],
            "@typescript-eslint/quotes": "off",
            "import/order": "off",
            "import/prefer-default-exports": "off",
            "import/no-extraneous-dependencies": "off",
            "@typescript-eslint/no-redeclare": "off",
            "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }],
            "eol-last": ["error", "always"],
            "no-trailing-spaces": "error"
        },
    },
    {
        plugins: {
            "react-hooks": pluginReactHooks,
        },
        settings: { react: { version: "detect" } },
        rules: {
            ...pluginReactHooks.configs.recommended.rules,
            // React scope no longer necessary with new JSX transform.
            "react/react-in-jsx-scope": "off",
        },
    },
];

export default config
