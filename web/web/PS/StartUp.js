
Ext.namespace('ps.startup');

ps.startup.getCompleteRegistrationWindow = function() {
	
	var registrationDetails = Ext.widget('ps-registration-details');
	
	function closeRegWindow() {
		regWindow.close();
	}
	
	var regWindow = Ext.create('Ext.window.Window', {
	    title: 'Please complete the registration',    				    
	    height: 450,
	    width: 400,
	    layout: 'fit',
	    modal: true,
	    closable: false,
	    items: [registrationDetails],
	    buttons: [
	              {
	            	  text: 'Ok',
	            	  scope: this,
	            	  handler: function() {	            		  
	            		  registrationDetails.submit(closeRegWindow);	            		 
	            	  }
	              }             
	             ]
	});   
	
	return regWindow;

};