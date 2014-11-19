# README

## Setting up development environment


### Requirements

- Ruby >= 2.0.0p353
- bundler (http://bundler.io/)
- node.js and npm (http://nodejs.org/)
- grunt-cli (http://gruntjs.com/getting-started)
- bower (http://bower.io/#install-bower)


### Dependency installation

Node mudules, Bower components and Ruby Gems are already included in this repository, so there is no need to install them. However if you do need to install them again please follow the steps below:

After installing the software listed in the requirements above, run the following to install the correct dependencies for the app.

Run the following in the base directory:

    $ npm install

    $ bundle install --deployment

    $ bower install


### Running the app

In the base directory, run the following command:

    $ grunt serve

The app should open in your default browser, running at http://localhost:9000/
