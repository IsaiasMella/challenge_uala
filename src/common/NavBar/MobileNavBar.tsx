import Image from "next/image";
import { FC } from "react";

export const MobileNavBar: FC = () => (
    <div className="fixed w-full top-0 left-0 z-[100]">
      <nav className="relative w-full bg-white">
        <div className="w-full absolute -top-1 left-0">
          <div
            className="w-full rounded-bl-[38px] h-[56px] bg-white"
            style={{ filter: "drop-shadow(0px 1px 1px #DEE2EC)" }}
          />
          <div className="relative">
            <Image
              src="/nav-bar_wave/Subtract.svg"
              className="absolute top-0 right-0 sm:top-0 z-[150]"
              style={{ filter: "drop-shadow(0px 1px 1px #DEE2EC)" }}
              alt="Nav Bar"
              width={56}
              height={56}
            />
          </div>
        </div>
        <div className="w-full absolute top-0 left-0 z-[150]">
          <div className="w-10/12 m-auto">
            <button className="h-[50px] flex items-center">
              <Image
                src="/nav-bar/hamburguer.svg"
                alt="Nav Bar"
                width={16}
                height={16}
              />
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-center items-center h-[50px]">
            <Image src="/uala.svg" alt="Nav Bar" width={62} height={24} />
          </div>
        </div>
      </nav>
    </div>
  );
