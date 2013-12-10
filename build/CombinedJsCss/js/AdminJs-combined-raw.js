
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

/*Ext.define('ps.UploadPhotoModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-upload-photo-module',
	
    init : function(){
        this.launcher = {
            text: 'Upload Photo',
            iconCls:'customer-profile-shortcut'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var uploadPhotoWin = desktop.getWindow('ps-upload-photo-module');
		
		if(!uploadPhotoWin) {
			uploadPhotoWin = desktop.createWindow({
				id: 'ps-upload-photo-module',
				title: 'Upload Photo',				
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [
				        {
				        	xtype: 'ps-imageuploader'
				        }
				]
			});
		}
		
		return uploadPhotoWin;
	}
});*/

Ext.define('ps.admin.ServiceValueModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-admin-service-value-module',
	
    init : function(){
        this.launcher = {
            text: 'Add Service Cost',
            iconCls:'customer-profile-shortcut'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var serviceValWin = desktop.getWindow('ps-admin-service-value-module');
		
		if(!serviceValWin) {
			serviceValWin = desktop.createWindow({
				id: 'ps-admin-service-value-module',
				title: 'Add Service',
				/*width: 800,
				height: 500,*/
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [
				        {
				        	xtype: 'ps-service-value-form'
				        }
				]
			});
		}
		
		return serviceValWin;
	}	
});

Ext.define('ps.admin.CouponCodeModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-admin-coupon-code-module',
	
    init : function(){
        this.launcher = {
            text: 'Add Coupon',
            iconCls:'customer-profile-shortcut'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var couponCodeWin = desktop.getWindow('ps-admin-coupon-code-module');
		
		if(!couponCodeWin) {
			couponCodeWin = desktop.createWindow({
				id: 'ps-admin-coupon-code-module',
				title: 'Add Coupon',
				/*width: 800,
				height: 500,*/
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [
				        {
				        	xtype: 'ps-coupon-code-form'
				        }
				]
			});
		}
		
		return couponCodeWin;
	}	
});

Ext.define('ps.UserListModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-user-list-module',
	
    init : function(){
        this.launcher = {
            text: 'User List',
            iconCls:'user-list-shortcut'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var userListWin = desktop.getWindow('ps-user-list-module');
		
		if(!userListWin) {
			userListWin = desktop.createWindow({
				id: 'ps-user-list-module',
				title: 'User List',
				animCollapse: false,
				x: 50,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [
				        {
				        	xtype: 'ps-user-grid'
				        }
				        
				]
			});
		}
		
		return userListWin;
	}
});

Ext.define('AdminDesktop.App', {
    extend: 'Ext.ux.desktop.App',

   

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
            //new ps.UploadPhotoModule(),
            new ps.admin.ServiceValueModule(),
            new ps.admin.CouponCodeModule(),
            new ps.UserListModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {            

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    //{ name: 'Upload Photo', iconCls: 'photo-browser-shortcut', module: 'ps-upload-photo-module' },
                    { name: 'Add Coupon', iconCls: 'photo-browser-shortcut', module: 'ps-admin-coupon-code-module' },
                    { name: 'Add Service', iconCls: 'photo-browser-shortcut', module: 'ps-admin-service-value-module' },
                    { name: 'Users', iconCls: 'user-list-shortcut', module: 'ps-user-list-module' },
                    
                ]
            }),

            wallpaper: '../images/Wallpapers/Blue-Sencha.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'BhuRakshan',            
            height: 300,
            toolConfig: {
                width: 100,
                items: [                   
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {            
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
    	//window.location = '/home/unsecured/logout';
    	Ext.Ajax.request({
    		   url: '/unsecured/logout',
    		   success: function(response, opts) {
    			   window.location = '/';
    		   },
    		   failure: function(response, opts) {
    		      console&&console.log('server-side failure with status code ' + response.status);
    		   }
    	});    	
        //Ext.Msg.confirm('Logout', 'Are you sure you want to logout?');
    },

    onSettings: function () {
        var dlg = new AdminDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});


Ext.define('ps.admin.ServiceValue', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-service-value-form',
	
	initComponent: function() {
		var me = this;
		
		var serviceTypeStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        {"name":"Property Monitoring Monthly", "value":"PROPERTY_MONITOR_MONTHLY"},
		        {"name":"Property Monitoring Quaterly", "value":"PROPERTY_MONITOR_QUATERLY"},
		        {"name":"Property Monitoring Half Yearly", "value":"PROPERTY_MONITOR_HALFYEARLY"},
		        {"name":"Property Monitoring Yearly", "value":"PROPERTY_MONITOR_YEARLY"}
		    ]
		});
		
		var serviceTypeCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'Service Type*',
		    labelWidth: 100,		    
		    labelAlign: 'right',
		    style: 'margin-top: 10px;',
		    store: serviceTypeStore,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',
		    allowBlank: false,
		    labelAlign: 'right', labelWidth: 150
		});
		
		var serviceCost = Ext.create('Ext.form.TextField', {	        
	        name: 'service-cost',
	        fieldLabel: 'Service Amount(in $)*',
	        maskRe: /[0-9]/,
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });	
		
		var serviceCostInRs = Ext.create('Ext.form.TextField', {	        
	        name: 'service-cost-rs',
	        fieldLabel: 'Service Amount(in Rs)*',
	        maskRe: /[0-9]/,
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });		
		
		Ext.apply(me, {
			style: 'padding-top: 20px;',
			width: 400,
			height: 200,
			frame: true,
			items: [
			        serviceTypeCombo,
			        serviceCost,
			        serviceCostInRs
			        ],
			buttons: [
			          {
			        	  text: 'Save',
			        	  handler: function() {
			        		  var data = {
			        				  service: serviceTypeCombo.getValue(),
			        				  amount: serviceCost.getValue(),
			        				  amountInRs: serviceCostInRs.getValue() 
			        		  };
			        		  
			        		  function fcb() {
			        			  
			        		  }
			        		  
			        		  function scb(response, opts) {
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
			        		  }
			        		  
			        		  ps.shared.Utility.AJAX_FIRE_POST(
	            					  ps.admin.serverproxy.URL.ADD_SERVICE,
    	            				  data,
    	            				  scb,
    	            				  fcb
	            			  );			        		  
			        	  }
			          }/*, 
			          {
			        	  text: 'Cancel',
			        	  handler: function() {
			        		  
			        	  }
			          }*/
			          ]
		});		
		
		me.callParent(arguments);
		
	}
});


Ext.define('ps.admin.CouponCodeGenerator', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-coupon-code-form',
	
	initComponent: function() {
		var me = this;
				
		
		var couponCode = Ext.create('Ext.form.TextField', {	        
	        name: 'coupon-code',
	        fieldLabel: 'Coupon Code*',
	        maskRe: /[a-zA-Z0-9]/,
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });	
		
		var discount = Ext.create('Ext.form.TextField', {	        
	        name: 'discountPercent',
	        fieldLabel: 'Discount (in %)*',
	        maskRe: /[0-9]/,
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });		
		
		
		var validUpto = Ext.create('Ext.form.TextField', {	        
	        name: 'valid-upto',
	        fieldLabel: 'Valid Upto (DD-MM-YY)*',
	        //maskRe: /[0-9]/,
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });			
		
		Ext.apply(me, {
			style: 'padding-top: 20px;',
			width: 400,
			height: 200,			
			frame: true,
			items: [
			        couponCode,
			        discount,			        
			        validUpto
			        ],
			buttons: [
			          {
			        	  text: 'Save',
			        	  handler: function() {
			        		  var data = {
			        				  couponCode: couponCode.getValue(),
			        				  discountPercent: discount.getValue(),
			        				  validUpto: validUpto.getValue(),
			        				  userCoupon: false
			        		  };
			        		  
			        		  function fcb() {
			        			  
			        		  }
			        		  
			        		  function scb(response, opts) {
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
			        		  }
			        		  
			        		  ps.shared.Utility.AJAX_FIRE_POST(
	            					  ps.admin.serverproxy.URL.ADD_COUPON,
    	            				  data,
    	            				  scb,
    	            				  fcb
	            			  );			        		  
			        	  			        		  
			        	  }
			          }/*, 
			          {
			        	  text: 'Cancel',
			        	  handler: function() {
			        		  
			        	  }
			          }*/
			          ]
		});		
		
		me.callParent(arguments);
		
	}
});
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
