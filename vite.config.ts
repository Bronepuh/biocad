import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

const root = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	base: "/biocad/",
	resolve: {
		alias: {
			"@/": root + "/",
			"@shared/": root + "/shared/**/*",
		},
		extensions: [".js", ".ts", ".jsx", ".tsx", ".json"],
	},
	build: {
		outDir: "dist",
	},
});
