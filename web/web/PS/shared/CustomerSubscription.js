
Ext.define('ps.CustomerSubscriptionGridModel', {
	extend: 'Ext.data.Model',
	fields: [{name: 'propertyName'}, {name: 'frequency'}, {name: 'couponCode'}, {name: 'couponCode'}, 
	         {name: 'serviceType'}, {name: 'subscriptionType'}, {name: 'propertyAddress'}, {name: 'otherServiceDescription'}, {name: 'id'}]
});




Ext.define('ps.TermsOfServiceForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-terms-of-service-form',
	
	initComponent: function() {
		var me = this;
		
		var termsOfServiceField = Ext.create('Ext.form.TextArea', {        					       
        	name: 'termsofservice',
        	fieldLabel: '',
        	style: 'margin-top: 10px;',
        	readOnly: true,
        	value: 'Description - \n\nServices of BhuRakshan can be availed by individuals across the globe who have immovable properties in and around Bangalore and Mysore. \nCharges of the services are customized to the services taken. Our services are not limited to Property Monitoring, we also undertake Property Fencing and Cleaning responsibilities based on particular requests. Our services come to with proper e reporting system through which you can track the genuinity of our service.'+
        		'\n\n1. User Relationship with BhuRakshan:'+
        			'"BhuRakshan" a principle brand wholly owned by Bhumi.Inc'+
        			'Unless otherwise agreed in writing with BhuRakshan, your agreement will always be for minimum terms and conditions set out in this document. These are refereed to below as the "Universal terms"'+
        			'Your agreement with BhuRakshan will include the terms of any legal notices applicable to the services, in addition to the universal terms. All of these are referred to below as the “Additional Terms” where additional terms will apply to a service, these terms are accessible for you to read either within, or through you use of service.'+
        			'The universal terms and conditions together with the additional terms form a legally binding agreement between user and BhuRakshan in relation to your use of the services. It’s important that you take time and read them carefully. Collectively this legal agreement is refereed to below as "Terms".'+
        			'We will not share your personal/non-personal information to our marketing partners, advertisers or other third-parties'+
        			'\n\n2. Accepting the terms:\n'+
        			'BhuRakshan will accept your property for monitoring purpose under the terms and conditions related to our operating rules and policies. By accepting this you as a client indicate that our agreement is bound and you are bound to all of the terms and conditions of our agreement.'+
        			'In order to use our services you must first agree to the terms and conditions. You may not use our services without accepting the terms.'+
        			'By accepting the terms of our services. In this case, you understand and agree that BhuRakshan will treat your use of the services as acceptance of the terms from that point onwards.'+
        			'You may not use the services or may not accept the terms if you are not of legal age to form a binding contract with BhuRakshan or you are a person barred from receiving the services under the laws of India/other countries. (Including the country in which you are residing or from which you use this services). Before continuing you should print off or save a local copy of the universal terms for your records.'+
        			'\n\n3. Provision of the services by BhuRakshan:\n'+
        			'BhuRakshan will accept your property for monitoring purpose under the terms and conditions related to our operating rules and policies. By accepting this you as a client indicate that our agreement is bound and you are bound to all of the terms and conditions of our agreement.'+
        			'You acknowledge and agree that if BhuRakshan disables access to your account, you may be prevented from accessing the services, your account details / any files / contents which is contained in your account on our portal. In some cases BhuRakshan may disable your service once you opt for the refund. (Read more in the refund policy)'+
        			'You acknowledge and agree that while BhuRakshan may not have set currently any upper limit for storage capacity for your documents or contents. Such fixed limits may be set by BhuRakshan at any time, at BhuRakshan’s discretions.'+
        			'\n\n4. Use of the services by you:\n'+
        			'To access and avail certain services from BhuRakshan, you may be required to provide information, for necessary details in respective areas as sought by BhuRakshan and as a part of the registration process for the service. You agree that any registration information you give to BhuRakshan will always be correct, accurate and up to date. Information that you provide during the registration process to BhuRakshan will be used as basic source for service delivery and technology synchronization.'+
        			'\n\n5. Password and account security:\n'+
        			'You agree and understand that you are responsible for maintaining the confidentiality of your secret code and password associated with any of your account, use to access the services. Accordingly you agree that you’ll be solely responsible to BhuRakshan for all activities that occur under your account.'+
        			'If you become aware of any unauthorized use of your password or code you agree to notify BhuRakshan immediately at support@bhurakshan.com'+
        			'You can share your certain information to your friends or who are known to you in BhuRakshan account and access provision permitting to BhuRakshan server only by using value added services, provided you have to follow and agree the terms.'+
        			'\n\n6. Content Services:\n'+
        			'You should be aware that content presented to you as part of the services, including but not limited to photographs and other details in the services and sponsored content within the services may be protected by intellectual property rights which are owned by sponsors and advertisers who provide that content to BhuRakshan or by other persons or companies on their behalf. You may not modify, sell, lease, loan, rent, distribute or create derivative works based on this contents either in whole or in part unless you have been specifically told you may do so by BhuRakshan or by the owner of the content in a separate agreement.'+
        			'BhuRakshan reserves the right but shall have no obligation to review, pre-screen, filter, flag, modify, remove or refuse any or all contents from the services. From some of the services, BhuRakshan may provide tools to filter out explicit contents. These tools include the safe search preference settings'+
        			'You are solely responsible for any content, document and photograph that you transmit or display while using the services and for the consequences of your actions including any damage or loss which BhuRakshan may suffer you will be liable for legal or any action as per the law of land.'+
        			'\n\n7. Proprietary Rights:\n'+
        			'You acknowledge and agree that BhuRakshan owns no legal rights, no titles of your property during the course of service. Whether those rights happen to be registered or not, and wherever in the world those rights may exists. You further acknowledge that the services may contain information which is designated confidential by BhuRakshan and that you shall not disclose any such information without BhuRakshan’s prior written consent.'+
        			'Unless you have agreed otherwise in writing with BhuRakshan, nothing in the terms gives you a right to use any Trade Mark, Service Marks, Trade Names, Logo’s, Domain Names and other distinctive brand features.'+
        			'Other than the limited license set forth in Section 11, BhuRakshan acknowledges and agrees that it obtains no rights, title or interest from you or your licenses under these terms in or two any content that you submit, transmit, post, or display on, or through, the services, including any intellectual property rights which subsists in that content whether those rights happen to be registered or not, and wherever in the world those rights may exists.'+
        			'You agree that you shall not remove, obscure, or alter any proprietary rights notices including, Copy Right and Trade Mark notices which may be affixed to or contained within the services. Unless you have been expressly authorized to do so in writing by BhuRakshan, you agree that in using the services, you’ll not use any Trade Mark, Service Mark, Logo, Trade Name of any company or organisation in a way that is likely or intended to cause confusion about the owner or authorized user of such names, Marks, Logos.'+
        			'\n\n8. License from BhuRakshan:\n'+
        			'BhuRaskhan gives you a worldwide, personal, royalty free, non-assignable and exclusive license to use the portal provided by BhuRakshan. This license is for the sole purpose of enabling you to use and enjoy the benefit of the services as provided by BhuRakshan, in the manner permitted by the terms.'+
        			'You may not permit anyone else to modify, copy, create a derivative work of, reverse engineer, the compile or otherwise attempt to extract the source code of the software or any part thereof, unless this is expressly permitted or required by law, or unless you have been specifically told that you may do so by BhuRakshan in writing.'+
        			'Unless BhuRakshan has given you specific written permission to do so, you may not assign or grant a sub-license of your rights to use the software, grant a security interest in or over your rights to use the software or otherwise transfer any part of your rights to use the BhuRakshan.'+
        			'\n\n9. Content License from you:\n'+
        			'You retain copy right and any other rights you already hold in information, documents which you submit, post or display on or through, the services. By submitting details you authorize BhuRakshan to adapt that and use it for the services. This license is for the sole purpose of enabling services.'+
        			'You agree that this license includes a right for BhuRakshan to make such content available to its people who are directly involved in the project and is no further to be used by the other companies, organisations or individuals with whom BhuRakshan has relationship for the provision of syndicated services, and to use such content in connection with the provision of those services.'+
        			'\n\n10. Software Updates :\n'+
        			'The software which you use may automatically download and install updates from time to time from BhuRakshan. These updates are designed to improve, enhance and further develop the services and may take the form of bug fixes, enhanced functions, new software modules and completely new versions. You agree to receive such updates and permit BhuRakshan to deliver these to you as part of your use of the services.'+
        			'\n\n11. Service Delivery :\n'+
        			'Services of BhuRakshan are bound to the laws of geographical area of Bangalore, Karnataka, India. Hence any legal related issues are dealt only in Bangalore.'+
        			'The information we procure from you to offer the services are meant to be used by BhuRakshan staff only. Other than this we also have the rights to share your details (when sought) to law keepers viz., Police/Legal authorities.'+
        			'The date of the visits might differ 10% either ways. But there will be no difference to the numbers of guaranteed visits - Monthly - 12 | Quarterly - 4 | Half Yearly - 2 | Yearly - 1.'+
        			'\n\nRefund policy\n - Refunds are made available to clients only after the approval of the board at BhuRakshan. There will be no questions asked to the decision of the client.'+
        			'\nTerms for refund include'+
        			' * If client stops taking service during First Quarter  – 75% will be refunded'+
        			' * If client stops taking service during Second Quarter – 50% will be refunded'+
        			' * If client stops taking service during Third Quarter  – 25% will be refunded'+
        			'\n\nNote'+
        			'During maintenance/upgradation of our website the access to the client may be terminated, at this point BhuRakshan will make sincere and honest attempt to backup the data or retrieve in case of any loss, even further to this attempt if the data is lost then BhuRakshan will not refund/repay/be held responsible for any data loss.'+
        			'While making the refund BhuRakshan will take into account and deduct if any additional costs involved in executing your service.'+
        			'No refunds will be available after the service delivery for complete term.'+
        			'\n\nBhuRakshan will take a minimum of 7 working days to start the refund process. However the reach of refund to client will be based on speed of the banks and other payment gateway channels.'+
        			'BhuRakshan can also stop the services and even access to the website to any client at any point of time even without stating any reason whatsoever. This decision making power is purely based on the customer-BhuRakshan relationship.'+
        			'Locating a property is of key function and we use various technologies for the same'+
        			'In case a customer makes mistake in marking his site on google maps or makes mistake in showing his site personally or his contacts who show us the site makes mistake then we will not be responsible for any legal issues like trespassing of our staff into others property.'+
        			'Sameway if staff at BhuRakshan monitors a wrong site because of technological errors (gps + glonas) or human errors then we request the customer to get back to us within 5 working days.'+
        			'If customer doesnt reply back then we assume that the photos are correct and are approved by customer. Please note that Bhurakshan will not be liable to pay any amount of the property cost in above or any other cases not said above.'+
        			'Subscription for monitoring a property is not substitutable/transfarreble to monitor different properties of the client.'+
        			'Team and Management of Bhurakshan is not responsible if the client property is acquired by government or any type of government agencies or court attachmeets or trespassing of any goonda elements.'+
        			'Once the agreement is signed between Bhurakshan and client then it is not transferable.'+
        			'Keynote to customer'+
        			'we request every client to revert with feedback on the property photographs if it doesn’t match with the original property within 5working days.'+
        			'\n\n12. Changes to the Terms:\n'+
        			'BhuRakshan may change the universal terms or additional terms. When these changes are made we will post those changes on this page and update the modification date below. BhuRakshan will make a new copy of the universal terms available here and any new additional terms will be made available to you from within or through the affected services.'+
        			'You understand and agree that if you use the services after the date on which the universal terms or additional terms have changed, BhuRakshan will treat users acceptance of the updated universal terms or additional terms.'+
        			'Last Modified Date : 14th October 2013\n\n'+
        			'The software which you use may automatically download and install updates from time to time from BhuRakshan. These updates are designed to improve, enhance and further develop the services and may take the form of bug fixes, enhanced functions, new software modules and completely new versions. You agree to receive such updates and permit BhuRakshan to deliver these to you as part of your use of the services.',
        	height: 200,
        	width: 330,
        	allowBlank: false,
        	labelAlign: 'right', labelWidth: 150
        });
		
		Ext.apply(me, {
			style: 'padding-top: 20px; padding-left: 20px;',
			frame: true,
			defaults: {labelAlign: 'right', labelWidth: 150},				
			items: [{xtype: 'label', text: 'Terms of Service'},
			        termsOfServiceField,
			        {
						xtype: 'checkbox',
	                    boxLabel  : 'I have read and accepted the terms of service',
	                    name      : 'accept',
	                    checked: true,
	                    readOnly: true
	                }			        
			        ]
		});
		me.callParent(arguments);
	}
});

Ext.define('ps.AddPropertyCardContainer', {
	extend: 'Ext.container.Container',
	alias: 'widget.ps-add-property-card-container',
	
	initComponent: function() {
		var me = this;
		
		var termsOfServiceAcceptanceScreen = Ext.widget('ps-terms-of-service-form');
		var propertyDetailsForm = Ext.widget('ps-property-details-form');
		
		Ext.apply(me, {
			layout: 'card',
			activeItem: 0,
			items: [termsOfServiceAcceptanceScreen, propertyDetailsForm]
		});
		
		me.callParent(arguments);
		
		this.getPropertyDetailsForm = function() {
			return propertyDetailsForm;
		};
	}
});

Ext.define('ps.PropertyDetailsForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-property-details-form',
	
	initComponent: function() {
		var me = this;
		
		var propertyName = Ext.create('Ext.form.TextField', {	        
	        name: 'property-name',
	        fieldLabel: 'Property Name*',
	        maskRe: /[a-zA-Z0-9]/,
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });
		
		var addressField = Ext.create('Ext.form.TextArea', {        					       
        	name: 'address',
        	fieldLabel: 'Property Address*',
        	style: 'margin-top: 10px;',
        	allowBlank: false,
        	labelAlign: 'right', labelWidth: 150
        });
		
		var cityStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        {"name":"Bangalore", "value":"BANGALORE"},
		        {"name":"Mysore", "value":"MYSORE"}
		    ]
		});
		
		var cityCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'City*',
		    labelWidth: 100,		    
		    labelAlign: 'right',
		    style: 'margin-top: 10px;',
		    store: cityStore,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',
		    allowBlank: false,
		    labelAlign: 'right', labelWidth: 150
		});		
		
		var stateStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [		        
		        {"name":"Karnataka", "value":"KARNATAKA"}
		    ]
		});
		
		var stateCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'State*',
		    labelWidth: 100,		    
		    labelAlign: 'right',
		    style: 'margin-top: 10px;',
		    store: stateStore,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',
		    allowBlank: false,
		    labelAlign: 'right', labelWidth: 150
		});			
		
		
		var serviceTypeStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        {"name":"Property Monitoring", "value":"PROPERTY_MONITOR"},
		        {"name":"Property Cleaning", "value":"PROPERTY_CLEANING"},
		        {"name":"Property Fencing", "value":"PROPERTY_FENCING"},
		        {"name":"Other", "value":"OTHER"}
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
		    labelAlign: 'right', labelWidth: 150,
		    listeners: {
		    	'change': function(combo, newVal, oldVal, opts) {
		    		frequencyCombo.setVisible(false);
		    		frequencyCombo.setDisabled(true);
		    		otherField.setVisible(false);
		    		otherField.setDisabled(true);
	    			if(newVal === 'PROPERTY_MONITOR') {
	    				frequencyCombo.setDisabled(false);
	    				frequencyCombo.setVisible(true);
		    		}
	    			else if(newVal === 'OTHER') {
	    				otherField.setDisabled(false);
	    				otherField.setVisible(true);	    				
	    			}	    				    			
		    	}
		    }
		});
		
		var otherField = Ext.create('Ext.form.TextField', {	        
	        name: 'other-service-description',
	        fieldLabel: 'Service Description*',
	        //maskRe: /[a-zA-Z0-9]/,
	        hidden: true,
	        allowBlank: false,
	        labelAlign: 'right', labelWidth: 150
        });		
		
		var phoneField = Ext.create('Ext.form.TextField', {        					       
        	name: 'phone',
        	fieldLabel: 'Local Contact(Mobile) Number',
        	style: 'margin-top: 10px;',
        	allowBlank: true,
        	vtype: 'phone',
        	labelAlign: 'right', labelWidth: 150
        });	
		
		var couponField = Ext.create('Ext.form.TextField', {	        
	        name: 'coupon-code',
	        fieldLabel: 'Coupon Code',
	        maskRe: /[a-zA-Z0-9]/,
	        allowBlank: true,
	        labelAlign: 'right', labelWidth: 150
        });				
		
		var frequencyStore = Ext.create('Ext.data.Store', {
		    fields: ['name', 'value'],
		    data : [
		        {"name":"Monthly", "value":"MONTHLY"},
		        {"name":"Quaterly", "value":"QUATERLY"},
		        {"name":"Half Yearly", "value":"HALFYEARLY"},
		        {"name":"Yearly", "value":"YEARLY"}
		    ]
		});
		
		var frequencyCombo = Ext.create('Ext.form.ComboBox', {
		    fieldLabel: 'Monitoring Frequency*',
		    labelWidth: 100,		    
		    labelAlign: 'right',
		    style: 'margin-top: 10px;',
		    store: frequencyStore,
		    hidden: true,
		    queryMode: 'local',
		    displayField: 'name',
		    valueField: 'value',
		    allowBlank: false,
		    labelAlign: 'right', labelWidth: 150
		});			
		
		
		Ext.apply(me, {
			style: 'padding-top: 20px;',
			frame: true,
			items: [
			        propertyName,
			        addressField,
			        cityCombo,
			        stateCombo,
			        serviceTypeCombo,
			        frequencyCombo,
			        otherField,
			        phoneField			        			        
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
				propertyName: propertyName.getValue(),
				propertyAddress: addressField.getValue(),
				city: cityCombo.getValue(),
				state: stateCombo.getValue(),
				phone: phoneField.getValue(),
				serviceType: serviceTypeCombo.getValue(),					
				frequency: frequencyCombo.getValue(),
				otherServiceDescription: otherField.getValue()
			};
		};
		
		me.validate = function() {
			return me.getForm().isValid();
		};
	}
});

/**
 * Account Holder Name : Bhumi Inc
Account Number: 122900201000215
IFSC Code: CORP0001229
Bank Name: Corporation Bank
Branch: Basaveshwaranagar Kamakshipalya


 To users inside India -

Dear (CustomerName) –

Thanks for your rightful interests to subscribe with us for your property management. You have opted Property Management Service  (Quarterly). Once the subscription is completed we will visit your property location, click pictures and upload the same on our webportal for your perusal. We will intimate you via phone or email once the photos are uploaded. 

Note – in case we find it difficult to locate your property we will get back to you. 

Subscription Charges

Amount - 4000 Rs
Discount 
- 0 Rs
Total Payable - 4000 Rs

Payment mode - 
Cheque in the name of Bhumi Inc. 

For online transfer – account details -  
IFSC Code: ICICI000123
Bank Name: ICICI Bank
Account Number: 1234567
Branch: Rajajinagar

Thanking You.


 * */

Ext.define('ps.PayManualPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-paymanual-panel',
	
	initComponent: function() {
		var me = this;
		
		var templ = new Ext.XTemplate(
				/*'<p>',
				'<span style="font-size:28px;"><span style="font-family: times new roman,times,serif;"><span style="color: rgb(0, 102, 255);">Pay with Paypal</span></span></span></p><BR><BR>',*/
			'<p><BR>Dear Customer, <BR>',
				'<i>&quot;Thanks for your rightful interests to subscribe with us for your property management. You have opted Property Management Service.<BR>Once the subscription is completed we will visit your property location, click pictures and upload the same on our webportal for your perusal.<BR> We will intimate you via phone or email once the photos are uploaded.',
				'<BR><BR><p>Note - in case we find it difficult to locate your property we will get back to you. </p>',				
			'<p> <BR><BR>',
				'You have opted for {serviceType} with <B>{frequency}</B> visit. Once we upload the photographs, please verify and in case of any confusion, please revert to us.</p>',
			'<p> <BR> <BR>',
				'<u>Subscription Charges </u>- </p>',
			'<p>',
				'<B>Subscription Amount</B> - {serviceAmount} {currency}</p>',
			'<p>',
				'<B>Discount</B> - {discount} {currency}</p>',
			'<p>',
				'<B>Total</B> - {totalAmount} {currency}</p>',
				'<BR><BR>',
				'<u>Payment mode </u>- Cheque in the name of <B>Bhumi Inc</B>', 
				'</p><BR><B>IFSC Code:</B> CORP0001229<BR><B>Bank Name:</B> Corporation Bank<BR><B>Account Number:</B> 122900201000215<BR><B>Account Type:</B> Current Account<BR><B>Branch:</B> Basaveshwaranagar Kamakshipalya ',
				'<BR><BR>',
				'<BR><BR>Thank you'
		);
		
		Ext.apply(me, {
			tpl: templ,			
			width: 300			
		});
		
		me.callParent(arguments);
		
		me.on('render', function() {
			templ.overwrite(me.body, me.tmplValues);
		});
	}
	
	
});
	


Ext.define('ps.PaypalPanel', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.ps-paypal-panel',
	
	initComponent: function() {
		var me = this;

		var templ;
		
		if(me.tmplValues.serviceType === 'PROPERTY_MONITOR') {
			templ = new Ext.XTemplate(
					/*'<p>',
					'<span style="font-size:28px;"><span style="font-family: times new roman,times,serif;"><span style="color: rgb(0, 102, 255);">Pay with Paypal</span></span></span></p><BR><BR>',
				'<p>',*/
					'<p><BR>Dear Customer, <BR>',
					'<i>&quot;Thanks for your rightful interests to subscribe with us for your property management. You have opted Property Management Service.<BR>Once the subscription is completed we will visit your property location, click pictures and upload the same on our webportal for your perusal.<BR> We will intimate you via phone or email once the photos are uploaded.',
					'<BR><BR><p>Note - in case we find it difficult to locate your property we will get back to you. </p>',				
				'<p> <BR><BR>',					
					'<i>&quot;Pay with Paypal. We have chosen Paypal because you have the freedom and flexibility to pay the way you want, while keeping your financial information more secure.&quot;</i></p>',
				'<p> <BR>',
					'You have opted for {serviceType} with <B>{frequency}</B> visit. Once we upload the photographs, please verify and in case of any confusion, please revert to us. Please call us at +91 98453 33211 or email us at support@bhurakshan.com</p>',
				'<p> <BR> <BR>',
					'<u>Subscription Charges </u>- </p>',
				'<p>',
					'<B>Subscription Amount</B> - {serviceAmount} {currency}</p>',
				'<p>',
					'<B>Discount</B> - {discount} {currency}</p>',
				'<p>',
					'<B>Total</B> - {totalAmount} {currency}</p>',
				'<p>',
					'&nbsp;</p>',
				'<p>',
					'Please click on the <B>Pay Now</B> button. After clicking on the <B>Pay Now</B> button, you will be taken to a new window which helps you through the subscription steps.<BR><BR> Please enter the amount <B> {totalAmount} {currency} </B> in the text box specified.</p>',
				'<p>',
					'&nbsp;</p><BR><BR>',								
					'<form action="https://www.paypal.com/cgi-bin/webscr" method="post">',
					'<input type="hidden" name="cmd" value="_s-xclick">',
					'<input type="hidden" name="hosted_button_id" value="ASX8KBWAJ5JE4">',
					'<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" alt="PayPal — The safer, easier way to pay online.">',
					'<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">',
					'</form>',								
				'<p>',					
					'<BR><BR>Thank you'					
			);
			
		}
		else {
			templ = new Ext.XTemplate(
					/*'<p>',
					'<span style="font-size:28px;"><span style="font-family: times new roman,times,serif;"><span style="color: rgb(0, 102, 255);">Pay with Paypal</span></span></span></p><BR><BR>',
				'<p>',*/
					'<p><BR>Dear Customer, <BR>',
					'<i>&quot;Thanks for your rightful interests to subscribe with us for your property management. You have opted Property Management Service.<BR>Once the subscription is completed we will visit your property location, click pictures and upload the same on our webportal for your perusal.<BR> We will intimate you via phone or email once the photos are uploaded.',
					'<BR><BR><p>Note - in case we find it difficult to locate your property we will get back to you. </p>',				
				'<p> <BR><BR>',					
					'<i>&quot;Pay with Paypal. We have chosen Paypal because you have the freedom and flexibility to pay the way you want, while keeping your financial information more secure.&quot;</i></p>',
				'<p> <BR>',
					'You have opted for {serviceType}. Once we upload the photographs, please verify and in case of any confusion, please revert to us.</p>',
				'<p> <BR> <BR>',
				'Please call us at +91 98453 33211 or email us at support@bhurakshan.com to know the service charges and we will help you further.',
				'<BR><BR>',
					'<u>You have got the discount of</u>- </p>',
				'<p>',
					'<B>Discount</B> - {discount} {currency}</p>',
				'<p>',
					'&nbsp;</p>',
				'<p>',
					' Once you call us and get to know the transaction amount, please click on the <B>Pay Now</B> button. After clicking on the <B>Pay Now</B> button, you will be taken to a new window which helps you through the subscription steps.<BR><BR> Please enter the transaction amount in the text box specified.</p>',
				'<p>',
					'&nbsp;</p><BR><BR>',								
					'<form action="https://www.paypal.com/cgi-bin/webscr" method="post">',
					'<input type="hidden" name="cmd" value="_s-xclick">',
					'<input type="hidden" name="hosted_button_id" value="ASX8KBWAJ5JE4">',
					'<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_paynowCC_LG.gif" border="0" name="submit" alt="PayPal — The safer, easier way to pay online.">',
					'<img alt="" border="0" src="https://www.paypalobjects.com/en_GB/i/scr/pixel.gif" width="1" height="1">',
					'</form>',								
				'<p>',
				'<BR><BR>Thank you'
			);
			
		}
		
		Ext.apply(me, {
			tpl: templ,			
			width: 300			
		});
		
		me.callParent(arguments);
		
		me.on('render', function() {
			templ.overwrite(me.body, me.tmplValues);
		});
	}
	
	
});


/*Ext.define('ps.AddPropertyWizard', {
	extend: 'Ext.container.Container',
	alias: 'widget.ps-add-property-wizard',
	
	initComponent: function() {
		var me = this;
		me.propertyDetailsForm = Ext.widget('ps-property-details-form');
		
		Ext.apply(me, {
			layout: 'card',
			activeItem: 0,
			items: [
			        me.propertyDetailsForm
			        ]
			
		});
		me.callParent(arguments);
	}
});*/

Ext.define('ps.CouponCodePanel', {
	extend: 'Ext.form.Panel',
	alias: 'widget.ps-coupon-code-panel',
	
	initComponent: function() {
		var me = this;
		var cc = me.uCC;
		if(me.pCC) {
			cc = me.pCC;
		}
		var couponCodeText = Ext.create('Ext.form.TextField', {	        
	        name: 'coupon-code',
	        fieldLabel: 'Coupon Code',
	        style: 'margin-top: 20px;',
	        allowBlank: true,
	        labelAlign: 'right', labelWidth: 150,
	        value: cc
        });
		
		
		Ext.apply(me, {					
			items: [couponCodeText]
		});				
		
		me.callParent(arguments);
		
		me.getData = function() {
			return {
				couponCode: couponCodeText.getValue()
			};
		};
	}
});

Ext.define('ps.CustomerSubscriptionGrid', {
	extend: 'Ext.grid.Panel',
	alias: 'widget.ps-customer-subscription-grid',
	
	plugins: [{
	    ptype: 'rowexpander',
	    rowBodyTpl : [		
		'<p><b>Address:</b> {propertyAddress}</p><br>'		
	    ]
	}],	

	initComponent: function() {
		var me = this;
		
		ps.shared.MapCache[ps.shared.SUBSCRIPTION_GRID] = me;		
				
		var propertyDetailsWin;				
		
		
		function getPropWin() {
			//var propertyDetailsForm = Ext.widget('ps-property-details-form');
			var propertyDetailsForm = Ext.widget('ps-add-property-card-container');
			
			var addPropertyDetailsHandler = function() {
				
				var btn = this;
				if(btn.text === 'Next') {
					btn.setText('Add');
					propertyDetailsForm.getLayout().setActiveItem(1);
					return;
				}
				
				var propForm = propertyDetailsForm.getPropertyDetailsForm();
				if(propForm.validate()) {
					
					var data = propForm.getData();
					
					
					var successCallBack = function(response, opts) {
						
						var resObj = Ext.JSON.decode(response.responseText);
						if(resObj.success == false) {
          				  Ext.Msg.show({
        					  title: 'Error',
        					  msg: resObj.msg,
        					  width: 400,
        					  buttons: Ext.MessageBox.OK
        				  }); 							
						}
						else {
							me.getStore().load();
							propertyDetailsWin.close();									
						}
						
					};
					
					var failureCallBack = function(response, opts) {
						alert('server-side failure with status code ' + response.status);
						propertyDetailsWin.close();
					};
					
					ps.shared.Utility.AJAX_FIRE_POST(
							ps.customer.serverproxy.URL.USER_PROPERTIES,
							data,
							successCallBack,
							failureCallBack
					);
								
				}
				
			};
			
			var cancelPropertyDetailsWinHandler = function() {
				propertyDetailsWin.close();
			};			
			
			return new Ext.window.Window({				
				title: 'Property Details Form',
				layout: 'fit',			
				width: 400,
				height: 400,
				modal: true,
				items: [propertyDetailsForm],
				buttons: [				          
				  {				 
					  text: 'Next',
					  handler: addPropertyDetailsHandler
				  },
				  {
					  text: 'Cancel',
					  handler: cancelPropertyDetailsWinHandler
				  }
				]
			});
		}				
				
		var initConfig = {			
			columns: me.getGridCols(),
			store: me.getGridStore(),
			autoScroll: true,
			dockedItems: [{
				xtype: 'toolbar',
				items: [{
							xtype: 'button',
							text: 'Add Property',
							handler: function() {								
								propertyDetailsWin = getPropWin();
								propertyDetailsWin.show();
							}
						}
				]
			}]
		};

		Ext.apply(me, initConfig);
		me.callParent(arguments);
				
	},

	getGridCols: function() {
		var me = this;
		ps.shared.ArrayCache = [];
		
		showMoreDetailsTab = function(index) {
			
			var recordInfo = ps.shared.ArrayCache[index];
			
			var moreDetailsTabs = Ext.widget('ps-moredetailstabs', {paramsArr: recordInfo});
			
			var moreDetailsWin = new Ext.window.Window({				
				title: 'More Details',
				layout: 'fit',
				autoShow: true,
				width: 600,
				height: 600,
				items: [moreDetailsTabs]				
			});
			
			moreDetailsWin.show();
		};
		
		showCouponCodeWindow = function(index) {
			
			var recordInfo = ps.shared.ArrayCache[index];
			
			var failureCallBack = function(response, opts) {
				alert('server-side failure with status code ' + response.status);
			};
			
			var successCallBack = function(response, opts) {
				var coupon = Ext.JSON.decode(response.responseText);
				if(coupon && coupon.displayString) {
					//pCC is property coupon code and ucc is user coupon code.
					var couponCodePanel = Ext.widget('ps-coupon-code-panel', {pCC: recordInfo.couponCode, uCC: coupon.displayString});
					
					var couponCodeWin = new Ext.window.Window({				
						title: 'Please enter the coupon code',
						layout: 'fit',
						autoShow: true,
						width: 400,
						height: 150,
						items: [couponCodePanel],	
						buttons: [	
								  {
									  text: 'Proceed',
									  handler: function() {
										  function succb(response, opts) {
											  var str = response.responseText;
											  if(str) {
												  var obj = Ext.JSON.decode(str);
												  if(obj && obj.success == false) {
		    	    	            				  Ext.Msg.show({
		    	    	            					  title: 'Message',
		    	    	            					  msg: obj.msg,
		    	    	            					  width: 400,
		    	    	            					  buttons: Ext.MessageBox.OK
		    	    	            				  }); 												  																									  
												  }
												  else {
													  couponCodeWin.close();
													  ps.shared.MapCache[ps.shared.SUBSCRIPTION_GRID].store.load();
													  showPaypalPanel(recordInfo.propertyName);									  												  													  
												  }
											  }
											  else {
												  couponCodeWin.close();
												  ps.shared.MapCache[ps.shared.SUBSCRIPTION_GRID].store.load();
												  showPaypalPanel(recordInfo.propertyName);									  												  
											  }
											  
										  }
										  
										  var data = couponCodePanel.getData();
										  data.propertyName = recordInfo.propertyName;
										  
										  ps.shared.Utility.AJAX_FIRE_POST(
											  ps.customer.serverproxy.URL.APPLY_COUPON_CODE,
											  data,
											  succb,
										      Ext.emptyFn
										  );								  
									  }
								  },				          
							  {
								  text: 'Cancel',
								  handler: function() {
									  couponCodeWin.close();
								  }
							  }
							]			
					});
					
					couponCodeWin.show();					
				}
			};
			
			ps.shared.Utility.AJAX_FIRE_GET(
					ps.customer.serverproxy.URL.MY_CREDITS,
					successCallBack,
					failureCallBack
			);
			
			
		};
		
		showPaypalPanel = function(propertyName) {
			
			function succb(response, opts) {
				var str = response.responseText;
				if(str) {
					var obj = Ext.JSON.decode(str);
					if(obj) {
						var payPanel;
						var title = 'Pay with Paypal';
						if(obj.currentResidence === 'INDIA') {
							payPanel = Ext.widget('ps-paymanual-panel', {tmplValues: obj});
							title = 'Pay by Cheque/NEFT';
						}
						else {
							payPanel = Ext.widget('ps-paypal-panel', {tmplValues: obj});
						}
						
						
						var payWin = new Ext.window.Window({				
							title: title,
							layout: 'fit',
							autoShow: true,
							width: 600,
							height: 650,
							items: [payPanel],	
							buttons: [								        						 
								  {
									  text: 'Cancel',
									  handler: function() {
										  payWin.close();
									  }
								  }
								]			
						});
						
						payWin.show();						
					}
				}
			}
			
			ps.shared.Utility.getProperty(propertyName, succb, Ext.emptyFn);
			

						
		};		
		
		showSubscribeWindow = function() {
			var subscribePanel = Ext.widget('ps-subscribe-panel');
			var subscribeWin = new Ext.window.Window({				
				title: 'Subscription Window',
				layout: 'fit',
				autoShow: true,
				modal: true,
				width: 600,
				height: 400,
				items: [subscribePanel]				
			});
			
			subscribeWin.show();			
		};
		
		showPhotoBrowser = function(index) {
			
			var recordInfo = ps.shared.ArrayCache[index];
			
			var photoBrowserPanel = Ext.widget('ps-property-browser', {paramsArr: recordInfo});
			
			var photoBrowserWin = new Ext.window.Window({				
				title: 'Photo Browser',
				layout: 'fit',
				autoShow: true,
				width: 800,
				height: 480,
				items: [photoBrowserPanel]				
			});
			
			photoBrowserWin.show();
						
		};
		
		return [
			{text: 'Property Name', flex: 1, dataIndex: 'propertyName'},	
			{text: 'Service Type', flex: 1, dataIndex: 'serviceType',
				renderer: function(value) {
					if(value === 'PROPERTY_MONITOR') {
						return 'Property Monitor';
					}
					else if(value === 'PROPERTY_FENCING') {
						return 'Property Fencing';
					}
					else if(value === 'PROPERTY_CLEANING') {
						return 'Property Cleaning';
					}					
					return value;
				}
			},
			//{text: 'Coupon Code', flex: 1, dataIndex: 'couponCode'},
			{text: 'Frequency', flex: 1, dataIndex: 'frequency'},
			{text: 'Other Service Description', flex: 1, dataIndex: 'otherServiceDescription'},
			{text: 'Coupon Code', flex: 1, dataIndex: 'couponCode'},
			{text: 'Subscription', flex: 1, dataIndex: 'propertyName', 
				renderer: function(value, meta, record) {
					var sStatus = 'NOT_SUBSCRIBED';
					if(record.get) {
						sStatus = record.get('subscriptionType');	
					}
					else {
						 sStatus = record.data.subscriptionType;
					}
					
					if(sStatus === 'NOT_SUBSCRIBED') {
						var valArr = {};
						valArr.propertyName = value;
						valArr.couponCode = record.get('couponCode');
						var cacheLength = ps.shared.ArrayCache.length;
						ps.shared.ArrayCache[cacheLength] = valArr;
						return '<a href="#" onclick="showCouponCodeWindow('+cacheLength+')"> Subscribe Now </a>';
					}
					else if(sStatus === 'ACTIVE') {
						return 'Active';
					}
					/*if(value === 'NOT_SUBSCRIBED') {
						return '<a href="#" onclick="showPaypalPanel()"> Subscribe Now </a>';
					}
					else if(value === 'ACTIVE') {
						return '<a href="#" onclick="showPaypalPanel()"> Active </a>';
					}
					else if(value === 'ENDED') {
						return '<a href="#" onclick="showPaypalPanel()"> Ended </a>';
					}
					return value;*/
					
				}
			},
			{text: 'Photo Browser', flex: 1, dataIndex: 'propertyName',
				renderer: function(value) {	
					var valArr = {};
					valArr.userEmail = me.userEmail;
					valArr.propertyName = value;
					var cacheLength = ps.shared.ArrayCache.length;
					ps.shared.ArrayCache[cacheLength] = valArr;					
					return '<a href="#" onclick="showPhotoBrowser('+cacheLength+')"> Browse Photos </a>';
				}
			},
			{text: 'Google Map', flex: 1, dataIndex: 'propertyName', 
				renderer: function(value) {
					var valArr = {};
					valArr.userEmail = me.userEmail;
					valArr.propertyName = value;	
					var cacheLength = ps.shared.ArrayCache.length;
					ps.shared.ArrayCache[cacheLength] = valArr;	
					return '<a href="#" onclick="showMoreDetailsTab('+cacheLength+')"> Set your location </a>';
				}
			}
		];
	},

	getGridStore: function() {
		var url;
		var me = this;
		if(me.adminMode) {
			url = '/ps/admin/users/'+me.userEmail+'/properties';
		}
		else {
			url = ps.customer.serverproxy.URL.USER_PROPERTIES;
		}
		return Ext.create('Ext.data.Store', {
			model: 'ps.CustomerSubscriptionGridModel',
			autoLoad: true,
			autoSync: true,
			proxy: {
				type: 'rest',
				//url: '/ps/users/properties',
				//url: ps.customer.serverproxy.URL.USER_PROPERTIES,
				url: url,
				reader: {
					type: 'json',
					root: 'properties'
				}
			}		
		});		
	}
});

Ext.define('ps.SubscribePanel', {
	extend: 'Ext.container.Container',
	alias: 'widget.ps-subscribe-panel',
	
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			items: [
			        {
			        	

		                xtype : 'container',
		                html:'<form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post">'+
			        	'<input type="hidden" name="cmd" value="_s-xclick">'+
			        	'<input type="hidden" name="hosted_button_id" value="7D4XTPA2W5WFY">'+
			        	'<input type="image" src="https://www.sandbox.paypal.com/en_US/i/btn/btn_subscribe_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">'+
			        	'<img alt="" border="0" src="https://www.sandbox.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1">'+
			        	'</form>'
			        	
			        }
			]
		});
		me.callParent(arguments);
	}
});

Ext.define('ps.MoreDetailsTabs', {
	extend: 'Ext.tab.Panel',
	alias: 'widget.ps-moredetailstabs',

	initComponent: function() {
		var me = this;
		
		var locationMap = me.getLocationMap();
		
		var initConfig = {
				activeTab: 0,				
		        //height: 250,
		        plain: true,
		        defaults :{
		            autoScroll: true,
		            bodyPadding: 10
		        },				
				items: [				       
				        locationMap/*,				        
				        {
				        	title: 'Your Neighbours',
				        	html: 'All your neighbours around your property!'
				        }*/
				]
		};
		
		Ext.apply(me, initConfig);
		me.callParent(arguments);
	},
	
	getLocationMap: function() {
		
        var me = this;
        var gmapP = Ext.widget('gmappanel', {            
            title: 'Location Map',
            center: {                
            	geoCodeAddr: 'Bangalore, Karnataka, India',                
            	marker: {title: 'Bangalore'}
            },            
    	    buttons: [
    	              {
    	            	  text: 'Help',
    	            	  handler: function() {
    	            			Ext.Msg.show({
	    	            				title: 'Help',
	    	            				msg: '<UL><LI>Click on the map to set your property location.</LI><LI>Once you set your property location, click on Save your location button, to save.</LI></UL>',
	    	            				width:400,
	    	            				buttons: Ext.MessageBox.OK
    	            			});    	            		 
    	            	  }
    	              },
    	              {
    	            	  text: 'Save your location',
    	            	  scope: this,
    	            	  handler: function() {
    	            		  
    	            		  var position = gmapP.getCustomMarkerPosition();
    	            		  if(position) {
    	            			  
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
    	            			  
    	            			  var data = {
    	            				  latitude: position.lat(),
    	            				  longitude: position.lng(),
    	            				  propertyName: me.paramsArr.propertyName,
    	            				  userEmail: me.paramsArr.userEmail
    	            		      };
    	            				
    	            			  ps.shared.Utility.AJAX_FIRE_POST(
    	            				  ps.customer.serverproxy.URL.MARK_PROPERTY,
    	            				  data,
    	            				  successHandler,
    	            				  failurecallBack
    	            			  );
    	            				    	            			 
    	            		  }
    	            		  else { 
    	            			  
      	            			  Ext.Msg.show({
      	            				  title: 'Help',
      	            				  msg: 'Please set your location first and then save.',
      	            				  width:400,
      	            				  buttons: Ext.MessageBox.OK,
      	            			  });  
      	            			  
    	            		  }    	            		             		
    	            	  }
    	              }             
    	             ]            
        });
        
        var markOnMap = function(response) {
        	if(response && response.responseText) {
        		var propertyObj = Ext.JSON.decode(response.responseText);
        		if(propertyObj && propertyObj.latitude && propertyObj.longitude) {
        			gmapP.setCustomPosition(
        					{latitude: propertyObj.latitude, longitude: propertyObj.longitude});
        		}        		
        	}
        };
        
        var failureHandler = function() {
        	
        };
            
        ps.shared.Utility.AJAX_FIRE_GET(
				ps.customer.serverproxy.URL.USER_PROPERTIES+'/'+me.paramsArr.propertyName+'?userEmail='+me.paramsArr.userEmail,				
				markOnMap,
				failureHandler
		); 
		
		
        return gmapP;
	}
		
});
	
