# Building

When you are ready to deploy your website, we run `npm run build`. This will generate a `public` folder that contains all the static files needed to deploy the website.

You'll notice that it kicks out both static `.html` files, as well as `.js` files. This is because while Gatsby renders the static HTMLs for speed, it still functions as a React application once that HTML is loaded into the browser — much like SSR works.

# Deploying

Gatsby sites can be hosted almost anywhere. Since they are just folders of HTML, CSS, JS and images they are very portable.

## Static File Hosting

Once you have that folder, you can put this on any host that supports static file hosting. Just upload the files and go!

## Netlify

Netlify is a fantastic option for hosting static sites like Gatsby.

There are a few options for creating a new Netlify site. The most common is to hook up to your github repo.

1. Log into Netlify
2. Select "New site from Git"
3. Connect your repo
4. Configure the Netlify app for your repo (You can do this per repo, or GitHub-wide. I'd recommend per repo)
5. It should detect that it's a gatsby site. Specifying that the build command is `gatsby build` (`npm run build` would also work here) and that the publish directory is `public/`
6. Click "Deploy Site"

It should now be live at your URL. Let's go through it together!

You can also deploy sites with the `netlify` CLI or by just dragging and dropping the files up.
