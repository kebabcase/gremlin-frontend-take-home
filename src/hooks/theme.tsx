import { useCallback } from "react";
import { useCookies } from "react-cookie";

const cookieName = "gremlin_fe_takehome_theme";
export type Theme = "light" | "dark";

export function useTheme() {
  const [cookies, setCookie] = useCookies([cookieName]);

  const setTheme = useCallback(
    (theme: Theme) => {
      setCookie(cookieName, theme, { path: "/" });

      const opposite = theme === "light" ? "dark" : "light";
      if (document.documentElement.classList.contains(opposite)) {
        document.documentElement.classList.remove(opposite);
      }
      document.documentElement.classList.add(theme);
    },
    [setCookie]
  );

  return [cookies[cookieName] ?? "light", setTheme];
}
