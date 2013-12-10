
Ext.define('ps.CustomerSubscriptionModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-customer-subscription-module',
	
    init : function(){
        this.launcher = {
            text: 'My Subscriptions',
            iconCls:'subscription-info-cls'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var custSubscriptionWin = desktop.getWindow('ps-customer-subscription-module');
		
		if(!custSubscriptionWin) {
			custSubscriptionWin = desktop.createWindow({
				id: 'ps-customer-subscription-module',
				title: 'My Subscriptions',
				width: 800,
				height: 500,
				x: 50,
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [
				        {
				        	xtype: 'ps-customer-subscription-grid'
				        }
				]
			});
		}
		
		return custSubscriptionWin;
	}
});



Ext.define('ps.CustomerProfileModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-customer-profile-module',
	
    init : function(){
        this.launcher = {
            text: 'My Profile',
            iconCls:'profile-cls'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var custProfileWin = desktop.getWindow('ps-customer-profile-module');
		
		var customerProfilePanel = Ext.widget('ps-customer-profile');
		
		if(!custProfileWin) {
			custProfileWin = desktop.createWindow({
				id: 'ps-customer-profile-module',
				title: 'My Profile',
				width: 800,
				height: 500,
				x: 40,				
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [customerProfilePanel]
				        /*{
				        	xtype: 'ps-customer-profile'
				        }
				]*/,
				buttons: [
				          {
				        	  text: 'Save',
				        	  handler: function() {
				        		  customerProfilePanel.save();
				        		  custProfileWin.close();
				        	  }
				          },
				          {
				        	  text: 'Cancel',
				        	  handler: function() {
				        		  custProfileWin.close();
				        	  }
				          }
				]
			});
		}
		
		return custProfileWin;
	}
});

Ext.define('ps.CustomerCreditsModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-customer-credits-module',
	
    init : function(){
        this.launcher = {
            text: 'My Credits',
            iconCls:'credits-cls'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var custCreditsWin = desktop.getWindow('ps-customer-credits-module');
		
		if(!custCreditsWin) {
			custCreditsWin = desktop.createWindow({
				id: 'ps-customer-credits-module',
				title: 'My Credits',
				width: 400,
				height: 400,
				x: 40,				
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [
				        {
				        	xtype: 'ps-customer-credits'
				        }
				],
				buttons: [
				          
				          {
				        	  text: 'Ok',
				        	  handler: function() {
				        		  custCreditsWin.close();
				        	  }
				          }
				]
			});
		}
		
		return custCreditsWin;
	}
});

Ext.define('ps.UserPreferenceModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-user-preference-module',
	
    init : function(){
        this.launcher = {
            text: 'My Preference',
            iconCls:'preference-cls'
        };
    },
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var userPrefWin = desktop.getWindow('ps-user-preference-module');
		
		var userPref = Ext.widget('ps-user-preference');
		
		if(!userPrefWin) {
			userPrefWin = desktop.createWindow({
				id: 'ps-user-preference-module',
				title: 'My Preference',
				width: 400,
				height: 200,
				x: 140,				
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				items: [userPref],				
				buttons: [
				          {
				        	  text: 'Change',
				        	  handler: function() {
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
				        		  userPref.submit(successHandler);
				        		  userPrefWin.close();
				        	  }
				          }, 
				          {
				        	  text: 'Cancel',
				        	  handler: function() {
				        		  userPrefWin.close();
				        	  }
				          }]
			});
		}
		
		return userPrefWin;
	}
});

Ext.define('ps.customer.LogoutPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-customer-logout',
	
	initComponent: function() {
		var me = this;
		me.templ = new Ext.XTemplate(
				'<b>{msg}</b></br>'					,
				'<p>We are making each and every effort to thank you for the support.',
				'<BR> <BR>',
				'Have a great day! <br/>Take care. <br/><br/>The Bhurakshan Team.</p>'
		);
		
		Ext.apply(me, {
			tpl: me.templ,			
			width: 400			
		});
		
		me.callParent(arguments);
		
		me.on('render', function() {
			me.templ.overwrite(me.body, {msg: 'Thank you'});
		});		
	}
});

Ext.define('ps.LogoutModule', {
	extend: 'Ext.ux.desktop.Module',
	id: 'ps-logout-module',
	   
	
	createWindow: function() {
		var me = this;
		var desktop = me.app.getDesktop();
		var logoutWin = desktop.getWindow('ps-logout-module');
		
		if(!logoutWin) {
			logoutWin = desktop.createWindow({
				id: 'ps-logout-module',
				title: 'Do you really want to logout?',
				width: 400,
				height: 200,
				//x: 40,				
				animCollapse: false,
				border: false,
				constrainHeader: true,				
				layout: 'fit',
				
				items: [
				        {
				        	xtype: 'ps-customer-logout'
				        }
				],
				buttons: [{
					text: 'Logout',
					handler: function() {
				    	var successCallBack = function(response, opts) {
							   window.location = '/';
						};
								
						var failureCallBack = function(response, opts) {
						      console&&console.log('server-side failure with status code ' + response.status);
						};    	    	
				    	
						ps.shared.Utility.AJAX_FIRE_GET(
				    			ps.customer.serverproxy.URL.LOGOUT,
				    			successCallBack,
				    			failureCallBack
				    	); 						
					}
				
				}]
			});
		}
		
		return logoutWin;
	}
});



Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',


    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [
           // new ps.PhotoBrowserModule(),
            new ps.CustomerProfileModule(),
            new ps.CustomerSubscriptionModule(),
            new ps.CustomerCreditsModule(),
            new ps.UserPreferenceModule(),
            new ps.LogoutModule()
        ];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {            

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: [
                    //{ name: 'Photo Browser', iconCls: 'photo-browser-shortcut', module: 'ps-photo-browser-module' },
                    { name: 'My Profile', iconCls: 'profile-cls', module: 'ps-customer-profile-module' },
                    { name: 'My Subscriptions', iconCls: 'subscription-info-cls', module: 'ps-customer-subscription-module' },
                    { name: 'My Credits', iconCls: 'credits-cls', module: 'ps-customer-credits-module' },
                    { name: 'My Preference', iconCls: 'preference-cls', module: 'ps-user-preference-module' },
                    { name: 'Logout', iconCls: 'logout-cls', module: 'ps-logout-module' }
                ]
            }),

            //wallpaper: '../images/Wallpapers/Blue-Sencha.jpg',
            wallpaper: '../images/Wallpapers/CustomerDesktop.jpg',
            wallpaperStretch: true
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
		   
    	var successCallBack = function(response, opts) {
			   window.location = '/';
		};
				
		var failureCallBack = function(response, opts) {
		      console&&console.log('server-side failure with status code ' + response.status);
		};    	    	
    	
		ps.shared.Utility.AJAX_FIRE_GET(
    			ps.customer.serverproxy.URL.LOGOUT,
    			successCallBack,
    			failureCallBack
    	);    		
        
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
