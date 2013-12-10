Ext.define('PS.admin.SubscriptionStatus', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-subscriptionstatus',
	
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
		
		var subscriptionStatusStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        {"name":"Not Subscribed", "value":"NOT_SUBSCRIBED"},
		        {"name":"Active", "value":"ACTIVE"}
		    ]
		});
		
		var subscriptionStatusCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'Subscription Status*',
		    labelWidth: 100,		    
		    labelAlign: 'right',
		    style: 'margin-top: 10px;',
		    store: subscriptionStatusStore,		    
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',
		    allowBlank: false,
		    labelAlign: 'right', labelWidth: 150
		});			
		
		Ext.apply(me, {
			width: 400,
			height: 150,
			items: [
			        userCombo,
			        propertyCombo,
			        subscriptionStatusCombo
			        ],
			        buttons: [{
			            text: 'Change',
			            handler: function() {
			                var form = me.getForm();
			                if(form.isValid()){
			                	var data = me.getData();
			        			var failurecallBack = function(response, opts) {
			        				alert('server-side failure with status code ' + response.status);
			        			};		
			        			
  	            			  var successHandler = function(response) {
	            				  if(response && response.responseText) {
	            					  var resObj = Ext.JSON.decode(response.responseText);
	            					  if(resObj) {
	    	            				  Ext.Msg.show({
	    	            					  title: 'Message',
	    	            					  msg: resObj.msg,
	    	            					  width: 400,
	    	            					  buttons: Ext.MessageBox.OK
	    	            				  });    	            						  
	            					  }
	            				  }
	            			  };				        		  			        			
			        			
			        			ps.shared.Utility.AJAX_FIRE_POST(
			        					ps.admin.serverproxy.URL.CHANGE_SUBSCRIPTION_STATUS,
			        					data,
			        					successHandler,
			        					failurecallBack
			        			);			                	
			                }
			            }
			        }]	
		});
		
		me.callParent(arguments);
		
		this.getData = function() {
			return {				
				email: userCombo.getValue(),
				propertyName: propertyCombo.getValue(),
				subscriptionStatus: subscriptionStatusCombo.getValue()
			};
		};		
	},
	
	getPropertyCombo: function() {
		var propertyCombo = Ext.widget('ps-imageuploader-propertycombo');
		return propertyCombo;
	},
	
	getUserCombo: function() {
		var usersCombo = Ext.widget('userscombo');
		return usersCombo;
	},	
});