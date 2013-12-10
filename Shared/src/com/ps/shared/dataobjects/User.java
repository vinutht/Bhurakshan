package com.ps.shared.dataobjects;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
@XmlAccessorType(XmlAccessType.PROPERTY)
public class User implements Serializable
{
	private String name;
	private String email;
	private int id;		
	private String password;
	private String captchaChallengeField;
	private String captchaResponseField;
	private String address;
	private String phone;
	private String country;
	private String referer;
	private String howDidYouComeToKnow;
	private String couponCode;
	
	
	public String getCouponCode() {
		return couponCode;
	}

	public void setCouponCode(String couponCode) {
		this.couponCode = couponCode;
	}

	public String getReferer() {
		return referer;
	}

	public void setReferer(String referer) {
		this.referer = referer;
	}

	public String getHowDidYouComeToKnow() {
		return howDidYouComeToKnow;
	}

	public void setHowDidYouComeToKnow(String howDidYouComeToKnow) {
		this.howDidYouComeToKnow = howDidYouComeToKnow;
	}

	private boolean registrationComplete;	
	private String role;		
	private List<Property> properties;	
	
	public List<Property> getProperty() {
		return properties;
	}	
	
	public void setProperty(List<Property> properties)
	{
		this.properties = properties;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	/*public static enum COUNTRY {
		INDIA,
		OTHER
	};*/				
	
	public boolean isRegistrationComplete() {
		return registrationComplete;
	}

	public void setRegistrationComplete(boolean registrationComplete) {
		this.registrationComplete = registrationComplete;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@XmlElement
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	@XmlElement
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	@XmlElement
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}

	@XmlElement
	public String getCaptchaChallengeField() {
		return captchaChallengeField;
	}

	public void setCaptchaChallengeField(String captchaChallengeField) {
		this.captchaChallengeField = captchaChallengeField;
	}

	@XmlElement
	public String getCaptchaResponseField() {
		return captchaResponseField;
	}

	public void setCaptchaResponseField(String captchaResponseField) {
		this.captchaResponseField = captchaResponseField;
	}	
	
	
}
