import * as React from "react";

export const ThemeContext = React.createContext({} as any);

export default function ThemeProvider({ children }: any) {
  const [theme, setTheme] = React.useState("dark");

  const toggleTheme = () => {
    const colorTheme = theme === "light" ? "dark" : "light";
    setTheme(colorTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
