
Ext.require(['Ext.data.*']);

Ext.define('PS.imageuploader.ImageUploader', {
	extend: 'Ext.form.Panel',
	alias: 'widget.imageuploader',
	initComponent: function() {
		var me = this;
		var userCombo = me.getUserCombo();
		var initConfig = {
				title: 'Upload Image',
				width: 500,
				height: 500,
				items: [
				        userCombo,
				        {
				            xtype: 'filefield',
				            name: 'property-image',
				            fieldLabel: 'Photo',
				            labelWidth: 50,
				            msgTarget: 'side',
				            allowBlank: false,
				            anchor: '100%',
				            buttonText: 'Select Photo...'				        	
				        }],
		        buttons: [{
		            text: 'Upload',
		            handler: function() {
		                var form = me.getForm();
		                if(form.isValid()){
		                    form.submit({
		                        url: '/ps/images',
		                        waitMsg: 'Uploading the photo...',
		                        success: function(fp, o) {
		                            Ext.Msg.alert('Success', 'The photo "' + o.result.file + '" has been uploaded.');
		                        }
		                    });
		                }
		            }
		        }]				        
		};
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},
	
	getUserCombo: function() {
		var usersCombo = Ext.widget('userscombo');
		return usersCombo;
	}
}); 

Ext.define('PS.imageuploader.UsersCombo', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.userscombo',
	
	initComponent: function() {
		var me = this;
		var store = me.getStore();
		var initConfig = {
				store: store,
				fieldLabel: 'Select Users',
			    queryMode: 'remote',
			    displayField: 'name',
			    allowBlank: false,
			    valueField: 'id'		    
		};
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},
	
	getStore: function() {
		var states = Ext.create('Ext.data.Store', {
		    fields: ['id', 'name'],		    
	        autoLoad: true,
	        autoSync: true,		        
	        proxy: {
	            type: 'rest',
	            url: '/ps/users',
	            reader: {
	                type: 'json',
	                root: 'user'
	            }
	        }			    		    
		});	
		return states;
	}


});