package com.ps.shared;

public class Constants 
{

	public static enum SERVICE_TYPE {
		PROPERTY_MONITOR,
		PROPERTY_FENCING,
		PROPERTY_CLEANING,
		OTHER
	};
	
	public static enum SUBSCRIPTION_TYPE {
		NOT_SUBSCRIBED,
		ENDED,
		ACTIVE
	}
	
	/*public static enum CURRENT_RESIDENCE {
		INDIA,
		OTHER
	}*/
	
	public static enum MONITOR_FREQUENCY {
		MONTHLY,
		QUATERLY,
		HALFYEARLY,
		YEARLY
	}
	
	public static enum SERVICES {
		PROPERTY_MONITOR_MONTHLY,
		PROPERTY_MONITOR_QUATERLY,
		PROPERTY_MONITOR_HALFYEARLY,
		PROPERTY_MONITOR_YEARLY
	};
	
	public static enum CITY {
		BANGALORE,
		MYSORE
	};
	
	public static enum STATE {
		KARNATAKA
	};
	
	public static enum COUPON_TYPE {
		USER_COUPON,
		PREDEFINED_COUPON
	};
	
	public final static int COST_FACTOR = 35;
}
