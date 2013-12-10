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