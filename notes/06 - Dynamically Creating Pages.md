# Dynamically Creating Pages

With most server-rendered apps, we usually wait for someone to visit a url (e.g. `/tips/tip-slug`) until we figure out a few things:

1. What route did they hit? Is this a real route?
1. What data is needed for this request?
1. What template is needed for this page?
1. Let's put the data and the template together and then send it back to the client.

Because Gatsby is statically generated, these steps can't happen on each request but have to be done at build time. This section will detail how we can do this on build.


## Creating Pages

We obviously can't manually create a new page for every tip because that wouldn't be very scalable. That makes sense for single pages like `index.js` and `about.js`, but if we want to loop over every tip (or product, or person, or blog post) and make a page for that, we need to use the dynamic API for this.

Since Gatsby does this all at build time, we need to create a new file called `gatsby-node.js` which will run on build.

Gatsby has a set of Node APIs that allow us to control what happens when the site is building. In our case, we want to hook into the `createPages` API.

<https://www.gatsbyjs.org/docs/node-apis/>

```js
// gatsby-node.js

exports.createPages = async function({ graphql, actions }) {

}
```

We want to:

1. Query all our tips
1. Loop over each tip
1. Create a page for each tip with a template


This is sort of like the Controller in a traditional MVC framework where the GraphQL API is the model and the Template is the view.

To do this, we create a function:

```js
// gatsby-node.js

const path = require('path'); // note this is require syntax, not ES6 import syntax

// ..

async function turnMDXIntoPages({ graphql, actions }) {
  // Resolve the component template
  const tipTemplate = path.resolve('./src/components/templates/tip.js');
  // Query the data we need
  const { data } = await graphql(`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "tip" } } }) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `);
  // Loop over the tips
  const tips = data.allMdx.nodes;
  tips.forEach(tip => {
    actions.createPage({
      // What is the URL?
      path: `tip/${tip.frontmatter.slug}`,
      // What react component should we use to render this page?
      component: tipTemplate,
      // What data should be surfaced to the Component or Query on this page?
      context: {
        id: tip.id,
      },
    });
  });
}
```

And then we run that function inside of `createPages()`. This could be done directly inside of the createPages hook, but abstracting it out into another promise based function will allow us to keep this function uncluttered when we have more types of data in the future.

```js
// gatsby-node.js

exports.createPages = async function({ graphql, actions }) {
  await turnMDXIntoPages({ graphql, actions });
};
```

## Templating Out Each Tip

Now that we have a `Tip.js` template file, it works exactly the same as our other pages where we can export a query.

The difference is that this query is dynamic.

```js
// tip.js

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      id
      code {
        body
        scope
      }
      frontmatter {
        slug
        title
      }
    }
  }
`;
```

Then our Template looks like this:

```jsx
// tip.js

export default function Tip({ data, pageContext }) {
  const tip = data.mdx;
  return (
    <Layout>
      <div>
        <h2>{tip.frontmatter.title}</h2>
        <MDXRenderer>{tip.code.body}</MDXRenderer>
      </div>
    </Layout>
  );
}
```

Notice a few things:

1. The data comes in via `props`
1. tip.code.body goes inside a `MDXRenderer` tag in order to see the rendered markdown


## Exercise:

For Each Tip:

1. change the title of the page to be the name of the tip (React Helmet)
1. Style the tip with your choice is styling framework
1. BONUS: Add a Prev Tip and Next Tip links.  
    - Hint: Modify the `turnMDXIntoPages` function in `gatsby-node.js` to pass reference to the prev and next values
