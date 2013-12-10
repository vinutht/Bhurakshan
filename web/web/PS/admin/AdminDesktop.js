
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