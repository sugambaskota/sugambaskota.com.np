import { IoMail } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";

export default function HomeHero() {
  return (
    <div className="container flex min-h-[calc(100vh-56px)] flex-col items-stretch sm:flex-row-reverse sm:gap-x-2">
      <div className="mt-8 flex items-center justify-center sm:m-0 sm:flex-1">
        <img src="/me.jpg" alt="" className="w-9/12 rounded-full" />
      </div>
      <div className="mt-16 flex items-center justify-center sm:mt-0 sm:flex-1">
        <div className="space-y-10">
          <p className="font-bold uppercase text-neutral-600 transition-colors duration-500 dark:text-neutral-200">
            <span className="border-b-2 border-emerald-600 pb-1">Hello</span>, I
            am
          </p>
          <div>
            <h1 className="text-5xl font-bold text-neutral-800 transition-colors duration-500 dark:text-neutral-100">
              Sugam Baskota
            </h1>
            <h2 className="mt-3 text-lg font-bold text-neutral-600 transition-colors duration-500 dark:text-neutral-200">
              Web Developer
            </h2>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center space-x-3">
              <IoMail
                size={20}
                className="text-emerald-600 transition-colors duration-500"
              />
              <a
                href="mailto:sugambaskota@gmail.com"
                className="text-base text-neutral-600 transition-colors duration-500 dark:text-neutral-200"
              >
                sugambaskota@gmail.com
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <BsTelephoneFill
                size={20}
                className="text-emerald-600 transition-colors duration-500"
              />
              <a
                href="tel:9808728092"
                className="text-neutral-600 transition-colors duration-500 dark:text-neutral-200"
              >
                +977 9808728092
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
