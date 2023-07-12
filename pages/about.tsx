import type { NextPage } from 'next';
import Head from 'next/head';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.about}>
        <Head>
          <title>About this template</title>
          <meta
            name="description"
            content="This is a Next.js template that can be exported as a static website and deployed on GitHub Pages."
          />
          <link rel="icon" href="./favicon.ico" />
        </Head>

        <main className={styles.main} style={{ alignItems: 'flex-start' }}>
          <h1 className={styles.description}>
            <a href="https://github.com/ethanppl/gh-pages-nextjs">
              This is a Next.js project template with typescript
            </a>{' '}
            that can be exported as a static website and deployed on GitHub Pages.
          </h1>
          <h3 id="what-are-basepath-and-assetprefix-in-next-config-js-">
            What are <code>basePath</code> and <code>assetPrefix</code> in{' '}
            <code>next.config.js</code>?
          </h3>
          <p>
            They change the root directory from <code>/</code> to <code>/repository_name</code>.{' '}
            <code>basePath</code> ensures all links point to the right path and{' '}
            <code>assetPrefix</code> ensures assets like CSS files can be loaded from the right
            place. Remember you have to replace the <code>repoName</code> in{' '}
            <code>next.config.js</code> if you are deploying this on a new GitHub repository.
          </p>
          <h3 id="what-are-getstaticpaths-and-getstaticprops-">
            What are <code>getStaticPaths()</code> and <code>getStaticProps()</code>?
          </h3>
          <p>
            They are used to define dynamic inputs for static pages. <code>pages/demo/[page]</code>{' '}
            is a dynamic route, Next.js requires a list of predefined paths to generate the static
            webpage. As specified in{' '}
            <a href="https://nextjs.org/docs/api-reference/data-fetching/get-static-paths">
              Next.js documentation
            </a>
            , the list of possible routes has to be defined at build time in{' '}
            <code>getStaticPaths()</code>, and fallback has to be false. With{' '}
            <code>getStaticPaths</code>, we have to include <code>getStaticProps</code> as well.
          </p>
          <h3 id="image-not-showing-in-github-pages-but-works-fine-in-localhost-3000">
            Image not showing in GitHub Pages but works fine in localhost:3000
          </h3>
          <p>
            Try to use a relative path for images. After <code>yarn export</code>, opening the
            corresponding HTML file in the <code>out</code> directory should still load the images
            properly, only CSS files and navigation links cannot work properly.
          </p>
          <h3 id="error-getstaticpaths-was-added-without-a-getstaticprops-in-page-without-getstaticprops-getstaticpaths-does-nothing-">
            Error: getStaticPaths was added without a getStaticProps in page. Without
            getStaticProps, getStaticPaths does nothing.
          </h3>
          <p>
            You have to provide{' '}
            <a href="https://nextjs.org/docs/api-reference/data-fetching/get-static-props">
              <code>getStaticProps()</code>
            </a>{' '}
            as well. Returning empty props will do the job:
          </p>
          <pre style={{ overflow: 'auto', width: '100%', textAlign: 'center' }}>
            <code className="lang-ts">
              <span className="hljs-keyword">export</span>{' '}
              <span className="hljs-keyword">async</span>{' '}
              <span className="hljs-function">
                <span className="hljs-keyword">function</span>{' '}
                <span className="hljs-title">getStaticProps</span>(
                <span className="hljs-params"></span>){' '}
              </span>
              &#123;
              <span className="hljs-keyword">return</span> &#123;
              <span className="hljs-attr">props</span>: &#123;&#125;, &#125;; &#125;
            </code>
          </pre>
          <h3 id="error-require-of-es-modules-is-not-supported-code-err_require_esm-">
            Error: require() of ES modules is not supported. (code: &#39;ERR_REQUIRE_ESM&#39;)
          </h3>
          <p>It will say something like:</p>
          <blockquote>
            <p>
              the module is an ES module file as it is a .js file whose nearest parent package.json
              contains &quot;type&quot;: &quot;module&quot; which defines all .js files in that
              package scope as ES modules. Instead rename index.js to end in .cjs, change the
              requiring code to use import(), or remove &quot;type&quot;: &quot;module&quot; from
              the module package.json.
            </p>
          </blockquote>
          <p>
            This happens because starting from Next.js version 12, Next.js follows the{' '}
            <a href="https://nextjs.org/blog/next-12#es-modules-support-and-url-imports">
              JavaScript ecosystem transitions from CommonJS to ES modules
            </a>
            . Importing ES modules are prioritized over CommonJS modules.
          </p>
          <p>
            To fix this, first find out which modules is packaged as an ES module, meaning it
            specified &quot;type&quot;: &quot;module&quot; in package.json. If possible, avoid
            depending on that node modules. If not possible, fix it by:
          </p>
          <ul>
            <li>
              Rename <code>index.js</code> to <code>index.cjs</code>, or
            </li>
            <li>
              Change require code to use <code>import()</code>, or
            </li>
            <li>Remove the &quot;type&quot;: &quot;module&quot; declaration in package.json</li>
          </ul>
          <h3 id="error-image-optimization-using-next-js-default-loader-is-not-compatible-with-next-export-">
            Error: Image Optimization using Next.js default loader is not compatible with{' '}
            <code>next export</code>
          </h3>
          <p>
            You cannot use the <code>&lt;Image&gt;</code> component provided by{' '}
            <code>next/image</code> because the default loader in this component is not compatible
            with <code>next export</code>. To solve this, use basic <code>&lt;img /&gt;</code> tag.
            Remember to set the path to relative path so that it works on GitHub Pages as well.
          </p>
          <p>
            Alternatively, you can use custom image-optimizer like{' '}
            <a href="https://github.com/cyrilwanner/next-optimized-images">next-optimized-images</a>{' '}
            or other{' '}
            <a href="https://nextjs.org/docs/api-reference/next/image#built-in-loaders">
              built-in loaders
            </a>
            . However, you have to be careful how they handle the image path.
          </p>
          <h3 id="links-redirected-to-username-github-io-page-instead-of-username-github-io-repository-page-">
            Links redirected to <code>username.github.io/page</code> instead of{' '}
            <code>username.github.io/repository/page</code>
          </h3>
          <p>
            You have to use the <code>&lt;Link&gt;</code> component provided by{' '}
            <code>next/link</code> for all the links pointing to other Next.js routes. This
            component will prefix all the hyperlinks with your repository name so that all linkes
            work on GitHub Pages.
          </p>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
