# Layout

Gatsby doesn't have a prescribed way of creating layouts like Next.js has _app.js and _document.js. It's just regular ol' React components on a page.

While Gatsby _does_ have the concept of themes currently in testing, it is nothing extra past what we learn today. Just the ability to take everything we learn today and put it into a re-usable, composable package.

Let's go ahead and make a `components/Layout.js` component.

At it's simplest it looks like this:

```js
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <h1>My Website!</h1>
      {children}
    </div>
  );
}
```

Now import that component into your pages and wrap your pages in it:

```js
import Layout from '../components/Layout';
// ...
export default function HomePage() {
  return (
    <Layout>
      <p>I'm the home page!</p>
    </Layout>
  );
}
```

## Metadata

Now we really shouldn't hard code the data in out Layout.js. So we can put all this data in a config file.

In the root of your project create a `gatsby-config.js` file. We will use this for configuring all our data sources and plugins in the future, but for now, we can also store site metadata.

```js
module.exports = {
  siteMetadata: {
    anything: 'I want',
    title: `🔥 Wes Bos Blog`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `Wes Bos`,
  },
  plugins: []
}
```

On most sites, we would just import this config and be done with it. But because gatsby is a a static site generator, gatsby needs to be aware of the the data.

Restart your application (`Ctrl + C`) and then open up the Graphiql interface at http://localhost:8000/__graphql

We can run queries in this playground to see this data:

```graphql
query {
  site {
    siteMetadata {
      title
      anything
    }
  }
}
```

Now how do we get this data into our Layout.js?

Queries!

There are two types of queries in Gatsby - **Page queries** - which can be dynamic but can only be done inside a page - and **Static Queries** which can be done anywhere, but have the limitation of not being dynamic. More on this when we hit images!

To perform a query inside a component, first import a few things inside of `Layout.js`:

```js
import { graphql, useStaticQuery } from 'gatsby';
```

and then inside our component, just before the return, we can run the query:

```js
const data = useStaticQuery(graphql`
  query SiteData {
    site {
      siteMetadata {
        title
      }
    }
  }
`);
```

We can then swap out that hard coded h1 with this:

```js
<h1>{data.site.siteMetadata.title}</h1>
```

# Meta Data

If the highest we can get in our application is the page level, how do we control things like page meta, title tags and so on?

React Helmet is a package that you can use _anywhere_ in your application and it will append those tags into the `<head>` if your document.

In our `Layout.js` we can import it and use it:

```js
import { Helmet } from 'react-helmet';
// ...
<Helmet>
  <title>{data.site.siteMetadata.title}</title>
  <meta charSet="utf-8" />
</Helmet>
```

Any tags that come later - in lower components - will overwrite these. Many developers like to build a custom `<Meta>` component to hold the many things that a head might include.

# Routing

Next, we have Routing.

We have three pages - home, about, and tips.

Let's make a nav component which we can inject into our Layout.js

```js
import React from 'react';
import { Link } from 'gatsby';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/tips">🔥 Tips</Link>
        </li>
      </ul>
    </nav>
  );
}
```

Gatsby Link component is the most common way to move from one page to another. It accepts a few props including `to`, `activeClassName` and `activeStyle`.

Let's take a look at the docs and answer a few questions:

* How to I programmatically change pages?
* how do I style the active page?
* How do I pass state from one page to another?

## Exercise

1. Make a footer component with your name and the current year in it.
1. Style the current page to be coloured differently
