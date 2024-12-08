await import('./src/env.js');
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const config = {
	transpilePackages: ['@0xsequence/marketplace-sdk'],
};

export default withVanillaExtract(config);
