# @reactioncommerce/babel-remove-es-create-require

A [Babel](https://babeljs.io) plugin.

If you create a Node 12 project with ECMAScript (ES) modules enabled, you will likely be doing this in a few places to import from CommonJS modules:

```js
import { createRequire } from "module";

const require = createRequire(import.meta.url);
```

This is the official way to get the `require` function in a module file.

Now let's say you want to add some Jest tests. Unfortunately Jest does not yet natively parse ES modules, and it doesn't like `import.meta`, so you'll need Babel configured for tests only.

Install `@babel/core`, `babel-jest`, `@babel/preset-env`, and two plugins that take care of transforming your ES modules:

```sh
npm i --save-dev @babel/core @babel/preset-env babel-jest babel-plugin-transform-import-meta babel-plugin-transform-es2015-modules-commonjs
```

The `babel-plugin-transform-es2015-modules-commonjs` plugin does most of the transformation to CommonJS and `babel-plugin-transform-import-meta` transforms the `import.meta` code into something Jest will accept. But there's still a problem...

```js
const require = createRequire(import.meta.url);
```

Those pesky `createRequire` calls are still in there, and now they're causing confusion. We no longer need them because `require` will now work automatically based on the file being CommonJS.

This is where this package comes in. It does only one thing: removes all lines where you're calling `createRequire`. Install it the same way you installed the other Babel plugins:

```sh
npm i --save-dev @reactioncommerce/babel-remove-es-create-require
```

Then add it to your Babel config plugins list. Here's an example `babel.config.js` file that should work for a Node 12 project with ES modules enabled.

```js
module.exports = function (api) {
  api.cache(false);

  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            node: "12"
          }
        }
      ]
    ],
    plugins: [
      "babel-plugin-transform-import-meta",
      "module:@reactioncommerce/babel-remove-es-create-require",
      "transform-es2015-modules-commonjs"
    ]
  };
};
```
