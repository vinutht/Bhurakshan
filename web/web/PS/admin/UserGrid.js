Ext.define('ps.UserGridModel', {
	extend: 'Ext.data.Model',
	fields: [
		         {name: 'name'}, 
		         {name: 'email'}, 
		         {name: 'address'}, 
		         {name: 'country'}, 
		         {name: 'phone'}, 
		         {name: 'role'}, 
		         {name: 'id'}
	         ]
});

Ext.define('ps.UserGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.ps-user-grid',
	
	initComponent: function() {
		var me = this;
		var userListStore =  me.getUserListGridStore();
		
		var searchField = Ext.create('Ext.form.TextField', {				
	        name: 'searchField',	       	        
	        emptyText: 'Search string ...',
	        allowBlank: true 				
        });		
		
		Ext.apply(me, {
			selModel: Ext.create('Ext.selection.CheckboxModel'),
			columns: me.getUserListGridCols(),
			store: userListStore,
			autoScroll: true,
			height: 500,
			width: 800,
			dockedItems: [
			              {
			            	xtype: 'toolbar',
			            	items: [
			            	        {
			            	        	xtype: 'button',
			            	        	text: 'Add Employee',
			            	        	handler: function() {
			            	        		me.showUserWindow();
			            	        	}
			            	        },
			            	        /*{
			            	        	xtype: 'button',
			            	        	text: 'Edit',
			            	        	handler: function() {
			            	        		me.showUserWindow();
			            	        	}
			            	        },
			            	        {
			            	        	xtype: 'button',
			            	        	text: 'Delete',
			            	        	handler: function() {
			            	        		
			            	        	}
			            	        },*/
			            	        '->',
			            	        searchField,
			            	        {
			            	        	xtype: 'button',
			            	        	text: 'Search',
			            	        	handler: function() {
			            	        		me.getStore().load({params:{searchFilter: searchField.getValue()}});
			            	        	}
			            	        }
			            	]
			              },
			              {
			            	  xtype: 'pagingtoolbar',
			            	  store: userListStore,
			            	  displayInfo: true,
			            	  pageSize: 100,
			            	  displayMsg: 'Displaying Users {0} - {1} of {2}',
			            	  emptyMsg: "No Messages to display",
			            	  dock: 'bottom'
			              }
			]
		});
		
		me.callParent(arguments);
	},
	
	showUserWindow: function() {
		var me = this;
		var userForm = Ext.widget('ps-admin-user-form');
		
		var userWin = new Ext.window.Window({
			title: 'Add Employee',
			layout: 'fit',			
			width: 450,
			height: 300,
			modal: true,
			items: [userForm],			
			buttons: [
			  {				 
				  text: 'Add',
				  handler: function() {
					  if(userForm.validate()) {
						  	var data = userForm.getData();
							var successCallBack = function(response, opts) {
								me.getStore().load();					
							};
							
							var failureCallBack = function(response, opts) {
								alert('server-side failure with status code ' + response.status);								
							};		
							
			        		  ps.shared.Utility.AJAX_FIRE_POST(
	            					  ps.admin.serverproxy.URL.ALL_USERS,
    	            				  data,
    	            				  successCallBack,
    	            				  failureCallBack
	            			  );							
					  }
					  userWin.close();
				  }
			  },
			  {
				  text: 'Cancel',
				  handler: function() {
					  userWin.close();
				  }
			  }
			]
		});
		
		userWin.show();		
		
	},
	
	getUserListGridCols: function() {		
		
		showUploadPhotoWin = function(email) {
			var uploadPhotoPanel = Ext.widget('ps-imageuploader', {email: email});
			
			var uploadPhotoWin = new Ext.window.Window({				
				title: 'Upload Photo',
				layout: 'fit',
				autoShow: true,
				/*width: 800,
				height: 400,*/
				items: [uploadPhotoPanel]				
			});
			
			uploadPhotoWin.show();			
		};
		
		showSubscriptionStatusChangeWin = function(email) {
			var sStatusPanel = Ext.widget('ps-subscriptionstatus', {email: email});
			
			var sStatusWin = new Ext.window.Window({				
				title: 'Subscription Status',
				layout: 'fit',
				autoShow: true,
				/*width: 800,
				height: 400,*/
				items: [sStatusPanel]				
			});
			
			sStatusWin.show();			
		};		
		
		showUserPropertiesWin = function(email) {
			var userProperties = Ext.widget('ps-customer-subscription-grid', {adminMode: true, userEmail: email});
			
			var userPropertiesWin = new Ext.window.Window({				
				title: 'User Properties',
				layout: 'fit',
				autoShow: true,
				width: 800,
				height: 400,
				items: [userProperties]				
			});
			
			userPropertiesWin.show();			
		};		
		
		
		return [
		       Ext.create('Ext.grid.RowNumberer'),
		       {text: 'Name', dataIndex: 'name'},	
		       {text: 'Email', dataIndex: 'email'},
		       {text: 'Address', dataIndex: 'address'},
		       //{text: 'Country', flex: 1, dataIndex: 'country'},
		       {text: 'Phone', dataIndex: 'phone'},
		       {text: 'Role', dataIndex: 'role'},
		       {text: 'Upload Photo', dataIndex: 'email', renderer: function(value) {
		    	   return '<a href="#" onclick="showUploadPhotoWin(\''+value+'\')"> Upload Photo </a>';
		       }},
		       {text: 'Change Subscription', dataIndex: 'email', renderer: function(value) {
		    	   return '<a href="#" onclick="showSubscriptionStatusChangeWin(\''+value+'\')"> Change Subscription </a>';
		       }},		       
		       {text: 'Properties', dataIndex: 'email', renderer: function(value) {
		    	   return '<a href="#" onclick="showUserPropertiesWin(\''+value+'\')"> Properties </a>';
		       }}		       
		];
	},
	
	getUserListGridStore: function() {
		var pSize = 100;
		return Ext.create('Ext.data.Store', {
			model: 'ps.UserGridModel',
			autoLoad: {start: 0, limit: pSize},
			pageSize: pSize,
			proxy: {
				type: 'rest',
				url: ps.admin.serverproxy.URL.ALL_USERS,
				reader: {
					type: 'json',
					totalProperty: 'total',
					root: 'users'
				}
			}		
		});		
	}	
});



Ext.define('ps.admin.UserForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-admin-user-form',
	
	initComponent: function() {
		var me = this;
		
		var roleStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        //{"name": "Admin", "value": "ADMIN"},
		        {"name": "Employee", "value": "EMPLOYEE"}
		    ]
		});		
		var countryStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        {"name":"India", "value":"INDIA"}
		    ]
		});
		var nameField = Ext.create('Ext.form.TextField', {	        
	        name: 'name',
	        labelAlign: 'right', labelWidth: 150,
	        fieldLabel: 'Name*',	        
	        allowBlank: false 				
        });
		
		var emailField = Ext.create('Ext.form.TextField', {	        
	        name: 'email',
	        labelAlign: 'right', labelWidth: 150,
	        fieldLabel: 'Email*',	        
	        allowBlank: false 				
        });

		
		var pwdField = Ext.create('Ext.form.TextField', {	        
	        name: 'password',
	        fieldLabel: 'Password*',
	        labelAlign: 'right', labelWidth: 150,
	        allowBlank: false 				
        });
		
		var addressField = Ext.create('Ext.form.TextArea', {        					       
        	name: 'address',
        	fieldLabel: 'Residential Address',
        	labelAlign: 'right', labelWidth: 150,
        	style: 'margin-top: 10px;',        	
        	allowBlank: true
        });	
		
		var countryCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'Country*',
		    //labelWidth: 150,		    
		    style: 'margin-top: 10px;',
		    labelAlign: 'right', labelWidth: 150,
		    store: countryStore,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',		    
		    allowBlank: false
		});	
		
		var phoneField = Ext.create('Ext.form.TextField', {        					       
        	name: 'phone',
        	fieldLabel: 'Phone',
        	style: 'margin-top: 10px;',
        	labelAlign: 'right', labelWidth: 150,
        	allowBlank: true,        	
        	vtype: 'phone'
        });		
		
		var roleCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'Role*',
		   // labelWidth: 150,		  
		    style: 'margin-top: 10px;',
		    store: roleStore,
		    queryMode: 'local',
		    displayField: 'name',
		    labelAlign: 'right', labelWidth: 150,
		    valueField: 'value',
		    allowBlank: false
		});	
		
		Ext.apply(me, {
			style: 'padding-top: 20px;',
			frame: true,			
			//defaults: {labelAlign: 'right', labelWidth: 150},
			items: [
			        nameField,
			        emailField,
			        pwdField,
			        addressField,
			        //countryCombo,
			        phoneField,
			        //roleCombo			
			]
		});
		
		Ext.apply(Ext.form.VTypes, {
		    phone: function (value, field) {		        
		        return value.replace(/[ \-\(\)]/g, '').length == 10;
		    },
		    phoneText: 'Phone number should be 10 digits long.',
		    phoneMask: /[ \d\-\(\)]/
		});
		
		
		me.callParent(arguments);
		
		me.getData = function() {
			return {
				name: nameField.getValue(),
				password: pwdField.getValue(),
				email: emailField.getValue(),
				//role: roleCombo.getValue(),
				address: addressField.getValue(),
				phone: phoneField.getValue(),
				//country: countryCombo.getValue()				
			};
		};
		
		me.validate = function() {
			return me.getForm().isValid();
		};		
	}
});








