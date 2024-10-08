import { space } from "postcss/lib/list";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        Beige500: "#98908B",
        Beige100: "#F8F4F0",
        Grey900: "#201F24",
        Grey500: "#696868",
        Grey300: "#B3B3B3",
        Grey100: "#F2F2F2",
        Green: "#277C78",
        Yellow: "#F2CDAC",
        Cyan: "#82C9D7",
        Navy: "#626067",
        Red: "#C94736",
        PurpleSecondary: "#826CB0",
        PurplePrimary: "#AF81BA",
        Turquoise: "#597C7C",
        Brown: "#93674F",
        Magenta: "#934F6F",
        Blue: "#3F82B2",
        NavyGrey: "#97A0AC",
        ArmyGreen: "#7F9161",
        Gold: "#CAB361",
        Orange: "#BE6C49",
        White: "#FFFFFF",
      },
      fontSize: {
        text1: [
          "32px",
          {
            lineHeight: "120%",
            letterSpacing: "0px",
            fontWeight: "bold",
          },
        ],
        text2: [
          "20px",
          {
            lineHeight: "120%",
            letterSpacing: "0px",
            fontWeight: "bold",
          },
        ],
        text3: [
          "16px",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
            fontWeight: "bold",
          },
        ],
        text4: [
          "14px",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
            fontWeight: "regular",
          },
        ],
        text4_bold: [
          "14px",
          {
            lineHeight: "120%",
            letterSpacing: "0px",
            fontWeight: "bold",
          },
        ],
        text5: [
          "12px",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
            fontWeight: "regular",
          },
        ],
        text5_bold: [
          "12px",
          {
            lineHeight: "150%",
            letterSpacing: "0px",
            fontWeight: "regular",
          },
        ],
      },
      spacing: {
        space500: "40px",
        space400: "32px",
        space300: "24px",
        space250: "20px",
        space200: "16px",
        space150: "12px",
        space100: "8px",
        space50: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
