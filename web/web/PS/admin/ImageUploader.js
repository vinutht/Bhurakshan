
Ext.define('PS.imageuploader.ImageUploader', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-imageuploader',
	initComponent: function() {
		var me = this;
		var userCombo = me.getUserCombo();
		
		userCombo.setValue(me.email);
		
		var propertyCombo = me.getPropertyCombo();
		
		function loadProperties(email) {
			function populatePropertyCombo(data)  {
				propertyCombo.store.loadData(data);				
			}
			
			Ext.Ajax.request({
				url: '/ps/admin/users/'+email+'/properties',
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				success: function(response, opts) {
					var propertiesObj = Ext.JSON.decode(response.responseText);
					if(!Ext.isEmpty(propertiesObj)) {
						populatePropertyCombo.call(propertyCombo, propertiesObj.properties);
					}					
				},
				failure: function(response, opts) {
					alert('server-side failure with status code ' + response.status);
				}				
			});			
		}
		
		loadProperties(me.email);
		
		/*userCombo.on('change', function(combo, newValue, oldValue) {
			
			function populatePropertyCombo(data)  {
				propertyCombo.store.loadData(data);				
			}
			
			Ext.Ajax.request({
				url: '/ps/admin/users/'+newValue+'/properties',
				method: 'GET',
				headers: {
					'Accept': 'application/json'
				},
				success: function(response, opts) {
					var propertiesObj = Ext.JSON.decode(response.responseText);
					if(!Ext.isEmpty(propertiesObj)) {
						populatePropertyCombo.call(propertyCombo, propertiesObj.properties);
					}					
				},
				failure: function(response, opts) {
					alert('server-side failure with status code ' + response.status);
				}				
			});
		});*/
		
		
		var propertyCombo = me.getPropertyCombo();
		
		var initConfig = {				
				width: 400,
				height: 150,
				items: [
				        userCombo,
				        propertyCombo,
				        {
				            xtype: 'filefield',
				            name: 'property-image',
				            fieldLabel: 'Photo',
				            //labelWidth: 50,
				            msgTarget: 'side',
				            allowBlank: false,
				            labelAlign: 'right', labelWidth: 150,
				            style: 'margin-top: 10px;',
				            //anchor: '100%',
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
		                            Ext.Msg.alert(o.result.msg);
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
	},
	
	getPropertyCombo: function() {
		var propertyCombo = Ext.widget('ps-imageuploader-propertycombo');
		return propertyCombo;
	}
}); 

Ext.define('PS.imageuploader.PropertyCombo', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.ps-imageuploader-propertycombo',
	
	initComponent: function() {
		var me = this;
		var store = me.getStore();
		var initConfig = {
				store: store,
				fieldLabel: 'Select Property',
			    queryMode: 'local',
			    displayField: 'propertyName',
			    labelAlign: 'right', labelWidth: 150,
			    style: 'margin-top: 10px;',
			    allowBlank: false,
			    valueField: 'propertyName',
			    name: 'property-name'
		};
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},
	
	getStore: function() {
		var propertyStore = Ext.create('Ext.data.JsonStore', {
		    fields: ['propertyName', 'id'],
		    autoLoad: false/*,		    
	        autoLoad: true,
	        autoSync: true,		        
	        proxy: {
	            type: 'rest',
	            url: '/ps/admin/properties',
	            reader: {
	                type: 'json',
	                root: 'properties'
	            }
	        }*/			    		    
		});	
		return propertyStore;
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
				fieldLabel: 'User',
				style: 'margin-top: 10px;',
			    queryMode: 'local',
			    displayField: 'email',
			    allowBlank: false,
			    valueField: 'email',
			    labelAlign: 'right', labelWidth: 150,
			    name: 'property-user'
		};
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},
	
	getStore: function() {
		var userStore = Ext.create('Ext.data.Store', {
		    fields: ['email', 'name']/*,		    
	        autoLoad: true,
	        autoSync: true,		        
	        proxy: {
	            type: 'rest',
	            url: '/ps/admin/users',
	            reader: {
	                type: 'json',
	                root: 'user'
	            }
	        }*/			    		    
		});	
		return userStore;
	}


});