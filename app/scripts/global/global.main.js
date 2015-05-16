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

			// events hash
			events : {
				'click a#topButton' : 'scrollUp',
				'click nav a' : 'scrollLink'
			},

	        // Scroll Up Top Button
	        scrollUp : function (e) {

	        	// prevent default action        	
		        e.preventDefault();

		        // animate scroll back to top of document
		        $( 'body, html' ).animate({  
		        	
		        	scrollTop: '0'
		          
				}, 1000 );

	        },

	        // Scroll Link Animation
	        scrollLink : function (e) {
	        	
	        	// prevent default action 
	        	e.preventDefault();
	        	
	        	// the href url
	        	var hashURL = $(e.currentTarget).attr('href');
	        	
	        	// offset from top of window
	        	var offSet = $('section' + hashURL ).offset().bottom;

	        	// set the hash URL to perform the default action
	        	window.location.hash = hashURL;
	        	
	        	// animate to the section
	        	$( 'body, html' ).animate({

	        		scrollTop : offSet
	        	
	        	}, 1000 );

	        }

		}); // end Global View

		
		// instiatate new global view
		var globalView = new GlobalView({ el: 'body'});

	}; // end init

	return {
		init : init
	}
}); // end