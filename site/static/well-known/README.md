Netlify doesn't deploy hidden files, it seems:
https://community.netlify.com/t/hidden-files-removed-in-zip-deploy/8997

Remember to add an entry in [../../\_redirects](../../_redirects) for any
files that you add to this directory to make them accessible via
the url .well-known.
