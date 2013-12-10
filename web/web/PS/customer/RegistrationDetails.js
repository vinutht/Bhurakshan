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

