# README

## Setting up development environment

### Requirements

- Ruby >= 2.0.0p353
- bundler (http://bundler.io/)
- node.js
- grunt-cli (http://gruntjs.com/getting-started)
- bower (http://bower.io/#install-bower)

### Installation

After installing the dependencies listed in the requirements above, run the following to install the correct ruby gems.

Run the following in the base directory:

    $ npm install

_Note: If you already have any of the ruby gems listed in the Gemfile installed, they will be overwritten by the following command. This can cause issues with gem version dependencies. Using bundler allows you to ensure bundles of gems are installed together._

    $ bundle install

    $ bower install


### Running the app

In the base directory, run the following command:

    $ grunt serve

The app should open in your default browser, running at http://localhost:9000/
