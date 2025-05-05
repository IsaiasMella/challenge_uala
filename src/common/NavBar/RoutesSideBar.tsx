import { FC } from "react";

import Image from "next/image";

import { NavItem } from "./NavItem";

export const RoutesSideBar: FC = () => (
  <aside className="hidden sm:flex">
    <div className="sticky left-0 top-0 h-screen w-[280px] bg-white shadow-sm" >
      <div className="flex w-10/12 m-auto h-full flex-col pt-8">
        <div className="flex gap-2 items-center justify-start ml-1">
          <Image
            src="/uala_logo.svg"
            alt="Ualá Logo"
            width={36}
            height={19}
            className="self-end"
          />
          <Image src="/uala.svg" alt="Ualá Logo" width={66} height={32} />
        </div>
        <nav className="flex flex-col mt-6 py-4 ml-1">
          <NavItem
            icon="/nav-bar/home.svg"
            label="Inicio"
            href="/"
            iconProperties={{ width: 24, height: 24 }}
          />
          <NavItem
            icon="/metrics.svg"
            label="Métricas"
            iconProperties={{ width: 20, height: 20 }}
          />
        </nav>
        <div className="mt-auto p-4 mb-12">
          <div className="flex flex-col items-center gap-6">
            <p className="text-lg font-semibold text-gray-900">
              Descargá la app desde
            </p>
            <div className="flex flex-col gap-3">
              <Image
                src="/Stores/app-store.jpg"
                alt="App Store"
                width={120}
                height={40}
              />
              <Image
                src="/Stores/google-play.jpg"
                alt="Google Play"
                width={120}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
);
