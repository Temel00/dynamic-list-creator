This is a [Next.js](https://nextjs.org/) project template that can be exported as a static website and deployed on GitHub Pages.
This template demonstrates how to display images, how to handle hyperlinks, and how to generate static pages for pages that use Next.js dynamic routing.

## Getting Started

First, run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

Check out how dynamic routes are handled in `pages/demo/[page].tsx`.

## Use this as a template

Click "Use this template" on top. Remember to change the `repoName` to the name of your repository in [`next.config.js`](/next.config.js). Read more on [GitHub documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

## Deploy on GitHub Pages

This template set up a GitHub action that builds, exports and pushes to the `gh-pages` branch for publishing. Navigate to settings -> pages, and set the root folder in the `gh-pages` branch as the source. Read more about GitHub Pages on [GitHub documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages).

## Notes & FAQ

### What are `basePath` and `assetPrefix` in `next.config.js`?

They change the root directory from `/` to `/repository_name`. `basePath` ensures all links point to the right path and `assetPrefix` ensures assets like CSS files can be loaded from the right place. Remember you have to replace the `repoName` in `next.config.js` if you are deploying this on a new GitHub repository.

### What are `getStaticPaths()` and `getStaticProps()`?

They are used to define dynamic inputs for static pages. `pages/demo/[page]` is a dynamic route, Next.js requires a list of predefined paths to generate the static webpage. As specified in [Next.js documentation](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths), the list of possible routes has to be defined at build time in `getStaticPaths()`, and fallback has to be false. With `getStaticPaths`, we have to include `getStaticProps` as well.

### Image not showing in GitHub Pages but works fine in localhost:3000

Try to use a relative path for images. After `yarn export`, opening the corresponding HTML file in the `out` directory should still load the images properly, only CSS files and navigation links cannot work properly.

### Error: getStaticPaths was added without a getStaticProps in page. Without getStaticProps, getStaticPaths does nothing.

You have to provide [`getStaticProps()`](https://nextjs.org/docs/api-reference/data-fetching/get-static-props) as well. Returning empty props will do the job:

```ts
export async function getStaticProps() {
  return {
    props: {},
  };
}
```

### Error: require() of ES modules is not supported. (code: 'ERR_REQUIRE_ESM')

It will say something like:

> the module is an ES module file as it is a .js file whose nearest parent package.json contains "type": "module" which defines all .js files in that package scope as ES modules. Instead rename index.js to end in .cjs, change the requiring code to use import(), or remove "type": "module" from the module package.json.

This happens because starting from Next.js version 12, Next.js follows the [JavaScript ecosystem transitions from CommonJS to ES modules](https://nextjs.org/blog/next-12#es-modules-support-and-url-imports). Importing ES modules are prioritized over CommonJS modules.

To fix this, first find out which modules is packaged as an ES module, meaning it specified "type": "module" in package.json. If possible, avoid depending on that node modules. If not possible, fix it by:

- Rename `index.js` to `index.cjs`, or
- Change require code to use `import()`, or
- Remove the "type": "module" declaration in package.json

### Error: Image Optimization using Next.js default loader is not compatible with `next export`

You cannot use the `<Image>` component provided by `next/image` because the default loader in this component is not compatible with `next export`. To solve this, use basic `<img />` tag. Remember to set the path to relative path so that it works on GitHub Pages as well.

Alternatively, you can use custom image-optimizer like [next-optimized-images](https://github.com/cyrilwanner/next-optimized-images) or other [built-in loaders](https://nextjs.org/docs/api-reference/next/image#built-in-loaders). However, you have to be careful how they handle the image path.

### Links redirected to `username.github.io/page` instead of `username.github.io/repository/page`

You have to use the `<Link>` component provided by `next/link` for all the links pointing to other Next.js routes. This component will prefix all the hyperlinks with your repository name so that all linkes work on GitHub Pages.
