

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