import baseConfig from "./base.js";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import {commonRules} from "./rules/commonTypeScript.js";

const config = [
    ...baseConfig,
    js.configs.recommended,
    eslintConfigPrettier,
    ...tseslint.configs.recommended,
    {
        rules: {
            ...commonRules
        },
    }
]

export default config
