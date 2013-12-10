package com.ps.shared.interfaces;

import javax.ejb.Remote;

import com.ps.shared.Constants.SERVICES;
import com.ps.shared.dataobjects.Coupon;
import com.ps.shared.dataobjects.Service;
import com.ps.shared.exception.ApplicationException;

@Remote
public interface AdminManager extends DatabaseInitializer
{
	public void addCoupon(Coupon coupon) throws ApplicationException;
	public void addService(Service service) throws ApplicationException;
	public void addDiscount(String userEmail) throws ApplicationException;
	//public int getDiscount(String couponCode);
	public Coupon getCoupon(String couponCode);
	//public int getServiceAmount(SERVICES service);
	public Service getService(SERVICES service);
	public void userCouponAvailed(String couponCode, int remainingDiscountInRs, int remainingDiscountInDollars);
	
}
