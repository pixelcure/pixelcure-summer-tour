define(['jquery', 'backbone'], function(){

	function init () {

		var ItemModalView = Backbone.View.extend({

			// init
			initialize : function () {

					// position modal
					//this.modalPositioning();

			},

			// the modal we will be showing/hiding, among the image/content
			modal : {
				modal : $('#modal'),
				img : $('#modal').find('img.large-image'),
				title : $('#modal').find('h1.title'),
				blurb : $('#modal').find('p.blurb'),

			},

			// events
			events : {
					'click #modal a.close' : 'closeModal',
					'click .item-row .item' : 'openModal'
			},

			// modal Positioning
			modalPositioning : function (){

					// cache this
					var that = this;
					
					// modal
					$modal = that.modal.modal;
					
					// modal image
					$imageLarge = that.modal.img;

					$(window).resize();

					if( $(window).width() < 760 && that.modal.modal.is(':visible') ){

						// fixModal();

					}

			},

			// close Modal
			closeModal : function (e) {
					
					// cache this
					var that = this;
				
					e.preventDefault();

					// scroll to projects section
					$( document.body ).scrollTop( 2215 );
					
					// hide modal, reset img src
					that.modal.modal.fadeOut( 100 ).find(that.modal.img).attr('src', '');

			},

			// open Modal
			openModal : function (e) {
					
					// cache this
					var that = this;

					// image src, title and the blurb of clicked portfolio item
					var imageURL = $( e.currentTarget ).find('img').attr('src');
					var imageTitle = $( e.currentTarget ).find('img').attr('title');
					var imageBlurb = $( e.currentTarget ).find('img').data('blurb');

					// load image into dom and 
					that.modal.modal.find('img').attr('src', imageURL).load(function(){

					// add modal title and blurb
					that.modal.title.text( imageTitle );
					that.modal.blurb.text( imageBlurb );
			
					// open Modal
					that.modal.modal.height( $( document.body ).height() ).fadeIn(100);

				});


			}

		}); // end Item Modal View

		
		// instiatate new global view
		var itemModalView = new ItemModalView({ el: 'section.view.projects' });

	}; // end init

	return {
		init : init
	}
}); // end