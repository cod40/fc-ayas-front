import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FontClassNames } from "@/styles/font";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={FontClassNames}>
        <nav className="w-full h-[60px] bg-black flex items-center justify-center">
          <ul className="w-full flex justify-between items-center px-4">
            <li>
              <div>
                <button className="relative group">
                  <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[40px] h-[40px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                    <div className="flex flex-col justify-between w-[16px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden">
                      <div className="bg-white h-[2px] w-6 transform transition-all duration-300 origin-left group-focus:translate-x-8"></div>
                      <div className="bg-white h-[2px] w-6 rounded transform transition-all duration-300 group-focus:translate-x-8 delay-75"></div>
                      <div className="bg-white h-[2px] w-6 transform transition-all duration-300 origin-left group-focus:translate-x-8 delay-150"></div>

                      <div className="absolute items-center justify-between transform transition-all duration-500 top-2 -translate-x-8 group-focus:translate-x-0 flex w-0 group-focus:w-10">
                        <div className="absolute bg-white h-[2px] w-4 transform transition-all duration-500 rotate-0 delay-300 group-focus:rotate-45"></div>
                        <div className="absolute bg-white h-[2px] w-4 transform transition-all duration-500 -rotate-0 delay-300 group-focus:-rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </li>
            <li>
              <div className="text-white w-[200px]">
                <span className="inline-block">
                  <button className="text-white px-4 py-2 rounded hover:bg-[#ececec] hover:text-black">
                    회원가입
                  </button>
                </span>
                <span className="inline-block">
                  <button className="text-white px-4 py-2 rounded hover:bg-[#ececec] hover:text-black">
                    로그인
                  </button>
                </span>
              </div>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
