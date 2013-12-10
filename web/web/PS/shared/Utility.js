Ext.ns('ps.shared.Utility');

Ext.ns('ps.admin.serverproxy');

ps.admin.serverproxy.URL = {
		ADD_SERVICE: '/ps/admin/services',
		ADD_COUPON: '/ps/admin/coupons',
		ALL_USERS: '/ps/admin/users',
		USER_PROPERTIES: '/ps/admin/properties',
		CHANGE_SUBSCRIPTION_STATUS: '/ps/admin/users/change-subscription-status'
};


ps.shared.ArrayCache = [];

ps.shared.SUBSCRIPTION_GRID = 'SubscriptionGrid';
ps.shared.MapCache = {};

Ext.ns('ps.customer.serverproxy');

ps.customer.serverproxy.URL = {
		PHOTO_DATES: '/ps/users/get-image-dates',
		CURRENT_USER: '/ps/users/get-current-user',
		MODIFY_PROFILE: '/ps/users/modify-profile',
		USER_PROPERTIES: '/ps/users/properties',
		USERS: '/ps/users',
		LOGOUT: '/unsecured/logout',
		IMAGE_DATA: '/ps/users/images',
		MY_CREDITS: '/ps/users/credits',
		MARK_PROPERTY: '/ps/users/properties/mark-property-location',
		CHANGE_PASSWORD: '/ps/users/change-password',
		APPLY_COUPON_CODE: '/ps/users/properties/apply-coupon-code'
};



ps.shared.Utility.AJAX_FIRE_GET = function(url, successCallBack, failureCallBack) {
	
	Ext.Ajax.request({		
		url: url,
		method: 'GET',
		headers: {
			'Accept': 'application/json'
		},
		success: successCallBack,
		failure: failureCallBack
		
	});	
	
};

ps.shared.Utility.AJAX_FIRE_POST = function(url, data, successCallBack, failureCallBack) {
	Ext.Ajax.request({		
		url: url,
		method: 'POST',
		jsonData: data,
		headers: {
			'Content-Type': 'application/json'
		},
		success: successCallBack,
		failure: failureCallBack
	});					
	
};

ps.shared.Utility.AJAX_FIRE_PUT = function(url, data, successCallBack, failureCallBack) {
	Ext.Ajax.request({		
		url: url,
		method: 'PUT',
		jsonData: data,
		headers: {
			'Content-Type': 'application/json'
		},
		success: successCallBack,
		failure: failureCallBack
	});					
	
};

ps.shared.Utility.getProperty = function(propertyName, scb, fcb) {	
	ps.shared.Utility.AJAX_FIRE_GET('/ps/users/properties/'+propertyName, scb, fcb);
};