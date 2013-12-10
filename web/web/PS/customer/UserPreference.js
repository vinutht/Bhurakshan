Ext.define('ps.UserPreference', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-user-preference',
	
	initComponent: function() {
		var me = this;
		
		var oldPassword = Ext.create('Ext.form.TextField', {        					       
        	name: 'oldPassword',
        	fieldLabel: 'Old Password*',
        	inputType: 'password',
        	style: 'margin-top: 10px;',
        	allowBlank: false,        	
        	labelAlign: 'right', labelWidth: 150
        });	
		
		var newPassword = Ext.create('Ext.form.TextField', {        					       
        	name: 'newPassword',
        	fieldLabel: 'New Password*',
        	inputType: 'password',
        	style: 'margin-top: 10px;',
        	allowBlank: false,        	
        	labelAlign: 'right', labelWidth: 150
        });		
		
		var reNewPassword = Ext.create('Ext.form.TextField', {        					       
        	name: 'reNewPassword',
        	fieldLabel: 'Reenter New Password*',
        	inputType: 'password',
        	style: 'margin-top: 10px;',
        	allowBlank: false,        	
        	labelAlign: 'right', labelWidth: 150
        });		
		
		Ext.apply(me, {
			style: 'padding-top: 20px; padding-left: 20px;',
			frame: true,
			defaults: {labelAlign: 'right', labelWidth: 150},	
			
			items: [oldPassword, newPassword, reNewPassword]
		});
		me.callParent(arguments);
		
		this.validate = function() {
			var pwd = newPassword.getValue();
			var reenterPwd = reNewPassword.getValue();
			
			if(!Ext.isEmpty(pwd) && pwd === reenterPwd) {
				return true;
			}
			else {							
		        Ext.Msg.show({
		            title: 'Error',
		            msg: 'New Password and Reentered New Password doesnt match.',
		            width:300,
		            buttons: Ext.MessageBox.OK		            
		        });				
		        return false;
			}
		};	
		
		this.getData = function() {
			return {				
				oldPassword: oldPassword.getValue(),
				newPassword: newPassword.getValue()
			};
		};		
	},
	
	submit: function(successHandler) {
		var me = this;
		if(me.validate()) {
			var data = me.getData();

			var failurecallBack = function(response, opts) {
				alert('server-side failure with status code ' + response.status);
			};			
			
			ps.shared.Utility.AJAX_FIRE_POST(
					ps.customer.serverproxy.URL.CHANGE_PASSWORD,
					data,
					successHandler,
					failurecallBack
			);			
			
		}
		
	}
});