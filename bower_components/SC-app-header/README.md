# Southbank Centre App: Header

## Installation

### Step 0

Check [this app's dependencies](https://github.com/Southbank-Centre/SC-app-header/blob/master/bower.json) and make sure that you follow the installation instructions for the SC-app-* modules that this one depends on.

### Step 1
Run the following command in your app's root directory.

    $ bower install --save Southbank-Centre/SC-app-header#n.n.n

Replace n.n.n with the version number of this module that you require. See [the list of releases](https://github.com/Southbank-Centre/SC-app-header/releases).

*Please don't install without a release number or your app will be unstable.*

### Step 2

Add **SC-app-header** to the dependency list in **[YourAppName].module.js**

### Step 3
Add the header view to the **app** state:

    .state('app', {
      url: '',
      views: {
        ...
        'header' : {
          templateUrl: 'bower_components/SC-app-header/release/headerView.html'
        }
        ...
      }
    }