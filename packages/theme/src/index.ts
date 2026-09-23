import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "zai-light" | "zai-dark" | "system";
export type ResolvedTheme = "light" | "dark";

const DEFAULT_STORAGE_KEY = "zcode-ui-theme";
const BROWSER_THEME_SURFACE_ATTRIBUTE = "data-zcode-ui-browser-theme-surface";

export type ThemeOptions = {
  /** localStorage key for theme preference. Default: "zcode-ui-theme" */
  storageKey?: string;
  /** Initial theme when nothing is stored. Default: "zai-dark" */
  defaultTheme?: Theme;
};

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(theme: Theme): ResolvedTheme {
  if (theme === "system") {
    return getSystemTheme();
  }
  return theme === "dark" || theme === "zai-dark" ? "dark" : "light";
}

export function normalizeThemePreference(theme: Theme): Theme {
  if (theme === "dark") return "zai-dark";
  if (theme === "light") return "zai-light";
  return theme;
}

function setThemeMetaContent(name: "theme-color" | "color-scheme", content: string) {
  let meta = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.append(meta);
  }
  meta.content = content;
}

function syncBrowserThemeSurface(resolved: ResolvedTheme) {
  const root = document.documentElement;
  if (
    typeof root.hasAttribute !== "function" ||
    !root.hasAttribute(BROWSER_THEME_SURFACE_ATTRIBUTE)
  ) {
    return;
  }

  root.setAttribute(BROWSER_THEME_SURFACE_ATTRIBUTE, resolved);
  root.style.colorScheme = resolved;
  setThemeMetaContent("color-scheme", resolved);

  const background = getComputedStyle(root).getPropertyValue("--color-background").trim();
  if (background) {
    setThemeMetaContent("theme-color", background);
  }
}

/**
 * Apply theme classes on <html>:
 * - `.dark` when resolved dark
 * - `.theme-zai-light` / `.theme-zai-dark` for ZCode token palettes
 */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  const resolved = resolveTheme(theme);
  const appliedTheme =
    theme === "system"
      ? resolved === "dark"
        ? "zai-dark"
        : "zai-light"
      : normalizeThemePreference(theme);
  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.classList.toggle("theme-zai-light", appliedTheme === "zai-light");
  document.documentElement.classList.toggle("theme-zai-dark", appliedTheme === "zai-dark");
  syncBrowserThemeSurface(resolved);
}

function isTheme(value: string | null): value is Theme {
  return (
    value === "light" ||
    value === "dark" ||
    value === "zai-light" ||
    value === "zai-dark" ||
    value === "system"
  );
}

/** Opt into browser chrome/meta theme sync by setting this attribute on <html>. */
export function enableBrowserThemeSurface() {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute(BROWSER_THEME_SURFACE_ATTRIBUTE, "");
}

export function useTheme(options: ThemeOptions = {}) {
  const storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;
  const defaultTheme = options.defaultTheme ?? "zai-dark";

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return normalizeThemePreference(defaultTheme);
    const saved = localStorage.getItem(storageKey);
    return isTheme(saved) ? normalizeThemePreference(saved) : normalizeThemePreference(defaultTheme);
  });

  const setTheme = useCallback(
    (t: Theme) => {
      const normalizedTheme = normalizeThemePreference(t);
      localStorage.setItem(storageKey, normalizedTheme);
      setThemeState(normalizedTheme);
      applyTheme(normalizedTheme);
    },
    [storageKey],
  );

  useEffect(() => {
    applyTheme(theme);
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return { theme, setTheme } as const;
}
