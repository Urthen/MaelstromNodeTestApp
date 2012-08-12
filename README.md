MaelstromNodeTestApp
====================

Test application (node.js) for demonstration of Maelstrom Network functionality. This test application makes use of [passport-maelstrom](https://github.com/Urthen/passport-maelstrom).

What is Maelstrom?
------------------

Maelstrom is a new authentication network designed to put choices about identity back into the hands of the users. For more information, please visit our [home page](http://www.projectmaelstrom.com).

Installation
------------

Prerequisites: You must have installed [node.js](http://www.nodejs.org) as appropriate for your platform.

1. Fork the repo and clone locally, if you haven't done so already.
2. Run `npm install -d` at a command line in the repository folder to install dependancies
3. Create an app from the Maelstrom [Application Dashboard](http://prototype.projectmaelstrom.com/dev/apps)
4. Copy the app id and secret into `app/controllers.js`

Running the Test App
--------------------

If you are an independent developer simply looking to test out the app, you can run with `node app.js`. If you have installed the fantastic (nodemon)[https://github.com/remy/nodemon/] program, you can run with `nodemon app.js`. We've already got the ignore file set up!

If you are part of the Maelstrom Development team and running this with foreman against a local Maelstrom instance, run from command line with `foreman start -f Procfile-dev -p 4000`