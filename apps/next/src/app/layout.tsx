import {FC, PropsWithChildren} from "react";
import type { Metadata } from "next";
import {cn} from "@/lib/utils";

import {inter} from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fullstack todo",
  description: "Fullstack todo list made with next.js",
};

const RootLayout: FC<PropsWithChildren> = ({children}) => (
  <html lang="en">
    <body className={cn(inter.className, 'bg-white')}>
        {children}
    </body>
  </html>
);

export default RootLayout
