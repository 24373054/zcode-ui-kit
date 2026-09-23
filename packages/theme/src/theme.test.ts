import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { applyTheme, resolveTheme, normalizeThemePreference } from "./index.js";

describe("resolveTheme", () => {
  it("maps zai-dark and dark to dark", () => {
    expect(resolveTheme("zai-dark")).toBe("dark");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("maps zai-light and light to light", () => {
    expect(resolveTheme("zai-light")).toBe("light");
    expect(resolveTheme("light")).toBe("light");
  });
});

describe("normalizeThemePreference", () => {
  it("normalizes legacy light/dark", () => {
    expect(normalizeThemePreference("light")).toBe("zai-light");
    expect(normalizeThemePreference("dark")).toBe("zai-dark");
    expect(normalizeThemePreference("system")).toBe("system");
  });
});

describe("applyTheme", () => {
  beforeEach(() => {
    document.documentElement.className = "";
  });

  afterEach(() => {
    document.documentElement.className = "";
  });

  it("applies dark + theme-zai-dark classes", () => {
    applyTheme("zai-dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.classList.contains("theme-zai-dark")).toBe(true);
    expect(document.documentElement.classList.contains("theme-zai-light")).toBe(false);
  });

  it("applies light theme classes", () => {
    applyTheme("zai-light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.classList.contains("theme-zai-light")).toBe(true);
  });
});
