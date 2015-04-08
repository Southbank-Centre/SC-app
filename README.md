# README

@TODO move SC-app-* repos into Southbank-Centre account.

## What is SC-app?

SC-app is a basic [Angular.js](https://angularjs.org/) application that can be used to create Southbank Centre websites that interface with the Southbank Centre Content API.

It is designed to be feature-less and generic. Sites can be built up either by having Southbank Centre App Modules (SC-app-\*) installed into them, or by having custom components written specifically for them.

## Setting up development environment

### Requirements

- Ruby >= 2.0.0p353
- bundler (http://bundler.io/)
- node.js and npm (http://nodejs.org/)
- grunt-cli (http://gruntjs.com/getting-started)
- bower (http://bower.io/#install-bower)


### Dependency installation

Node mudules, Bower components and Ruby Gems are already included in this repository, so there is no need to install them. However if you do need to install them again please follow the steps below:

After installing the software listed in the requirements above and cloning a copy of this app, run the following to install the correct dependencies for the app.

Run the following in the base directory:

    $ npm install

    $ bundle install --deployment

    $ bower install

## Developing with the Southbank Centre App framework

### App design

The aim of this project is to allow content-led and feature-rich websites to be built up as efficiently as possible. It has been structured to be a reusable as possible, so further development should be done with the following in mind:

#### 1. Think modular

With every feature or enhancement, aim to build it in such a way that it can be added to another SC app. In practice this means creating a new module or releasing a new version of an existing module.

#### 2. Back-compatible and future-proof

As SC-app and SC-app-* modules develop, websites that use them may be updated with later releases. Bear this in mind to ensure that either:

a) Changes won't break existing sites as they upgrade.

b) Breaking changes and upgrade paths are documented, and release numbers reflect this.

### Developing an app

#### Renaming the app

Once you've cloned the base SC-app, make sure to change app name everywhere, including documentation.

You'll also need to updated any instance of SC-app-longname. Currently this is only in the `description` item in the main package.json object, and in the `longName` key in the `appDetails` hash in the main package.json object.

_Note: If using app-wide find-and-replace to rename it everywhere, be sure to exclude __bower.json__ and do that by hand._

As a future step this could be automated as a Grunt task, where the app name need only be entered once as a global variable and then running grunt serve/build will update it everywhere (eg [https://github.com/yoniholmes/grunt-text-replace](https://github.com/yoniholmes/grunt-text-replace).

#### Running the app

In the base directory, run the following command:

    $ grunt serve

The app should open in your default browser, running at http://localhost:9000/

The grunt task will watch the app files for changes. It will rebuild and reload the app when any changes are made.

#### Building the app

To build the app in a distributable form, run the following from the base directory:

    $ grunt build

The files will be compiled into the `/dist` directory.

#### Installing SC-app-\* modules

SC-app-\* modules can be installed using bower in the following way, using SC-app-event as an example:

    $ bower install --save Southbank-Centre/SC-app-event

The files will be installed into the `/bower_components` directory. Re-running `$ grunt serve` will include the module in the `index.html` file. You can then include it as a dependency of your app if your `*.module.js` file.

*Most SC-app-\* modules also include other instructions to integrate their features into your app, so make sure you read their README files.*

#### App config constants

Certain functionality requires that you define constants in SC-app.constants.js. These should match the data you are intending to get from the CMS. This can be gatehred from the CMS or examining the JSON output.
- __festivalAlias__ Required by SC-app-festival. The Drupal alias of a festival content type.
- __ticketingVocabularyId__ Required by SC-app-festival. The taxonomy used for the ticketing model.
- __homeLandingPageAlias__ The Drupal alias of a landing page content type.
- __disqus_shortname__ Required to enable commenting on blogs provided by SC-app-blog module. Used by the third party discussion tool Disqus.
- __hostName__ Required to enable commenting on blogs provided by SC-app-blog module. Used by the third party discussion tool Disqus.
- __schedPlannerShortname__ Required by SC-app-planner. Used by the third party planner tool Sched.

#### Adding a homepage

See the README for [SC-app-landing-page](https://github.com/Southbank-Centre/SC-app-landing-page).

### Developing an app module

It is best to test SC-app-* modules from within an app as you develop it. Therefore the workflow for developing a module is as follows:

1. Create the module if necessary (see below), or checkout the module files if you are developing an existing module.
2. Create a new branch in your module's repository and push it up to GitHub.
3. In the base directory of an app that you can use for testing the module's development, run the following:

    bower install --save Southbank-Centre/<SC-app-module-name>#<branch-name>

4. Make changes to the module. Make sure to always run `grunt build` after making changes.
5. Commit your changes to your branch and push the changes up to GitHub.
6. If your test app, run `bower update` to pull in the changes you just pushed up to GitHub.
7. Once the module changes have been tested and accepted, create a new tag using the [SemVer](http://semver.org/) specification, and publish a new release with that tag.
7. If any new modules require the updated module, run `bower install --save Southbank-Centre/<SC-app-module-name>#n.n.n` where _n.n.n_ is the latest version number, and create new releases for those apps.

#### Creating a new app module

@TODO
