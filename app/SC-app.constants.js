'use strict';

angular
  .module('SC-app')
  .constant('angularMomentConfig', {

    timezone: 'Europe/London'

  })
  .constant('appConfig', {

    // Module SC-app-festival
    // JSON path alias for festival content item
    festivalAlias: 'women-world-festival-1',

    // Module SC-app-festival
    // Node ID of the festival content item, extract from the end of festivalAlias
    get festivalId() {

      if (typeof this.festivalAlias === 'string') {

        return this.festivalAlias.substr(this.festivalAlias.lastIndexOf('-') + 1);

      } else {

        return false;

      }

    },

    // Module: SC-app-blog
    // Used by disqus plugin
    disqus_shortname: 'wow2015',

    // Module: SC-app-event
    // Vocabulary ID of the vocabulary that manages ticket types
    ticketingVocabularyId: 4,

    // Module: SC-app-utils
    // Defines whether or not angular caching is enabled
    angularCache: true

  });