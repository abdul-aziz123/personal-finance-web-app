import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropDownMenu";
import { themeMap } from "@/libs/utils";

const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState("Green");

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-Grey900 shadow-sm hover:bg-Beige100">
        <span
          className={`${themeMap[selectedTheme]} h-3 w-3 rounded-full`}
        ></span>{" "}
        {selectedTheme}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full rounded-md bg-white p-1 shadow-lg">
        <DropdownMenuItem onClick={() => handleThemeSelect("Green")}>
          <span className="h-3 w-3 rounded-full bg-Green"></span>Green
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Grey")}>
          <span className="h-3 w-3 rounded-full bg-ArmyGreen"></span>Grey
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Cyan")}>
          <span className="h-3 w-3 rounded-full bg-Cyan"></span>Cyan
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Orange")}>
          <span className="h-3 w-3 rounded-full bg-Orange"></span>Orange
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Purple")}>
          <span className="h-3 w-3 rounded-full bg-PurplePrimary"></span>
          Purple
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Red")}>
          <span className="h-3 w-3 rounded-full bg-Red"></span>Red
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Yellow")}>
          <span className="h-3 w-3 rounded-full bg-Yellow"></span>Yellow
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Navy")}>
          <span className="h-3 w-3 rounded-full bg-Navy"></span>Navy
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Turquoise")}>
          <span className="h-3 w-3 rounded-full bg-Turquoise"></span>Turquoise
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Brown")}>
          <span className="h-3 w-3 rounded-full bg-Brown"></span>Brown
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("Magenta")}>
          <span className="h-3 w-3 rounded-full bg-Magenta"></span>Magenta
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
