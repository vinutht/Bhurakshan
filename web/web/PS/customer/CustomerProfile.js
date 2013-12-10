Ext.define('ps.CustomerProfile', {
	extend: 'Ext.container.Container',
	alias: 'widget.ps-customer-profile',
	
	initComponent: function() {
		var me = this;
		
        // The data store for the State comboboxes
        var statesStore = Ext.create('Ext.data.Store', {
            fields: [{name: 'name'}],
            data: [{name: 'Karnataka'}]
        });
        
		var initConfig = {
				layout: 'fit',
			items: [				
				{
					xtype : 'form',
					//columnWidth: .75,
					frame: true,
					itemId: 'ps-customer-profile-form',
					//layout: 'form',
			        bodyPadding: 5,
			        fieldDefaults: {
			            labelAlign: 'right',
			            labelWidth: 90,
			            msgTarget: 'qtip'
			        },
					items: [

				            {
				                xtype: 'fieldset',
				                title: 'Your Personal Information',
				                defaultType: 'textfield',
				                layout: 'anchor',
				                defaults: {
				                    anchor: '100%'
				                },
				                items: [{
			                        name: 'name',
			                        fieldLabel: 'Name',
			                        //readOnly: true,
			                        disabled: true
			                    }, {
				                    xtype: 'container',
				                    layout: 'hbox',
				                    defaultType: 'textfield',
				                    items: [{
				                        fieldLabel: 'Email Address',
				                        name: 'email',
				                        vtype: 'email',				                        
				                        disabled: true,
				                        flex: 0.75,
				                        allowBlank: false
				                    }, {
				                        fieldLabel: 'Phone Number',
				                        labelWidth: 100,
				                        name: 'phone',
				                        width: 190,
				                        emptyText: 'xxxxxxxxxx',
				                        maskRe: /[ \d\-\(\)]/,
				                        //regex: /^\d{10}$/,
				                        regex: /[ \d\-\(\)]/,
				                        regexText: 'Must be of the format xxxxxxxxxx'
				                    }]
				                }, {
			                        name: 'referer',
			                        fieldLabel: 'Referer Email',
			                        width: 200,
			                        style: 'margin-top: 10px;',
			                        disabled: true,
			                        regex: /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/,
			                        regexText: 'Must me a valid email address'
			                        
			                    }, {
			                        name: 'howDidYouComeToKnow',
			                        fieldLabel: 'How did you get to know about us',
			                        disabled: true,
			                        xtype: 'textarea'
			                        
			                    }, {
			                        name: 'couponCode',
			                        fieldLabel: 'My Coupon Code',
			                        disabled: true,
			                        xtype: 'textfield'
			                        
			                    }]
				            },

				            // Mailing Address
				            {
				                xtype: 'fieldset',
				                title: 'Mailing Address',
				                defaultType: 'textfield',
				                layout: 'anchor',
				                defaults: {
				                    anchor: '100%'
				                },
				                items: [{
				                    fieldLabel: 'Address',
				                    name: 'address',	
				                    xtype: 'textarea'
				                    //allowBlank: true,
				                    
				                }]
				            }/*,
					    {
						xtype: 'textfield',
						fieldLabel: 'Picture',
						name: 'myPic',
						id:'myPic',
						inputType: 'file'
					    }*/

					]/*,
					buttons: [
					          {
					        	  text: 'Save',
					        	  handler: function() {
					        		var form = me.getComponent('ps-customer-profile-form');
					        		var basicForm = form.getForm();
					        		if(basicForm) {
					        			var userInfoObj = basicForm.getValues();
					        			
					        			ps.shared.Utility.AJAX_FIRE_POST(
					        					ps.customer.serverproxy.URL.MODIFY_PROFILE,
					        					userInfoObj,
					        					function(){					        						
					        						Ext.Msg.alert('Status', 'Changes saved successfully.');
					        					},
					        					Ext.emptyFn
					        			);					        			
					        		}
					        	  }
					          }				          
					          ]*/
				}			    
			]
		};
		
		Ext.apply(me, initConfig);
		me.callParent(arguments);
		
		me.loadData();
	},
	
	save: function() {
		var me = this;
		var form = me.getComponent('ps-customer-profile-form');
		var basicForm = form.getForm();
		if(basicForm) {
			var userInfoObj = basicForm.getValues();
			
			ps.shared.Utility.AJAX_FIRE_POST(
					ps.customer.serverproxy.URL.MODIFY_PROFILE,
					userInfoObj,
					function(){					        						
						Ext.Msg.alert('Status', 'Changes saved successfully.');
					},
					Ext.emptyFn
			);					        			
		}		
	},
	
	loadData: function() {
		
		var me = this;
		
		var successCallBack = function(response, opts) {
			var form = me.getComponent('ps-customer-profile-form');
			if(form) {
				var basicForm = form.getForm();
				var userObj = Ext.JSON.decode(response.responseText);
				if(basicForm && userObj) {
					basicForm.setValues(userObj);
				}
			}
		};
		
		var failureCallBack = function(response, opts) {
			alert('server-side failure with status code ' + response.status);
		};		
		
		ps.shared.Utility.AJAX_FIRE_GET(
				ps.customer.serverproxy.URL.CURRENT_USER,
				successCallBack,
				failureCallBack
		);
				
	}
});
