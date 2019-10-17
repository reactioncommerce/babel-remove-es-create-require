module.exports = function removeESCreateRequire() {
  return {
    name: "@reactioncommerce/babel-remove-es-create-require",
    visitor: {
      /**
       * Looks for `const require = createRequire(import.meta.url);` lines
       * and removes them. Use this with the `transform-es2015-modules-commonjs`
       * plugin, which will already make `require` available by converting
       * the file to CommonJS.
       */
      VariableDeclarator(path) {
        const { node } = path;
        if (node.id && node.id.name === "require" && node.init && node.init.callee && node.init.callee.name === "createRequire") {
          path.parentPath.remove();
        }
      }
    }
  };
}
