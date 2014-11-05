# Specification: Single event page (story #81755500)

## Description

The single event page will provide detailed information about one event.

## Implementation

A new component will be added to the app called 'event'.

A new Angular factory service (eventFactory) will be created. This will make a call to the API upon instantiation, requesting the data for the event that is to be displayed.

A new Angular route (event) will be created. This will define the URL at which the single event page will be accessible:

    /event/[eventID]
    
It will also define the template that will be used to render the page.

A new Angular controller (eventCtrl) will be created. This will be used to define how the event data will be integrated into the page, as well as any custom behaviour for the page.

A new view template (eventView) will be created. This will include the markup necessary for displaying the event information according to the designs.

The design for the page will be implemented.