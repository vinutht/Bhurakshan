package com.ps.shared.dataobjects;

import java.io.Serializable;
import java.util.Calendar;
import java.util.StringTokenizer;

import com.ps.shared.Constants.COUPON_TYPE;

public class Coupon implements Serializable
{
	private String couponCode;
	private int discount;
	private String validUpto;
	private Integer discountInRs;
	private String displayString;
	private COUPON_TYPE couponType = COUPON_TYPE.PREDEFINED_COUPON;
	private String userEmail;
	private int referralCount;				
	private Integer discountPercent;
	private boolean userCoupon = true;
	
	public Integer getDiscountPercent() {
		return discountPercent;
	}
	public void setDiscountPercent(Integer discountPercent) {
		this.discountPercent = discountPercent;
	}
	public boolean isUserCoupon() {
		return userCoupon;
	}
	public void setUserCoupon(boolean userCoupon) {
		this.userCoupon = userCoupon;
	}

	
	public int getReferralCount() {
		return referralCount;
	}
	public void setReferralCount(int referralCount) {
		this.referralCount = referralCount;
	}
	
	
	
	public String getDisplayString() {
		return displayString;
	}
	public void setDisplayString(String displayString) {
		this.displayString = displayString;
	}
	public COUPON_TYPE getCouponType() {
		return couponType;
	}
	public void setCouponType(COUPON_TYPE couponType) {
		this.couponType = couponType;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	
	public Integer getDiscountInRs() {
		return discountInRs;
	}
	public void setDiscountInRs(Integer discountInRs) {
		this.discountInRs = discountInRs;
	}
	
	public String getCouponCode() {
		return couponCode;
	}
	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public String getValidUpto() {
		return validUpto;
	}
	public void setValidUpto(String validUpto) {
		this.validUpto = validUpto;
	}
	
	public boolean isValid()
	{
		if(couponType == COUPON_TYPE.USER_COUPON) {
			return true;
		}
		
		StringTokenizer tokenizer = new StringTokenizer(validUpto, "-");
		int month = Calendar.getInstance().get(Calendar.MONTH)+1;
		int day = Calendar.getInstance().get(Calendar.DAY_OF_MONTH);
		int cDay = Integer.parseInt(tokenizer.nextToken());
		int cMonth = Integer.parseInt(tokenizer.nextToken());
		
		if(cMonth > month) {
			return true;
		}
		else if((cMonth == month) && (cDay >= day)) {
			return true;
		}
		return false;
	}
	
}
