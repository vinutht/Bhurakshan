package com.ps.platform.users.jpa;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.ps.shared.Constants.COUPON_TYPE;
import com.ps.shared.jpa.PlatformEntity;

@Entity
@Table(name="Coupons")
public class CouponEntity extends PlatformEntity
{
	private String couponCode;
	private Integer discount;	
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
	public void setDiscount(Integer discount) {
		this.discount = discount;
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

	public String getValidUpto() {
		return validUpto;
	}
	public void setValidUpto(String validUpto) {
		this.validUpto = validUpto;
	}
	
	
	
}
