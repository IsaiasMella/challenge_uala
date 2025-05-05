import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export const DesktopNavBar: FC = () => (
    <section className="fixed top-0 flex items-center ml-[280px] w-full h-20 bg-white shadow-sm z-[49]">
      <div className="flex items-center gap-8 pl-8">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-base font-semibold text-gray-900">Isaias Mella</p>
      </div>
    </section>
  );
