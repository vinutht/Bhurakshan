package com.ps.platform.users.jpa;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.ps.shared.Constants.CITY;
import com.ps.shared.Constants.MONITOR_FREQUENCY;
import com.ps.shared.Constants.SERVICE_TYPE;
import com.ps.shared.Constants.STATE;
import com.ps.shared.Constants.SUBSCRIPTION_TYPE;
import com.ps.shared.jpa.PlatformEntity;


@Entity
@Table(name="Properties")
public class PropertyEntity extends PlatformEntity 
{
	private String propertyName;
	private String propertyAddress;
	private CITY city;
	private STATE state;
	private SERVICE_TYPE serviceType;
	private UserEntity user;	
	private SUBSCRIPTION_TYPE subscriptionType = SUBSCRIPTION_TYPE.NOT_SUBSCRIBED;	
	private String phone;
	private String latitude;
	private String longitude;
	private String couponCode;
	private String currentResidence = "Other";
	private MONITOR_FREQUENCY frequency = MONITOR_FREQUENCY.MONTHLY;
	private String otherServiceDescription;
	private String subscriptionDate;			
	
	public String getSubscriptionDate() {
		return subscriptionDate;
	}
	public void setSubscriptionDate(String subscriptionDate) {
		this.subscriptionDate = subscriptionDate;
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

	@Basic
	public String getPhone() {
		return phone;
	}
	
	public void setPhone(String phone) {
		this.phone = phone;
	}	
	
	@Basic
	public SUBSCRIPTION_TYPE getSubscriptionType() {
		return subscriptionType;
	}

	public void setSubscriptionType(SUBSCRIPTION_TYPE subscriptionType) {
		this.subscriptionType = subscriptionType;
	}

	@ManyToOne
	public UserEntity getUser() {
		return user;
	}

	public void setUser(UserEntity user) {
		this.user = user;
	}

	@Basic
	public String getPropertyName() {
		return propertyName;
	}
	
	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	
	@Basic
	public String getPropertyAddress() {
		return propertyAddress;
	}
	
	public void setPropertyAddress(String propertyAddress) {
		this.propertyAddress = propertyAddress;
	}
	
	@Basic
	public SERVICE_TYPE getServiceType() {
		return serviceType;
	}
	
	public void setServiceType(SERVICE_TYPE serviceType) {
		this.serviceType = serviceType;
	}
	
}
