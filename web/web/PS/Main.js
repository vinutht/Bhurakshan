
/*Ext.require([       
             'Ext.container.Viewport',
             'PS.imageuploader.ImageUploader'
         ]);*/

Ext.application({
    name: 'PS',    
    launch: function() {    	    	    	
    	var myDesktopApp = new MyDesktop.App({
    		listeners: {
    			'ready': function() {
    				var regWindow = ps.startup.getCompleteRegistrationWindow();
    				regWindow.show();    				
    			}
    		}
    	});    	
    }
});