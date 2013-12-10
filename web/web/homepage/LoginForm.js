$(function() {
	
	// a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
	$( "#dialog:ui-dialog" ).dialog( "destroy" );
	
	
	var loginName = $( "#j_username" ),
	    loginPwd = $( "#j_password" ),
	    allFields = $( [] ).add( loginName ).add( loginPwd ),
	    tips = $( ".validateLoginTips" );
	
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

	function checkRegexp( o, regexp, n ) {
		if ( !( regexp.test( o.val() ) ) ) {
			o.addClass( "ui-state-error" );
			updateTips( n );
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
	
	function loginToServer()
	{
		var bValid = true;
		allFields.removeClass( "ui-state-error" );
						
		bValid = bValid && checkRegexp( loginName, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. abc@xyz.com" );
		bValid = bValid && isEmpty( loginPwd, "Password cannot be empty." );
		
		if(bValid) {
			//console.log($("#the_security_guard"));
			$("#the_security_guard")[0].submit();
			$( this ).dialog( "close" );
			
		}										
	}
	
	    
    $( "#bhurakshan-login-form" ).keypress(
            function( event ) {
                code = event.keyCode ? event.keyCode : event.which;

                if ( code == 13 ) {
                	loginToServer();

                    return false;
                }
            }		
    );
	
	$( "#bhurakshan-login-form" ).dialog({
		autoOpen: false,
		height: 250,					
		width: 350,
		modal: true,
		dialogClass: 'bhurakshan-login-dialog',
		open: function(event, ui) {
			updateStatus( "Please enter your credentials." );
			allFields.val( "" ).removeClass( "ui-state-error" );
		},
		
		buttons: {
			"Login": function(evt) {
				loginToServer();
			},			
			"Forgot Password": function(evt) {
				var me_login_dialog = this;
				var bValid = true;
				allFields.removeClass( "ui-state-error" );
				
				bValid = bValid && checkRegexp( loginName, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. abc@xyz.com" );
				
				if(bValid) {
					updateStatus( "Processing... Please wait." );
					
					var forgotPassBtn = evt.target;
					if(forgotPassBtn) {																	
						$(forgotPassBtn).attr('disabled', true).addClass( 'ui-state-disabled' );
					}
					
					$.ajax({
						url: '/ps/password-management/forgot-password/'+loginName.val(),
						type: 'POST',
						success: function(obj, status, jqXHR) {	
							var data = jQuery.parseJSON(jqXHR.responseText);							
							if(!data.success) {								  
								var fName = data.field;
								if(fName === 'Email') {
									markFieldInvalid(loginName, data.msg);
								}
								else {
									updateStatus(data.msg);
								}	
								if(forgotPassBtn) {																	
									$(forgotPassBtn).attr('disabled', false).removeClass( 'ui-state-disabled' );
								}								  
							  }
							  else {								  
								  if(forgotPassBtn) {																	
									  $(forgotPassBtn).attr('disabled', false).removeClass( 'ui-state-disabled' );
								  }								  
								  $( me_login_dialog ).dialog( "close" );
								  $('#forgot_password_success').bPopup();
							  }
						},
						failure: function(data, status, jqXHR) {	
							$( me_login_dialog ).dialog( "close" );
							alert("Some error. Please report to us.");
						}
					});
				}
			},
			"Cancel": function(evt) {
				$( this ).dialog( "close" );
			}
		},
		close: function() {			
			allFields.val( "" ).removeClass( "ui-state-error" );
		}
		
	});
	
	$( "#login_user" )
	.click(function() {
		//$( "#bhurakshan-login-form" ).dialog( "open" );
		$.ajax({
			  url: 'PS/Home.jsp',
			  type: 'GET',			 
			  //dataType: 'html',
			  success: function(data, status, jqXHR) {				  
				  $( "#bhurakshan-login-form" ).dialog( "open" );
			  },
			  failure: function(data, status, jqXHR) {
				  console&&console.log(data);
				  
			  }
		});		
		//window.location = "PS/App.html";
	});	
	
	
});