import { defineConfig } from "tsup";

export default defineConfig({
    entry: ['src/**/*.ts', '!src/**/**/**/*.spec.ts', '!src/**/**/**/*.e2e-spec.ts'],
})