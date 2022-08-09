import * as React from "react";
import Link from "next/link";

import ThemeSwitch from "components/themeSwitch/ThemeSwitch";
import useTheme from "hooks/useTheme";

export default function DesktopHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [theme] = useTheme();

  React.useEffect(() => {
    function handleScroll(e: any) {
      if (window.scrollY > 0 && !isScrolled) {
        return setIsScrolled(true);
      }

      if (window.scrollY < 1) {
        return setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return function () {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[99] h-[56px] bg-neutral-100 text-black transition-all duration-500 dark:bg-neutral-700 dark:text-white"
      style={{
        boxShadow: isScrolled
          ? theme === "light"
            ? "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)"
            : "0 1px 3px 0 rgb(0 0 0 / 0.2), 0 1px 2px -1px rgb(0 0 0 / 0.2)"
          : "none",
      }}
    >
      {/* Desktop header start */}
      <div className="container flex h-full items-center justify-between gap-2">
        <Link href="/">
          <div
            className="h-10 w-10 cursor-pointer transition-[background] duration-500"
            style={{
              background:
                theme === "dark"
                  ? 'url("/logo_light.png") no-repeat center center/contain'
                  : 'url("/logo_dark.png") no-repeat center center/contain',
            }}
          ></div>
        </Link>
        <ul className="hidden items-center space-x-6 font-bold leading-tight sm:flex">
          <li>
            <a href="#home">HOME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <Link href="/blog">
              <a>BLOG</a>
            </Link>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
          <li>
            <ThemeSwitch />
          </li>
        </ul>
      </div>
      {/* Desktop header end */}
      <style jsx>
        {`
          a {
            transition: none;
          }
        `}
      </style>
    </header>
  );
}
