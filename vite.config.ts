import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "unit",
    include: ["src/**/*.spec.ts"], // include files spec.ts format
    exclude: ["src/**/*.e2e.spec.ts"],
  },
});
