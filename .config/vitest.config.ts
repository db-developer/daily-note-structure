import path from "path";
import { defineConfig } from "vitest/config";

const projectRoot = path.resolve(__dirname, "..");

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,

    // Projektroot eine Ebene über .config
    root: projectRoot,

    sequence: {
      shuffle: false,     // keine Zufallsreihenfolge
      concurrent: false,  // Tests NICHT parallel, sondern nacheinander
    },
    setupFiles: [ path.resolve(projectRoot, "src/test/__setup__/globals.ts") ],
    include: ["src/test/**/00.00.sequence.of.test.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      exclude: [
        "**/test/**",
        "**/*.test.ts",
        "**/*.spec.ts"
      ]
    }
  },
  resolve: {
    alias: {
      obsidian:           path.resolve(projectRoot, "src/test/__mocks__/obsidian.ts"),
      "ts-obsidian-log":  path.resolve(projectRoot, "src/test/__mocks__/ts-obsidian-log.ts")
    },
  },
});