# Sourcing Data

Okay, so we have created the site static pages, worked with static queries, and worked with the images a little but we still haven't hit the part where we pull dynamic data into gatsby.

Your data can come from anywhere - it could be a markdown file, could be a headless CMS like WordPress, could be CSV. You name it.

We're going to take all the tips, that are written in markdown, and turn them into pages.

Before we create a page, and just like everything else, Gatsby needs to be aware of this data.

So - remember our `gatsby-config.js` file? We're going to source our tips here:

```js
module.exports = {
  siteMetadata: {
    anything: `I want`,
    title: `🔥 Hot Tips`,
    description: `Some Awesome Tips!`,
    author: `Wes Bos`,
  },
}
```

<!-- sourcing data from an API
1. first we need to create some files
  /tips/tip.mdx
1. then we need to tell gatsby to source those files -->
Add this to your Plugins Array in `gatsby-config.js`.
```js
{
resolve: `gatsby-source-filesystem`,
options: {
  path: `${__dirname}/src/tips`,
  name: 'tip',
},
},
```
1. Once we do this, gatsby only knows about these as raw files - not pages, not markdown.

We can see this by writing a query:

```js
query {
	allFile {
    nodes {
      id
      name
      extension
    }
  }
}
```

But now we need another plugin to tell gatsby what to do with this type of file! Add this to your plugins array as well. Note that I've already run `npm install gatsby-mdx` for you.

```js
{
  resolve: 'gatsby-mdx',
}
```

Once we have re-started the server, you'll see that we get two new query options: `mdx() and allMdx()`

Let's try this:

```graphql
query {
  allMdx {
    nodes {
      id
      frontmatter {
        slug
        title
      }
    }
  }
}
```

Now we can make a new page called `tips.js` which will be a listing of all our tips.

Now how do we access the tips? Previously we learned about `StaticQuery`, which can be used in _any_ component to query site data — the downside being that it cannot be dynamic.

Now we learn about Page queries. Each high level page can export a query that will then run when the page is built. These queries can be dynamic - meaning we can pass things like a slug or an ID to the query.

So - each gatsby page has the ability to export a query - commonly named `query` or `pageQuery` which is a graphql query. When this page is built, gatsby will run this query and make the data available via `props.data`.


```js
import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';

export const query = graphql`
  query {
    allMdx {
      nodes {
        id
        frontmatter {
          slug
          title
        }
      }
    }
  }
`;
```

We can then template out a list of tips:

```js
export default function TipsPage({ data }) {
  const tips = data.allMdx.nodes;
  return (
    <Layout>
      <h2>Tips!</h2>
      <ul>
        {tips.map(tip => (
          <li key={tip.id}>
            <Link to={`/tip/${tip.frontmatter.slug}`}>
              {tip.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
```

We should now be seeing a list of tips. But, if you click on a tip, we hit a 404 page! OH no!

This is because gatsby doesn't know about these individual pages yet. Let's jump into that in the next section.
