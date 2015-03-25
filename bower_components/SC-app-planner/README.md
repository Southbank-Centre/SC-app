# Southbank Centre App: Planner

## Installation

### Step 0

Check [this app's dependencies](https://github.com/Southbank-Centre/SC-app-planner/blob/master/bower.json) and make sure that you follow the installation instructions for the SC-app-* modules that this one depends on.

### Step 1
Run the following command in your app's root directory.

    $ bower install --save Southbank-Centre/SC-app-planner#n.n.n

Replace n.n.n with the version number of this module that you require. See [the list of releases](https://github.com/Southbank-Centre/SC-app-planner/releases).

*Please don't install without a release number or your app will be unstable.*

### Step 2

Add **SC-app-planner** to the dependency list in **[YourAppName].module.js**

### Step 3
Add the app.page state to your app:

    .state('app.planner', {
      url: '^/planner',
      views: {
        '@': {
          templateUrl: 'bower_components/SC-app-planner/release/plannerView.html'
        }
      }
    })

### Step 4

Download the Sched JavaScript and CSS files for your embed. Add them into the assets/sched directory in you app.

@TODO how to access these files through the Sched interface.

### Step 5

Add the shortname for you sched planner to the app config in [YourAppName].constants.php:

    schedPlannerShortname: 'SHORTNAMEHERE'

@TODO how to access the shortname through the Sched interface