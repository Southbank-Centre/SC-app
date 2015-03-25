# Southbank Centre App: Landing Page

### Step 0

Check [this app's dependencies](https://github.com/Southbank-Centre/SC-app-landing-page/blob/master/bower.json) and make sure that you follow the installation instructions for the SC-app-* modules that this one depends on.

### Step 1
Run the following command in your app's root directory.

    $ bower install --save Southbank-Centre/SC-app-landing-page#n.n.n

Replace n.n.n with the version number of this module that you require. See [the list of releases](https://github.com/Southbank-Centre/SC-app-landing-page/releases).

*Please don't install without a release number or your app will be unstable.*

### Step 2

Add **SC-app-landing-page** to the dependency list in **[YourAppName].module.js**

### Step 3

Install the optional features of this module.

#### Setting a Homepage

To set a particular landing page as the app's homepage, add it's path alias to the **appConfig** constant in **[YourAppName].constants.js:

    homeLandingPageAlias: 'path-alias-here-1'

#### Routes to landing pages

@TODO Not currently supported. In the future, a new constant could map landing page routes to the piece of CMS content that defines them, e.g.

    {
      "app.aLandingPage": "a-landing-page-123"
    }