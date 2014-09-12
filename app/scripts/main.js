'use strict';

require([
    'underscore',
    'jquery',
    'backbone',
    'global/global.main',
    'contact/contact.main',
    'itemModal/itemModal.main'
], function (_, Backbone, $, globalView, contactView, itemModalView) {
	
	// initiate global view
	globalView.init();
    
    // init contact view
	contactView.init();

    // init modal view
	itemModalView.init();

}); // end main js 
