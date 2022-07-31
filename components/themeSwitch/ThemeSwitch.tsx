import useTheme from "hooks/useTheme";

export default function ThemeSwitch() {
  const [theme, toggleTheme] = useTheme();

  return (
    <span className="inline-flex items-center justify-center">
      <input
        type="checkbox"
        checked={theme === "dark"}
        onChange={toggleTheme}
        className="h-4 w-4 cursor-pointer appearance-none rounded-full text-black shadow-[inset_8px_-4px_0] outline-none transition-all duration-500 checked:scale-75 checked:text-white checked:shadow-[inset_0_0_0_16px,-11px_0_0_-6.4px,11px_0_0_-6.4px,0_-11px_0_-6.4px,0_11px_0_-6.4px,-7.8px_-7.8px_0_-6.4px,7.8px_7.8px_0_-6.4px,-7.8px_7.8px_0_-6.4px,7.8px_-7.8px_0_-6.4px]"
      />
    </span>
  );
}
