$(function() {

	
		// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
		$( "#dialog:ui-dialog" ).dialog( "destroy" );
		
		var name = $( "#register_name" ),
		email = $( "#register_email" ),			
		//password = $( "#register_password" ),
		//allFields = $( [] ).add( name ).add( email ).add( password ),
		allFields = $( [] ).add( name ).add( email ),
		//allFields = $( [] ).add( email ),
		tips = $( ".validateTips" );

		function updateTips( t ) {
			tips
				.text( t )
				.addClass( "ui-state-highlight" );
			setTimeout(function() {
				tips.removeClass( "ui-state-highlight", 1500 );
			}, 500 );
		}

		function checkLength( o, n, min, max ) {
			if ( o.val().length > max || o.val().length < min ) {
				o.addClass( "ui-state-error" );
				updateTips( "Length of " + n + " must be between " +
					min + " and " + max + "." );
				return false;
			} else {
				return true;
			}
		}
		
		function isEmpty(o, msg) {
			if(o.val().length < 1 || o.val() === undefined || o.val() === '') {
				o.addClass( "ui-state-error" );
				updateTips(msg);
				return false;
			}
			else {
				return true;
			}
		}

		function checkRegexp( o, regexp, n ) {
			if ( !( regexp.test( o.val() ) ) ) {
				o.addClass( "ui-state-error" );
				updateTips( n );
				return false;
			} else {
				return true;
			}
		}
		
		function markFieldInvalid(field, msg) {
			field.addClass( "ui-state-error" );
			updateTips( msg );
		}
		
		function updateStatus(msg) {
			updateTips( msg );
		}
		
		function getDialogButton( dialog_selector, button_name )
		{
			
			var buttons = $( dialog_selector + ' .ui-dialog-buttonpane button' );
			for ( var i = 0; i < buttons.length; ++i ) {
				
				var jButton = $( buttons[i] );
				if ( jButton.text() == button_name ) {
     
					return jButton;
				}
			}

			return null;
		}		


		$( "#bhurakshan-registration-form" ).dialog({
			autoOpen: false,
			height: 390,					
			width: 350,
			modal: true,
			dialogClass: 'bhurakshan-registration-dialog',
			open: function(event, ui) {
				updateStatus( "Please complete the form to signup." );
				var registerBtn = getDialogButton('.bhurakshan-registration-dialog', 'Register');
				if(registerBtn) {
					$(registerBtn).attr('disabled', false).removeClass('ui-state-disabled');
				}
				allFields.val( "" ).removeClass( "ui-state-error" );
			},
			buttons: {
				"Register": function(evt) {
					var me_dialog = this;
					var bValid = true;
					allFields.removeClass( "ui-state-error" );

					bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_\s])+$/i, "Name cannot be empty." );
					// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
					bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. abc@xyz.com" );
					var responseField = $( "#recaptcha_response_field" );
					bValid = bValid && isEmpty( responseField, "Captcha cannot be left empty." );
					
					
					if(bValid) {
						updateStatus( "Processing... Please wait." );
												
						var registerBtn = evt.target;
						if(registerBtn) {																	
							$(registerBtn).attr('disabled', true).addClass( 'ui-state-disabled' );
						}	
						
						var challengeField = $( "#recaptcha_challenge_field" );
						var user = '{"name":"'+name.val()+'", "email":"'+email.val()+'", "captchaChallengeField":"'+challengeField.val()+'", "captchaResponseField":"'+responseField.val()+'"}';
						$.ajax({
							  url: '/ps/users',
							  type: 'POST',
							  data: user,
							  contentType: 'application/json; charset=utf-8',
							  dataType: 'json',
							  success: function(data, status, jqXHR) {
								  if(!data.success) {
									  
									  var fName = data.field;
									  if(fName === 'Email') {
										  markFieldInvalid(email, data.msg);
									  }
									  else {
										  updateStatus(data.msg);
									  }
									  var registerBtn = getDialogButton('.bhurakshan-registration-dialog', 'Register');
									  if(registerBtn) {
										  $(registerBtn).attr('disabled', false).removeClass('ui-state-disabled');
									  }									  
								  }
								  else {
									  console&&console.log(data);
									  $( me_dialog ).dialog( "close" );	
									  $('#registration_success').bPopup();							   									  
								  }
							  },
							  failure: function(data, status, jqXHR) {
								  console&&console.log(data);
								  $( me_dialog ).dialog( "close" );	
							  }
						});						
					}
				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});

		$( "#register_user" )
			.click(function() {
				$( "#bhurakshan-registration-form" ).dialog( "open" );
			});
		
		$( "#register_user_slider" )
		.click(function() {
			$( "#bhurakshan-registration-form" ).dialog( "open" );
		});	
		
		$( "#register_technology_slider" )
		.click(function() {
			$( "#bhurakshan-registration-form" ).dialog( "open" );
		});		
		
		
				
});
