# Sourcing Your Own Data

How do we get our own data into the API? What if there isn't a source plugin available for what we want?

This is likely to happen, so let's do an example:

1. Pull data from this API of Users: https://jsonplaceholder.typicode.com/users
2. Create nodes from these users
3. Verify this data is in our GraphQL API
4. Create a `/users` page that displays all these users
5. BONUS: dynamically create each user's own page using their name as as a slug.


```js
// gatsby-node.js

exports.sourceNodes = async function({ actions, createNodeId, createContentDigest }) {
  await sourceUsers({actions, createNodeId, createContentDigest});
}

async function sourceUsers({ actions, createNodeId, createContentDigest }) {
  // 1. Fetch the users
  const { data: users } = await axios.get('https://jsonplaceholder.typicode.com/users');
  // 2. Loop over Each user
  users.forEach(user => {
    // 3. Create an object for the user
    const node = {
      // Data for the node
      ...user, // take everything from the user,
      // Custom data fields
      // custom ID
      id: createNodeId(`user-${user.id}`),
      parent: null, // there is no parent
      children: [], // no children
      internal: {
        type: `User`, // What should we call it?
        mediaType: 'application/json',
        contentDigest: createContentDigest(user), // helps gatsby know when a node changed
      }
    }
    createNodeId(node);
  });
}
```

At this point, we should see the data in our GraphQL db:

```js
{
  allUser {
    nodes {
      name
      phone
    }
  }
}
```

## Exercise

Now the exercise is for you to finish the rest!
