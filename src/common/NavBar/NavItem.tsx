"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  label: string;
  icon: string;
  href?: string;
  iconProperties?: { width: number; height: number };
}

export const NavItem = ({ label, icon, href, iconProperties }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <div className="flex items-center gap-4 rounded-lg py-4 transition-all duration-200 ease-in-out hover:scale-[1.02]">
      <Link
        href={href ?? "#"}
        className={`flex items-center gap-4 w-full ${
          isActive ? "text-blue-uala" : "text-gray-700 hover:text-blue-uala"
        }`}
      >
        <Image
          src={icon}
          alt={label}
          width={iconProperties?.width}
          height={iconProperties?.height}
        />
        <span className="text-sm">{label}</span>
      </Link>
    </div>
  );
};
