import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    rules: {
      "no-console": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",
      "preserve-caught-error": "off",
    },
  },
  {
    files: [
      "src/__tests__/**/*.ts",
      "src/scripts/**/*.ts",
      "src/verify_all.ts",
    ],
    rules: {
      "no-console": "off",
    },
  },
);
