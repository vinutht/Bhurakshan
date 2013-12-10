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

Ext.define('ps.LocationMap', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-location-map',
	
	initComponent: function() {
		var me = this;
		var initConfig = {				
				items: me.getGoogleMap()
		};
		
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},

	getGoogleMap: function() {
		return {
            xtype: 'gmappanel',
            center: {                
            	//geoCodeAddr: 'Basaveswaranagar, Bangalore, Karnataka, 560079, India',                
            	marker: {
            		title: 'Basaveshwaranagar',
                    lat: 12.99756,              
                    lng: 77.54054            			
            	}
            }/*,
            markers: [{	                
            	lat: 12.99756,              
            	lng: 77.54054,                
            	title: 'Tango Center, Basaveshwaranagar',
                listeners: {
                    click: function(e){
                        Ext.Msg.alert('It\'s tango time.');
                    }
                }
            }]*/
        };
	}
});
Ext.define('ps.RegistrationDetails', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-registration-details',
	
	initComponent: function() {
		var me = this;
		
		var countryStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        {"name":"Afghanistan", "value":"Afghanistan"},
		        {"name":"Albania", "value":"Albania"},
		        {"name":"Algeria", "value":"Algeria"},
		        {"name":"American Samoa", "value":"American Samoa"},
		        {"name":"Andorra", "value":"Andorra"},
		        {"name":"Angola", "value":"Angola"},
		        {"name":"Anguilla", "value":"Anguilla"},
		        {"name":"Antartica", "value":"Antartica"},
		        {"name":"Antigua Barbuda", "value":"Antigua Barbuda"},
		        {"name":"Argentina", "value":"Argentina"},
		        {"name":"Armenia", "value":"Armenia"},
		        {"name":"Aruba", "value":"Aruba"},
		        {"name":"Australia", "value":"Australia"},
		        {"name":"Austria", "value":"Austria"},
		        {"name":"Azerbaijan", "value":"Azerbaijan"},
		        {"name":"Bahamas", "value":"Bahamas"},
		        {"name":"Bahrain", "value":"Bahrain"},
		        {"name":"Bangladesh", "value":"Bangladesh"},
		        {"name":"Barbados", "value":"Barbados"},
		        {"name":"Belarus", "value":"Belarus"},
		        {"name":"Belgium", "value":"Belgium"},
		        {"name":"Belize", "value":"Belize"},
		        {"name":"Benin", "value":"Benin"},
		        {"name":"Bermuda", "value":"Bermuda"},
		        {"name":"Bhutan", "value":"Bhutan"},
		        {"name":"Bolivia", "value":"Bolivia"},
		        {"name":"Bosnia And Herzegowina", "value":"Bosnia And Herzegowina"},
		        {"name":"Botswana", "value":"Botswana"},
		        {"name":"Bouvet Island", "value":"Bouvet Island"},
		        {"name":"Brazil", "value":"Brazil"},
		        {"name":"British Indian Ocean Territory", "value":"British Indian Ocean Territory"},
		        {"name":"Brunei Darussalam", "value":"Brunei darussalam"},
		        {"name":"Bulgaria", "value":"Bulgaria"},
		        {"name":"Burkina Faso", "value":"Burkina Faso"},
		        {"name":"Burundi", "value":"Burundi"},
		        {"name":"Cambodia", "value":"Cambodia"},
		        {"name":"Cameroon", "value":"Cameroon"},
		        {"name":"Canada", "value":"Canada"},
		        {"name":"Cape Verde", "value":"Cape Verde"},
		        {"name":"Cayman Islands", "value":"Cayman Islands"},
		        {"name":"Central African Republic", "value":"Central African Republic"},
		        {"name":"Chad", "value":"Chad"},
		        {"name":"Chile", "value":"Chile"},
		        {"name":"China", "value":"China"},
		        {"name":"Christmas Island", "value":"Christmas Island"},
		        {"name":"Cocos (Keeling) Islands", "value":"Cocos (Keeling) Islands"},
		        {"name":"Colombia", "value":"Colombia"},
		        {"name":"Comoros", "value":"Comoros"},
		        {"name":"Congo", "value":"Congo"},
		        {"name":"Cook Islands", "value":"Cook Islands"},
		        {"name":"Costa Rica", "value":"Costa Rica"},
		        {"name":"Cote D Ivoire", "value":"Cote D Ivoire"},
		        {"name":"Croatia", "value":"Croatia"},
		        {"name":"Cuba", "value":"Cuba"},
		        {"name":"Cyprus", "value":"Cyprus"},
		        {"name":"Czech Republic", "value":"Czech Republic"},
		        {"name":"Denmark", "value":"Denmark"},
		        {"name":"Djibouti", "value":"Djibouti"},
		        {"name":"Dominica", "value":"Dominica"},
		        {"name":"Dominican Republic", "value":"Dominican Republic"},
		        {"name":"East Timor", "value":"East Timor"},
		        {"name":"Ecuador", "value":"Ecuador"},
		        {"name":"Egypt", "value":"Egypt"},
		        {"name":"EI Salvador", "value":"EI Salvador"},
		        {"name":"Equatorial Guinea", "value":"Equatorial Guinea"},
		        {"name":"Eritrea", "value":"Eritrea"},
		        {"name":"Estonia", "value":"Estonia"},
		        {"name":"Ethiopia", "value":"Ethiopia"},
		        {"name":"Falkland Islands", "value":"Falkland Islands"},
		        {"name":"Faroe Islands", "value":"Faroe Islands"},
		        {"name":"Fiji", "value":"Fiji"},
		        {"name":"Finland", "value":"Finland"},
		        {"name":"France", "value":"France"},
		        {"name":"Gabon", "value":"Gabon"},
		        {"name":"Gambia", "value":"Gambia"},
		        {"name":"Georgia", "value":"Georgia"},
		        {"name":"Germany", "value":"Germany"},
		        {"name":"Ghana", "value":"Ghana"},
		        {"name":"Gibraltar", "value":"Gibraltar"},
		        {"name":"Greece", "value":"Greece"},
		        {"name":"Greenland", "value":"Greenland"},
		        {"name":"Grenada", "value":"Grenada"},
		        {"name":"Guadeloupe", "value":"Guadeloupe"},
		        {"name":"Guam", "value":"Guam"},
		        {"name":"Guatemala", "value":"Guatemala"},
		        {"name":"Guinea", "value":"Guinea"},
		        {"name":"Guyana", "value":"Guyana"},
		        {"name":"Haiti", "value":"Haiti"},
		        {"name":"Heard And Mc Donald Islands", "value":"Heard And Mc Donald Islands"},
		        {"name":"Honduras", "value":"Honduras"},
		        {"name":"Hong Kong", "value":"Hong Kong"},
		        {"name":"Hungary", "value":"Hungary"},
		        {"name":"Iceland", "value":"Iceland"},
		        {"name":"India", "value":"INDIA"},
		        {"name":"Indonesia", "value":"Indonesia"},
		        {"name":"Iran", "value":"Iran"},
		        {"name":"Iraq", "value":"Iraq"},
		        {"name":"Ireland", "value":"Ireland"},
		        {"name":"Israel", "value":"Israel"},
		        {"name":"Italy", "value":"Italy"},
		        {"name":"Jamaica", "value":"Jamaica"},
		        {"name":"Japan", "value":"Japan"},
		        {"name":"Jordan", "value":"Jordan"},
		        {"name":"Kazakhstan", "value":"Kazakhstan"},
		        {"name":"Kenya", "value":"Kenya"},
		        {"name":"Kiribati", "value":"Kiribati"},
		        {"name":"Kuwait", "value":"Kuwait"},
		        {"name":"Kyrgyzstan", "value":"Kyrgyzstan"},
		        {"name":"Lao People s Republic", "value":"Lao People s Republic"},
		        {"name":"Latvia", "value":"Latvia"},
		        {"name":"Lebanon", "value":"Lebanon"},
		        {"name":"Lesotho", "value":"Lesotho"},
		        {"name":"Liberia", "value":"Liberia"},
		        {"name":"Libyan Arab Jamahiriya", "value":"Libyan Arab Jamahiriya"},
		        {"name":"Liechtenstein", "value":"Liechtenstein"},
		        {"name":"Lithuania", "value":"Lithuania"},
		        {"name":"Luxembourg", "value":"Luxembourg"},
		        {"name":"Macau", "value":"Macau"},
		        {"name":"Macedonia", "value":"Macedonia"},
		        {"name":"Madagascar", "value":"Madagascar"},
		        {"name":"Malawi", "value":"Malawi"},
		        {"name":"Malaysia", "value":"Malaysia"},
		        {"name":"Maldives", "value":"Maldives"},
		        {"name":"Mali", "value":"Mali"},
		        {"name":"Malto", "value":"Malto"},
		        {"name":"Marshall Islands", "value":"Marshall Islands"},
		        {"name":"Martinique", "value":"Martinique"},
		        {"name":"Mauritania", "value":"Mauritania"},
		        {"name":"Mauritius", "value":"Mauritius"},
		        {"name":"Mayotte", "value":"Mayotte"},
		        {"name":"Mexico", "value":"Mexico"},
		        {"name":"Micronesia", "value":"Micronesia"},
		        {"name":"Moldova", "value":"Moldova"},
		        {"name":"Monaco", "value":"Monaco"},
		        {"name":"Mongolia", "value":"Mongolia"},
		        {"name":"Montserrat", "value":"Montserrat"},
		        {"name":"Morrocco", "value":"Morrocco"},
		        {"name":"Mozambique", "value":"Mozambique"},
		        {"name":"Myanmar", "value":"Myanmar"},
		        {"name":"Namibia", "value":"Namibia"},
		        {"name":"Nauru", "value":"Nauru"},
		        {"name":"Nepal", "value":"Nepal"},
		        {"name":"Netherlands", "value":"Netherlands"},
		        {"name":"New Caledonia", "value":"New Caledonia"},
		        {"name":"New zealand", "value":"New zealand"},
		        {"name":"Nicaragua", "value":"Nicaragua"},
		        {"name":"Niger", "value":"Niger"},
		        {"name":"Nigeria", "value":"Nigeria"},
		        {"name":"Niue", "value":"Niue"},
		        {"name":"Norfolk Island", "value":"Norfolk Island"},
		        {"name":"North Korea", "value":"North Korea"},
		        {"name":"Northern Mariana Islands", "value":"Northern Mariana Islands"},
		        {"name":"Norway", "value":"Norway"},
		        {"name":"Oman", "value":"Oman"},
		        {"name":"Pakistan", "value":"Pakistan"},
		        {"name":"Palau", "value":"Palau"},
		        {"name":"Panama", "value":"Panama"},
		        {"name":"Papua New Guinea", "value":"Papua New Guinea"},
		        {"name":"Paraguay", "value":"Paraguay"},
		        {"name":"Peru", "value":"Peru"},
		        {"name":"Philippines", "value":"Philippines"},
		        {"name":"Pitcairn", "value":"Pitcairn"},
		        {"name":"Poland", "value":"Poland"},
		        {"name":"Portugal", "value":"Portugal"},
		        {"name":"Puerto Rico", "value":"Puerto Rico"},
		        {"name":"Qatar", "value":"Qatar"},
		        {"name":"Reunion", "value":"Reunion"},
		        {"name":"Romania", "value":"Romania"},
		        {"name":"Russian Federation", "value":"Russian Federation"},
		        {"name":"Rwanda", "value":"Rwanda"},
		        {"name":"Saint Kitts And Nevis", "value":"Saint Kitts And Nevis"},
		        {"name":"Saint Lucia", "value":"Saint Lucia"},
		        {"name":"Saint Vincent And The Grenadines", "value":"Saint Vincent And The Grenadines"},
		        {"name":"Samoa", "value":"Samoa"},
		        {"name":"San Marino", "value":"San Marino"},
		        {"name":"Sao Tome And Principe", "value":"Sao Tome And Principe"},
		        {"name":"Senegal", "value":"Senegal"},
		        {"name":"Seychelles", "value":"Seychelles"},
		        {"name":"Sierra Leone", "value":"Sierra Leone"},
		        {"name":"Singapore", "value":"Singapore"},
		        {"name":"Slovakia", "value":"Slovakia"},
		        {"name":"Slovenia", "value":"Slovenia"},
		        {"name":"Solomon Islands", "value":"Solomon Islands"},
		        {"name":"Somalia", "value":"Somalia"},
		        {"name":"Saudi Arabia", "value":"Saudi Arabia"},
		        {"name":"South Africa", "value":"South Africa"},
		        {"name":"South korea", "value":"South korea"},
		        {"name":"Spain", "value":"Spain"},
		        {"name":"Sri Lanka", "value":"Sri Lanka"},
		        {"name":"St Helena", "value":"St Helena"},
		        {"name":"St Pierre and Miquelon", "value":"St Pierre and Miquelon"},
		        {"name":"Sudan", "value":"Sudan"},
		        {"name":"Suriname", "value":"Suriname"},
		        {"name":"Svalbard And Jan Mayen Islands", "value":"Svalbard And Jan Mayen Islands"},
		        {"name":"Swaziland", "value":"Swaziland"},
		        {"name":"Sweden", "value":"Sweden"},
		        {"name":"Switzerland", "value":"Switzerland"},
		        {"name":"Syrian Arab Republic", "value":"Syrian Arab Republic"},
		        {"name":"Taiwan", "value":"Taiwan"},
		        {"name":"Tajikistan", "value":"Tajikistan"},
		        {"name":"Tanzania", "value":"Tanzania"},
		        {"name":"Thailand", "value":"Thailand"},
		        {"name":"Togo", "value":"Togo"},
		        {"name":"Tokelau", "value":"Tokelau"},
		        {"name":"Tonga", "value":"Tonga"},
		        {"name":"Trinidad And Tobago", "value":"Trinidad And Tobago"},
		        {"name":"Tunisia", "value":"Tunisia"},
		        {"name":"Turkey", "value":"Turkey"},
		        {"name":"Turkmenistan", "value":"Turkmenistan"},
		        {"name":"Tuvalu", "value":"Tuvalu"},
		        {"name":"Uganda", "value":"Uganda"},
		        {"name":"Ukraine", "value":"Ukraine"},
		        {"name":"United Arab Emirates", "value":"United Arab Emirates"},
		        {"name":"United Kingdom", "value":"United Kingdom"},
		        {"name":"Uruguay", "value":"Uruguay"},
		        {"name":"USA", "value":"USA"},
		        {"name":"Uzbekistan", "value":"Uzbekistan"},
		        {"name":"Vanuatu", "value":"Vanuatu"},
		        {"name":"Vatican City", "value":"Vatican City"},
		        {"name":"Venezuela", "value":"Venezuela"},
		        {"name":"Vietnam", "value":"Vietnam"},
		        {"name":"Virgin Islands (British)", "value":"Virgin Islands (British)"},
		        {"name":"Virgin Islands (U.S)", "value":"Virgin Islands (U.S)"},
		        {"name":"Wallis And Futuna Islands", "value":"Wallis And Futuna Islands"},
		        {"name":"Western Sahara", "value":"Western Sahara"},
		        {"name":"Yemen", "value":"Yemen"},
		        {"name":"Zaire", "value":"Zaire"},
		        {"name":"Zambia", "value":"Zambia"},
		        {"name":"Zimbabwe", "value":"Zimbabwe"},
		        {"name":"Other", "value":"OTHER"}
		    ]
		});
		
		var countryCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'Country*',
		    labelWidth: 150,
		    labelAlign: 'right',
		    style: 'margin-top: 10px;',
		    store: countryStore,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',
		    allowBlank: false
		});	
		
		var pwdField = Ext.create('Ext.form.TextField', {	        
	        name: 'newpassword',
	        fieldLabel: 'New Password*',
	        allowBlank: false,
	        inputType: 'password',
	        labelAlign: 'right', labelWidth: 150
        });
		
		var reenterPwdField = Ext.create('Ext.form.TextField', {        					       
	        fieldLabel: 'Reenter New Password*',
	        style: 'margin-top: 10px;',
	        inputType: 'password',
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });
		
		/*var nameField = Ext.create('Ext.form.TextField', {        					       
        	name: 'name',
        	fieldLabel: 'Name*',
        	style: 'margin-top: 10px;',
        	allowBlank: false
        });*/		
		
		var addressField = Ext.create('Ext.form.TextArea', {        					       
        	name: 'address',
        	fieldLabel: 'Residential Address',
        	style: 'margin-top: 10px;',
        	allowBlank: true,
        	labelAlign: 'right', labelWidth: 150
        });	
		
		var phoneField = Ext.create('Ext.form.TextField', {        					       
        	name: 'phone',
        	fieldLabel: 'Phone',
        	style: 'margin-top: 10px;',
        	allowBlank: true,
        	vtype: 'phone',
        	labelAlign: 'right', labelWidth: 150
        });		
		
		var refererField = Ext.create('Ext.form.TextField', {	        
	        name: 'referer',
	        fieldLabel: 'Referer Email',
	        allowBlank: true,
	        regex: /^([\w]+)(.[\w]+)*@([\w-]+\.){1,5}([A-Za-z]){2,4}$/,
	        regexText: 'Must me a valid email address',
	        labelAlign: 'right', labelWidth: 150
        });	
		
		var howField = Ext.create('Ext.form.TextArea', {        					       
        	name: 'howDidYouComeToKnow',
        	fieldLabel: 'How did you come to know about us',
        	style: 'margin-top: 10px;',
        	allowBlank: true,
        	labelAlign: 'right', labelWidth: 150
        });		
		
		Ext.apply(me, {
			style: 'padding-top: 20px; padding-left: 20px;',
			frame: true,
			defaults: {labelAlign: 'right', labelWidth: 150},
			items: [
			        pwdField,
			        reenterPwdField,			        
			        addressField,
			        countryCombo,
			        phoneField,
			        refererField,
			        howField
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
		
		this.validate = function() {
			var pwd = pwdField.getValue();
			var reenterPwd = reenterPwdField.getValue();
			
			if(!Ext.isEmpty(pwd) && pwd === reenterPwd) {
				return true;
			}
			else {
		        Ext.MessageBox.show({
		            title: 'Error',
		            msg: 'Password and Reentered Password doesnt match.',
		            width:300,
		            buttons: Ext.MessageBox.OK,
		            multiline: true
		        });				
		        return false;
			}
		};
		
		this.getData = function() {
			return {
				//name: nameField.getValue(),
				password: pwdField.getValue(),
				address: addressField.getValue(),
				phone: phoneField.getValue(),
				country: countryCombo.getValue(),
				registrationComplete: true,
				referer: refererField.getValue(),
				howDidYouComeToKnow: howField.getValue()
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
			
			ps.shared.Utility.AJAX_FIRE_PUT(
					ps.customer.serverproxy.URL.USERS,
					data,
					successHandler,
					failurecallBack
			);			
			
		}
		
	}
	
});

Ext.define('ps.customer.CustomerCredits', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-customer-credits',
	
	initComponent: function() {
		var me = this;
		me.templ = new Ext.XTemplate(
				/*'<p>',
				'<span style="font-size:28px;"><span style="font-family: times new roman,times,serif;"><span style="color: rgb(0, 102, 255);">Pay with Paypal</span></span></span></p><BR><BR>',*/
			'<p>',
				'<H1>Referal Bonus</H1>',
				'</p><BR>Here is a great news. If you refer some one, you will get referral bonus. The more the referrals, the more the benefits.',
				'<BR>',
			'<p> <BR> <BR>',
				'<u>Here are the details </u>- </p>',
			'<p>',
				'<B>Number of referrals</B> - {referralCount}</p>',
			'<p>',
				'<B>Coupon Code</B> - {displayString}</p>',
			'<p>',
				'<B>Discount</B> - {discount}</p>',
				'<p> <BR> <BR>',
				'<u>Use the above coupon code in the next subscription to avail the discount mentioned. </u> </p>',
			'<p>',				
				'<BR><BR>Please keep referring. Thank you so much for your support.'
		);
		
		Ext.apply(me, {
			tpl: me.templ,			
			width: 300			
		});
		
		me.callParent(arguments);
		
		me.loadData();
		
		/*me.on('render', function() {
			templ.overwrite(me.body, me.tmplValues);
		});*/		

	},

	loadData: function() {
		
		var me = this;
		
		var successCallBack = function(response, opts) {
			var coupon = Ext.JSON.decode(response.responseText);
			if(coupon) {
				if(coupon.discount == 0) {
					coupon.discount = coupon.discountInRs + "Rs";
				}
				else {
					coupon.discount = coupon.discount + "$";
				}
				me.templ.overwrite(me.body, coupon);
			}
			else {
				me.templ.overwrite(me.body, {
					displayString: 'Not Available',
					discount: '0',					
					referralCount: '0'
				});
			}
		};
		
		var failureCallBack = function(response, opts) {
			alert('server-side failure with status code ' + response.status);
		};		
		
		ps.shared.Utility.AJAX_FIRE_GET(
				ps.customer.serverproxy.URL.MY_CREDITS,
				successCallBack,
				failureCallBack
		);
				
	}

});
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