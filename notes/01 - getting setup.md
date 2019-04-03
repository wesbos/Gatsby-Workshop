# Welcome!

There are a few things you'll need to get setup for today:

1. A laptop with the latest version of <https://nodejs.org> installed.
1. A text editor like VS Code
1. A terminal


## What to Expect From Today

Today we are going to build a Gatsby website from the ground up. We are going to cover:

1. Gatsby Core Concepts
1. GraphQL
2. Layouts in Gatsby
3. Styles and CSS Approaches
4. Images
5. Sourcing Data
6. Dynamically Creating Pages
7. Sourcing Other Types of Data
8. Deployment


## These Notes

These notes aren't comprehensive - more of a landing spot to grab the code if you get stuck. We will try and code as much of the code by hand, but if you misspell something or misplaced a curly bracket, feel free to grab the code from the notes or from the finished files.

## Starter Files

Gatsby provides a number of starter projects on their site. We wont be using those in an attempt to gather a bit more understanding of all the parts of Gatsby.

You can check the Gatsby Starters here: <https://www.gatsbyjs.org/starters/?v=2> for when you need to get a project up and running quickly.

I am providing you a few starter files, includin a package.json detailing all the packages we need for today.

Go ahead and cd into `gatsby-site` and run `npm install`.


## Questions

Feel free to ask questions at any time!

## Gatsby 101

So, what is Gatsby? It's a framework for creating websites with React.js. Gatsby is considered a "static site generator" which means that before you put your website up online, you run a build command that will compile your website into a set of HTML, CSS and JS (React) files.

This makes your website extremely fast. But Gatsby isn't just another static site gen - it's much more than that.

Gatsby makes it easy to build a website with all of today's best practices at the forefront - not an after thought. This includes code splitting, pre-loaded routes, image loading and compression, offline ready and so much more. Along with amazing user experiences, the gatsby developer experience is fast, hot-reloaded and easily deployable.

### Pages + Routing

At it's core, Gatsby has pages. You know what pages are, right? Want a page called `/about`? Make an `about.js` and export a React component.

Gatsby also includes a Router, which by using their `<Link to="/about">About</Link>` component, will allow you to both pre-load that page as well as use HTML5 pushstate to change the page without a browser reload.

Gatsby also includes a set of APIs for dynamically creating pages - more soon.

### Data Sources

At it's base, you could just have a gatsby site that has static pages. But, you likely have data that needs to be pulled in to populate the site.

Data can come from anywhere:

* Raw Data - REST APIs, CSV, etc...
* Headless CMS (WordPress, Netlify CMS, Contentful, Sanity, Prismic...)
* Files - Markdown, txt. etc...

Since Gatsby is generated a build time, the data isn't loaded when the user loads the page. The data is loaded when you generate the page - this has the benefit of being super fast, but the downside of needing to have all your data at build time.

So - once you have your data - how do you get it into Gatsby? Via Source plugins. There are dozens of source plugins available for your data type.

Once this data is available from sources, you can also _transform_ it - imagine transforming markdown to HTML, compressing images, generating offline views, making an RSS feed. You name it!

Finally all this data is made available to your website via a single GraphQL API. We can write queries to pull this data into our site, which will then turn static during the build.

## Creating Pages

So - Let's make sure we have things up and running!

Let's mak a new page called `index.js`, `about.js` and `tips.js`. These pages just need to default export a React component - any type will do!


```js
export default function HomePage(props) {
  return <div><p>I am the home page</p></div>
}
```

## Exercise

1. Make two more pages: About, and Tips
