import { FC } from "react";
import { DesktopNavBar } from "./NavBar/DesktopNavBar";
import { MobileNavBar } from "./NavBar/MobileNavBar";

export const NavBar: FC = () => (
    <>
      <div className="hidden sm:block">
        <DesktopNavBar />
      </div>
      <div className="block sm:hidden">
        <MobileNavBar />
      </div>
    </>
  );
