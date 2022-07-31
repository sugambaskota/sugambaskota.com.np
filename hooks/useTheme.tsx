import * as React from "react";

import { ThemeContext } from "context/theme/ThemeContext";

export default function useTheme() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  React.useEffect(() => {
    const colorTheme = theme === "light" ? "dark" : "light";
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
  }, [theme]);

  return [theme, toggleTheme];
}
