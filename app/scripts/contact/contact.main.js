define(['jquery', 'backbone'], function(){
'use strict'

	function init () {

		var ContactView = Backbone.View.extend({
			// Init 
			initialize : function () {

			},
			
			// form
			form : $(this.el).find('form'),

			// form error messages
			errorMessages : {
				fieldError : $('.email-sent h2.field-error'),
				robotError : $('.email-sent h2.robot'),
				serverError : $('.email-sent h2.server-error'),
				success : $('.email-sent h2.success')
			},

			// form loader gif
			loader : $('div.loading'),
			
			// Events
			events : {
				'click #submit' : 'validation'
			},
			
			// Form Validation
			validation : function (e) {
				// keep a cache of this
				var that = this;

				// prevent default action
				e.preventDefault();
				
				// grab our field in a variable
				var $field = $('input.field, textarea.field');

				// error message
				var message = that.errorMessages.fieldError;

				// assume all fields are empty, set false
				var valid = false;
				
				// if they have already clicked submit, remove 'not valid' to begin new error check
				$('.not-valid').removeClass('not-valid');

				// iterate through each field
				$field.each(function(){	

					if( $(this).val() === '' ){
						
						$(this).addClass('not-valid');
						
						// not valid to go on
						if(valid) {
							valid = false;
						}

					} else {

						// we're good, all fields are filled
						valid = true

					}

				}); // end each

				// if form isn't valid, fade in error msg and show which ones
				if( !valid ) {

					// tell them the fields are not all filled in
					message.fadeIn().delay(2000).fadeOut();
					
					// flash field that is not valid
					$('.not-valid').fadeIn().fadeOut().fadeIn();

					// after focus, remove border so they can try again
					$('.not-valid').on('focus', function(){
						
						$(this).removeClass('not-valid');

					});

				} else {
					
					// otherwise, check the robot
					that.robotCheck();	
				
				}

			},

			// Robot Check
			robotCheck : function () {
				// cache this
				var that = this;

				// grab robot field
				var $field = $('input[name=robotCheck]');
				
				// grab the robot check field value
				var fieldVal = $field.val();

				// Answer to form item robot question
				var correctAnswer = 10;

				if( fieldVal == correctAnswer ){
				
					that.contactSend();
				
				} else {

					// show robot message
					that.errorMessages.robotError.fadeIn().delay(2000).fadeOut();

					$field.fadeOut('fast').fadeIn('fast').css('border', '1px solid red');
				
				}

			}, // end robot check

			// Contact Send
			contactSend : function (e) {

				// cache this
				var that = this;
				
				// grab our form from our view
				var $form = that.form;

				// store our hidden loading gif
				var $loader = that.loader;

				var fields = {
						firstName : $('input[name=firstName]').val(),
						lastName : $('input[name=lastName]').val(),
						phoneNumber : $('input[name=phoneNumber]').val(),
						email : $('input[name=email]').val(),
						subject : $('input[name=subject]').val(),
						message : $('#message').val()
				};

				// create a data string
				var dataString = '/mail/mail.php?firstName=' + fields.firstName + '&lastName=' + fields.lastName + '&phoneNumber=' + fields.phoneNumber + '&email=' + fields.email +'&subject=' + fields.subject + '&message=' + fields.message;				
				
				// hide the form, bring up loading gif
				$loader.fadeIn();

				$.ajax({
					type : 'POST',
					url : dataString,
					crossDomain : true,
					cache: false,
					
					success : function( response ){
						
						// hide ajax loader
						$loader.hide();
						
						// fade in success message
						that.errorMessages.success.fadeIn();

					},

					error : function ( response ){
						
						// hide ajax loader
						$loader.hide();										
						
						// show error message
						that.errorMessages.serverError.fadeIn().delay(2000).fadeOut();

					}
				}); // end request

			} // end contact send

		});

		var contactView = new ContactView({ el: '.contact-form'});

	}; // end init

	return {
		init : init
	}

}); // end