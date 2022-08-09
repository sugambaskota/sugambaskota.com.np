import MobileHeader from "./mobileHeader/MobileHeader";
import DesktopHeader from "./desktopHeader/DesktopHeader";

export default function Header() {
  return (
    <div>
      <div className="pt-[56px] md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden pt-[56px] md:block">
        <DesktopHeader />
      </div>
    </div>
  );
}
