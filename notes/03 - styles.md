## Styling

Styling can be done any way you prefer in Gatsby. Let's take a look at a few common scenarios.

The common theme here is going to be that _everything goes though gatsby_. Even css.

## Regular CSS

If you are just using regular CSS, you simply need to import it into your application at some point.

First, I've npm installedthe CSS normalize package which exports a CSS file. We can just import it into our Layout.js and normalize will work:

```js
import 'normalize.css';
```

Notice that we don't assign it a variable since simply by importing it will cause the webpack loader behind the scenes inline the CSS.

In our `/components/styles` dir we have some global styles that will apply to our application.

Just like normalize.css, If we just import those into Layout.js, they will be applied:

```js
import './styles/global.css';
```

When the site is built, Gatsby will detect what is called Critical CSS - the CSS that is needed for that page to load - and load it inside a style tag before the content. The rest of the CSS can then be loaded async and doesn't block the loading of the rest of the website. This is just one of the many ways gatsby makes your website fast by default.

## CSS Modules

Another way to handle CSS in gatsby is to use something called CSS modules.

CSS modules allow us to code specific classes in a .css file, and then import them into our React components. The benefit of this is that the styles will have uniquely generated class names and therefore be scoped to the component where they are used.


Some good examples on CSS modules are available here: <https://www.javascriptstuff.com/css-modules-by-example/>

## Sass

If you are using either of the top two methods - you may want to speed up your authoring by using Sass. Luckily this works as well.

If we create a file called `tip.module.scss`, and put some Sass in it:

```scss
.tip {
  border: 1px solid red;
  padding: 20px;
  h2 {
    font-size: 30px;
  }
}
```

and then we try to import that into `components/templates/tip.js` with `import '../styles/tip.module.scss';`

You'll see we get a compile error:

```
Failed to compile
./src/components/styles/tip.module.scss 1:0
Module parse failed: Unexpected token (1:0)
You may need an appropriate loader to handle this file type.
> .tip {
|   border: 1px solid red;
|   padding: 20px;
```

Simply add the plugin `gatsby-plugin-sass` to your plugins array, and it will start compiling. Since we used a CSS module here, we need to import it, and assign the class.

```js
import tipStyles from '../styles/tip.module.scss';
// ...
<div className={tipStyles.tip}>
```

## Styled Components

Another popular "CSS-in-JS" way to write CSS in react is via Styled Components. I'm using Styled components here, but may of the popular CSS in JS packages such as Emotion and Glamour work exactly the same way.

Instead of writing CSS in a file and importing it, we create styled "components" that replace our markup.

Let's say we had a component that looked like this:

```js
const Card = function() {
  return <div className="card">
    <h2>Title</h2>
    <p>Some Info here</p>
    <img src="dog.jpg" alt="Cute Pup"/>
  </div>
}
```

Normally we would write our css like this:

```css
.card {
  padding: 10px;
  background: green;
}

.card h2 { font-size: 20px; }
.card p { font-style: italic; }
.card img { float: left; }
```

Now instead of putting a class of card onto a div, we create a styled div with those same styles:

```js
import styled from 'styled-components';

const CardStyles = styled.div`
  padding: 10px;
  background: green;
  h2 { font-size: 20px; }
  p { font-style: italic; }
  img { float: left; }
`;
```

You can still use classes and most Sass conventions here, but we're allow to keep things simple by just applying styles and using selectors that are simple.

Then to use it we simply replace our `<div></div>` with `<CardStyles></CardStyles>`

At the end of the day, a div will still be rendered out, but that will have a random class attached to it, thus scoping the styles just to that component.


## Exercise:

Pick one (or all) of the above methods and style:

1. The navigation
1. The Layout


Feel free to steal the finished styles from my site.

