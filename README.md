# README

@TODO move SC-app-* repos into Southbank-Centre account.

## What is SC-app?

SC-app is a basic [Angular.js](https://angularjs.org/) application that can be used to create Southbank Centre websites that interface with the Southbank Centre Content API.

It is designed to be feature-less and generic. Sites can be built up either by having Southbank Centre App Modules (SC-app-\*) installed into them, or by having custom components written specifically for them.

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

@TODO

#### Renaming the app

Once you've cloned the base SC-app, make sure to change app name everywhere, including documentation. 

As a future step this could be automated as a Grunt task, where the app name need only be entered once as a global variable and then running grunt serve/build will update it everywhere (eg [https://github.com/yoniholmes/grunt-text-replace](https://github.com/yoniholmes/grunt-text-replace).

#### App config constants

Please update the following constants in SC-app.constants.js. These should match the data you are intending to get from the CMS. This can be gatehred from the CMS or examing the JSON output.
- __festivalAlias__ (the Drupal alias of a festival content type)
- __homeLandingPageAlias__ (the Drupal alias of a landing page content type)
- __disqus_shortname__ (used by the third party discussion tool Disqus)
- __hostName__ (used by the third party discussion tool Disqus)
- __ticketingVocabularyId__ (the taxonomy used for the ticketing model)
- __schedPlannerShortname__ (used by the third party planner tool Sched)

#### Adding a homepage

@TODO. Adding view to app.home state.

### Developing an app module

@TODO

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


## Development

@TODO move to 'Developing with the Southbank Centre App framework'

### Running the app

In the base directory, run the following command:

    $ grunt serve

The app should open in your default browser, running at http://localhost:9000/

The grunt task will watch the app files for changes. It will rebuild and reload the app when any changes are made.

### Building the app

To build the app in a distributable form, run the following from the base directory:

    $ grunt build

The files will be compiled into the `/dist` directory.

### Installing SC-app-\* modules

SC-app-\* modules can be installed using bower in the following way, using SC-app-event as an example:

    $ bower install --save Southbank-Centre/SC-app-event

The files will be installed into the `/bower_components` directory. Re-running `$ grunt serve` will include the module in the `index.html` file. You can then include it as a dependency of your app if your `*.module.js` file.

*Most SC-app-\* modules also include other instructions to integrate their features into your app, so make sure you read their README files.*
