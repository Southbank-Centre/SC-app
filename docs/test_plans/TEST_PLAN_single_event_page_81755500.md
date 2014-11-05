# Test plan: Single event page (story #81755500)

## Test 1: Test data

- [ ] See that the URL for the event page accords to the following format: [hostname]/event/[human-friendly-event-id]
- [ ] See that the information about the event is correct
- [ ] See that required field values are displayed on the page
- [ ] See that labels for non-required fields do not appear when the value of the field is empty
- [ ] See that the duration matches the difference between the start time and the end time of the event
- [ ] See that all characters are UTF-8 encoded
- [ ] See that any non-required data that is malformed is suppressed from display
- [ ] See that you are taken to the 404 page if any required data is malformed
- [ ] See that you are taken to the 404 page if the event path specified in the URL is invalid

## Test 2: Test design and layout

- View the page at a variety of screen widths and test the following:
- [ ] See that the page elements are laid out in accordance with the design specification
- [ ] See that all colours display exactly as specified in the design specification
- [ ] See that all font faces, sizes, weights and spacing match those specified in the design specification
- [ ] See that all images are sized correctly (images won't be responsible, but should scale)
- [ ] Where no design specification exists for a particular screen width, see that the layout of the page displays the content clearly and that the layout is a good interpretation of the design specification
- [ ] See that the page still lays out in an acceptable and clear way if any field data is particularly long or particularly short

## Test 3: Test functionality

- Click on the 'Book now' button
	- [ ] See that the 'Book now' button links you to a site where tickets for that event can be bought
- [ ] See that the price (or price range) on the 'Book now' button matches the tickets prices available to purchase on the site to which the button links
- Click on the 'Full description' link underneath the event title
	- [ ] See that you are taken down the page to the 'Full description' section
- [ ] See that all other links route to the expected destination