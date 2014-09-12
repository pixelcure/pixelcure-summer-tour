define(['jquery', 'backbone'], function(){

	function init () {

		var GlobalView = Backbone.View.extend({

			// the header
			header : $('header'),

			// store our scroll up box
			scrollUpBox : $('.top-outer'),

			// init
			initialize : function () {

				// cache of this
				var that = this;
				
				// on scroll and page and a half down, show scroll up box
				$(window).scroll(function(){

					if( $(window).scrollTop() > $(window).height() / 2 ){
						
						that.scrollUpBox.fadeIn();
					
					} else {
						
						that.scrollUpBox.fadeOut();
					
					}
					
				});

			},

			// events
			events : {
				'click a#topButton' : 'scrollUp'
			},

	        // Scroll Up
	        scrollUp : function (e) {

	        	// prevent default action        	
		        e.preventDefault();

		        // animate scroll back to top of document
		        $(document.body).animate({  
		        	
		        	scrollTop: '0'
		          
				}, 700);

	        }

		}); // end Global View

		
		// instiatate new global view
		var globalView = new GlobalView({ el: 'body'});

	}; // end init

	return {
		init : init
	}
}); // end