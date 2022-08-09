import * as React from "react";
import Link from "next/link";

import ThemeSwitch from "components/themeSwitch/ThemeSwitch";
import useTheme from "hooks/useTheme";
import Ham from "components/ham/Ham";

export default function MobileHeader() {
  const [isHamOpen, setIsHamOpen] = React.useState(false);
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

  const closeMenu = () => setIsHamOpen(false);

  const toggleMenu = () => setIsHamOpen(!isHamOpen);

  return (
    <div>
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
        {/* Mobile header start */}
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
          <div className="absolute top-0 bottom-0 right-0 z-[100]">
            <Ham isHamOpen={isHamOpen} toggleMenu={toggleMenu} />
          </div>
        </div>
        {/* Mobile header end */}

        {/* Mobile hamburger overlay start */}
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-[99] cursor-pointer bg-[rgba(0,0,0,0.5)] transition-all duration-500"
          style={{
            visibility: isHamOpen ? "visible" : "hidden",
            opacity: isHamOpen ? 1 : 0,
          }}
        />
        {/* Mobile hamburger overlay end */}

        {/* Mobile hamburger menu start */}
        <div
          className="fixed top-0 right-0 bottom-0 z-[99] w-[calc(min(80%,20rem))] bg-neutral-100 text-black dark:bg-neutral-800 dark:text-white"
          style={{
            transform: isHamOpen ? "translateX(0)" : "translateX(100%)",
            transition: `transform 0.5s ease ${
              !isHamOpen ? "0.5s" : "0s"
            }, background 0.5s ease`,
          }}
        >
          <ul className="mt-[3.5rem] flex flex-col space-y-4 pl-6 font-bold">
            <li className="slide_in">
              <a href="#home" onClick={closeMenu}>
                HOME
              </a>
            </li>
            <li className="slide_in">
              <a href="#about" onClick={closeMenu}>
                ABOUT
              </a>
            </li>
            <li className="slide_in">
              <Link href="/blog">
                <a onClick={closeMenu}>BLOG</a>
              </Link>
            </li>
            <li className="slide_in">
              <a href="#contact" onClick={closeMenu}>
                CONTACT
              </a>
            </li>
            <li className="slide_in">
              <ThemeSwitch />
            </li>
          </ul>
        </div>
        {/* Mobile hamburger menu end */}
      </header>
      <style jsx>
        {`
          .slide_in {
            transform: ${isHamOpen ? "translateX(0)" : "translateX(100%)"};
            transition: transform 1s ease;
          }
          .slide_in:nth-child(1) {
            transition-delay: 0s;
          }
          .slide_in:nth-child(2) {
            transition-delay: 0.1s;
          }
          .slide_in:nth-child(3) {
            transition-delay: 0.2s;
          }
          .slide_in:nth-child(4) {
            transition-delay: 0.3s;
          }
          .slide_in:nth-child(5) {
            transition-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
}
