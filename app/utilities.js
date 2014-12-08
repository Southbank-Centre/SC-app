'use strict';

var utilities = utilities || {

  /* Given a timestamp in seconds, returns a timestamp in milliseconds */
  timestampSecondsToMS: function(timestamp) {
    var timestampMS = timestamp;

    // Convert to string for validation
    timestamp = timestamp.toString();

    // Only convert timestamp to milliseconds if the string
    // represents a 10 digit integer
    if (/^\d+$/.test(timestamp) && timestamp.length === 10) {
      timestampMS = Number(timestamp * 1000).toString();
    }

    return timestampMS;
  }

};