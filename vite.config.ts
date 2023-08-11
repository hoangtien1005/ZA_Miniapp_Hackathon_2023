import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from "path";
import fs from 'fs'
// https://vitejs.dev/config/
export default () => {
  const pathSrc = path.resolve(__dirname, "./src");
  return defineConfig({
    // Force prebuilt plug-in packages
    // optimizeDeps: {
    //     // Detect dependencies that need to be pre built
    //     entries: [],
    //     // By default , be not in node_modules Medium , Linked packages are not pre built
    //     include: ['axios'],
    //     exclude: ['your-package-name'], // Exclude from optimization
    // },
    // Folder for static resource services
    // publicDir: "public",
    root: "./src",
    base: "",
    plugins: [reactRefresh()],
    resolve: {
      alias: {
        "~": pathSrc,
      },
    },
    build: {
      // Browser compatibility "esnext"|"modules"
      // target: "modules",
      // // Specify the output path
      // outDir: "dist",
      // // Generate the storage path of static resources
      // assetsDir: "assets",
      // // An import or reference resource less than this threshold will be inlined as base64 code , To avoid additional http request . Set to 0 You can disable this completely
      // assetsInlineLimit: 4096,
      // Enable / Ban CSS Code splitting
      // cssCodeSplit: true,
      // Whether to generate after construction source map file
      // sourcemap: false,
      // Customize the underlying Rollup Packaging configuration
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // if (id.includes('node_modules')) return id.toString().split('node_modules/')[1].split('/')[0].toString();
            if (id.includes("node_modules")) {
              if (id.includes("zmp-core")) {
                return "zmp-core";
              } else if (id.includes("zmp-sdk")) {
                return "zmp-sdk";
              } else if (id.includes("zmp-framework")) {
                return "zmp-framework";
              } else if (id.includes("lodash")) {
                return "lodash";
              }

              return "vendor"; // all other package goes here
            }
          },
        },
      },
    },
  });
}