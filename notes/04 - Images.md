# Images

One of the best things about Gatsby is that because everything (text, images, files, data...) goes through gatsby, we're able to use plugins to massage that data before it gets outputted on the page.

A huge use case for this is with images.

For a speedy website, images may need to be:

* compressed
* converted to different formats
* resized
* lazy loaded

These things are great for perf, but hard to do on most sites. Gatsby makes it easy!


## Images in React Components

If you are inside a component, just import your image like so:

```js
import dog from '../images/dog.jpg';
```

That will give you a path to the statically generated image, which can be used like so:

```jsx
<img src={dog} alt="Cute Pup" />
```

Now this image is still huge! So we want to use a plugin called [gatsby-image](https://www.gatsbyjs.org/packages/gatsby-image/), which in turn will use a package called `sharp` to resize, compress, and provide other image benefits.

Now does Gatsby know about our images? Not yet! We need to source them, and then let a plugin do the heavy lifting. Add these to your plugins array:

```js
// gatsby-config.js

{
  resolve: `gatsby-source-filesystem`,
  options: {
    name: `images`,
    path: path.join(__dirname, `src`, `images`),
  },
},
`gatsby-transformer-sharp`,
`gatsby-plugin-sharp`,
```

Now here is where Gatsby falls short at the moment.

If you want to display an image that has been transformed, we need to access it like we do everything else in Gatsby: GraphQL Queries. Then, use the Gatsby-image `Img` component to display it.

So in order to display an image, we need to write a query like the one in the [docs](https://www.gatsbyjs.org/packages/gatsby-image/). 😖😖😖

The one in the docs is a page query. The other type of query in Gatsby is a "static query" which can be done in any component.

The downside to static queries is that they aren't dynamic. That is,  you can't pass it variables: e.g. an `<img>` src.

More info here: <https://spectrum.chat/gatsby-js/general/using-variables-in-a-staticquery~abee4d1d-6bc4-4202-afb2-38326d91bd05>

The best approach right now is to make our own component that will query all images, and then return the one we are looking for.

Make a new file in `components/Img.js`:

```js
// Img.js

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

export default function Image({ src, alt }) {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
              originalName
            }
          }
        }
      }
    }
  `);
  const image = allImageSharp.edges.find(
    edge => edge.node.fluid.originalName === src
  );
  if (!image) {
    return null;
  }
  return <Img fluid={image.node.fluid} alt={alt} />;
}
```

Then to use it, simply import this new component and use it like so:

```js
import Img from '../components/Img';
<Img src="dog.jpg" alt="Cute Pup" />
```

## Images in MDX

Now if you want to have images in your mdx content, it's a little bit easier. We simply let the plugins sniff out the images from our markdown and handle it all for it.

Put a few images into a tip:

```mdx
![Cute Pup](../images/dog.jpg)
![Nice Cabin](../images/cabin.jpg)
```

Then we need to tell our `gatsby-plugin-mdx` how to handle the images in our `gatsby-config.js` file. This isn't a new plugin, but we modify the `gatsby-plugin-mdx`:

```js
// gatsby-config.js

    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        root: __dirname,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
```

And that is it! See the [docs](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images#options) for the possible options here.
