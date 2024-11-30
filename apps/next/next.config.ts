/** @type {import('next').NextConfig} */

import path from "path";
import dotenv from "dotenv";
import type { NextConfig } from "next";

const __dirname = path.resolve();
const pathDir = path.resolve(__dirname, "../../.env");

const { parsed: parentEnv } = dotenv.config({
    path: pathDir
});

const nextConfig: NextConfig  = {
    env: parentEnv,
    experimental: {
        reactCompiler: true,
    },
};

export default nextConfig;
