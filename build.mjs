import esbuild from "esbuild";
import copyPlugin from "esbuild-plugin-copy";

const build = async () => {
  await esbuild
    .build({
      entryPoints: ["src/index.jsx"],
      outdir: "dist/",
      bundle: true,
      treeShaking: true,
      minify: true,
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
      plugins: [
        copyPlugin({
          assets: [
            { from: "public/*", to: "./" },
            { from: "src/js/*", to: "js" },
            { from: "lib/*", to: "lib" },
          ],
          watch: process.env.NODE_ENV === "development",
        }),
      ],
    })
    .catch(() => {
      console.log("error");
      return process.exit(1);
    });
};

build();
