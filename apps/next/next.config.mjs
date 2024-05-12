/** @type {import('next').NextConfig} */

import path from 'path';
import dotenv from 'dotenv'

const __dirname = path.resolve();
const pathDir = path.resolve(__dirname, '../../.env');

const { parsed: parentEnv } = dotenv.config({
    path: pathDir
})

const nextConfig = {
    env: parentEnv
};

export default nextConfig;
