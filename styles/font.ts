import { Roboto, Noto_Sans_KR } from "next/font/google";

const sumClass = (...classnames: string[]) => {
  return classnames.join(" ");
};

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--roboto",
  display: "swap",
});

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--noto_sans_kr",
  display: "swap",
});

export const FontClassNames = sumClass(roboto.className, noto_sans_kr.variable);
