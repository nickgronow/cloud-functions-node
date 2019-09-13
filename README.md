This library is a collection of helper tools and methods that are commonly used in our cloud functions.

# Development

After pulling the code locally you can run:

```
npm i
```

to get the dependencies.

```
npm test
```

runs the tests.  If you are adding or changing functionality, write/update the tests.  They are written in Jasmine.

# Environment Variables

This shared library looks for certain environment variables to allow it to be environmentally-sensitive depending on where it is run.

Here is the list of supported variables:

* `FAAS_SECRET_PATH` - the location of faas secrets on the local filesystem. Defaults to `/var/openfaas/secrets/`
* `GRAPHQL_URL` - the endpoint to make graphql queries and mutations to. Defaults to `http://localhost:8081/v1/graphql`
* `GRAPHQL_SECRET` - the admin password for the graphql endpoint. Defaults to `secret`

# Deployment

When you have completed making changes, and tests are passing, commit all your changes, then run:

```
npm run release
```

This will increment the patch version, create a git tag, generate a new pack file, and move it to the releases directory.  Now you are ready to push your changes to github.

```
git push && git push --tags
```
