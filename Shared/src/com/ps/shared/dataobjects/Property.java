package com.ps.shared.dataobjects;

import java.io.Serializable;

import com.ps.shared.Constants.CITY;
import com.ps.shared.Constants.MONITOR_FREQUENCY;
import com.ps.shared.Constants.SERVICE_TYPE;
import com.ps.shared.Constants.STATE;
import com.ps.shared.Constants.SUBSCRIPTION_TYPE;

public class Property implements Serializable 
{
	private int id;
	private String propertyName;
	private String propertyAddress;
	private CITY city;
	private STATE state;
	private SERVICE_TYPE serviceType;
	private SUBSCRIPTION_TYPE subscriptionType = SUBSCRIPTION_TYPE.NOT_SUBSCRIBED;
	private String phone;
	private String latitude;
	private String longitude;
	private String couponCode;
	private String currentResidence = "Other";
	private MONITOR_FREQUENCY frequency = MONITOR_FREQUENCY.MONTHLY;
	private int serviceAmount;
	private int discount;
	private int totalAmount;
	private String currency;
	private String otherServiceDescription;
	private String userEmail;			
		
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getOtherServiceDescription() {
		return otherServiceDescription;
	}
	public void setOtherServiceDescription(String otherServiceDescription) {
		this.otherServiceDescription = otherServiceDescription;
	}
	public CITY getCity() {
		return city;
	}
	public void setCity(CITY city) {
		this.city = city;
	}
	public STATE getState() {
		return state;
	}
	public void setState(STATE state) {
		this.state = state;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public int getServiceAmount() {
		return serviceAmount;
	}
	public void setServiceAmount(int serviceAmount) {
		this.serviceAmount = serviceAmount;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public int getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(int totalAmount) {
		this.totalAmount = totalAmount;
	}
	public MONITOR_FREQUENCY getFrequency() {
		return frequency;
	}
	public void setFrequency(MONITOR_FREQUENCY frequency) {
		this.frequency = frequency;
	}
	public String getCouponCode() {
		return couponCode;
	}
	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}
	public String getCurrentResidence() {
		return currentResidence;
	}
	public void setCurrentResidence(String currentResidence) {
		this.currentResidence = currentResidence;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	
	public SUBSCRIPTION_TYPE getSubscriptionType() {
		return subscriptionType;
	}
	public void setSubscriptionType(SUBSCRIPTION_TYPE subscriptionType) {
		this.subscriptionType = subscriptionType;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPropertyName() {
		return propertyName;
	}
	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	public String getPropertyAddress() {
		return propertyAddress;
	}
	public void setPropertyAddress(String propertyAddress) {
		this.propertyAddress = propertyAddress;
	}
	public SERVICE_TYPE getServiceType() {
		return serviceType;
	}
	public void setServiceType(SERVICE_TYPE serviceType) {
		this.serviceType = serviceType;
	}
	
	
}
