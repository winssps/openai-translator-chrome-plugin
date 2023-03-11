import esbuild from "esbuild";
import copyPlugin from "esbuild-plugin-copy";

const build = async () => {
  await esbuild
    .build({
      entryPoints: {
        index: "src/index.jsx",
        content: "src/js/content.js",
      },
      outdir: "dist",
      bundle: true,
      treeShaking: true,
      minify: false,
      sourcemap: true,
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
      plugins: [
        copyPlugin({
          assets: [
            { from: "public/*", to: "./" },
            { from: "lib/*", to: "lib" },
          ],
          watch: process.env.NODE_ENV === "development",
        }),
      ],
      loader: {
        ".png": "dataurl",
        ".js": "jsx",
      },
    })
    .catch(() => {
      return process.exit(1);
    });
};

build();
