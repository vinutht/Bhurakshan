package com.ps.platform.users.jpa;


import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ps.shared.jpa.PlatformEntity;

@Entity
@Table(name="Users")
public class UserEntity extends PlatformEntity
{
	private String name;
	private String email;
	private String password;		
	private Boolean accountActivated;
	private String address;
	private String phone;
	private String country;
	private boolean registrationComplete;			
	private List<PropertyEntity> properties; 		
	private String referer;
	private String howDidYouComeToKnow;
	
	@Basic
	public String getReferer() {
		return referer;
	}

	public void setReferer(String referer) {
		this.referer = referer;
	}

	@Basic
	public String getHowDidYouComeToKnow() {
		return howDidYouComeToKnow;
	}

	public void setHowDidYouComeToKnow(String howDidYouComeToKnow) {
		this.howDidYouComeToKnow = howDidYouComeToKnow;
	}	
	@OneToMany(mappedBy="user")
	public List<PropertyEntity> getProperties() {
		return properties;
	}

	public void setProperties(List<PropertyEntity> properties) {
		this.properties = properties;
	}

	public boolean isRegistrationComplete() {
		return registrationComplete;
	}

	public void setRegistrationComplete(boolean registrationComplete) {
		this.registrationComplete = registrationComplete;
	}

	@Basic
	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	@Basic
	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Basic
	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	@Basic
	public Boolean getAccountActivated() {
		return accountActivated;
	}

	public void setAccountActivated(Boolean accountActivated) {
		this.accountActivated = accountActivated;
	}
	

	@Basic
	public String getName() 
	{
		return name;
	}
	
	public void setName(String name) 
	{
		this.name = name;
	}
	
	@Basic
	@Column(unique=true)
	public String getEmail() 
	{
		return email;
	}
	
	public void setEmail(String email) 
	{
		this.email = email;
	}

	@Basic
	public String getPassword() 
	{
		return password;
	}

	public void setPassword(String password) 
	{
		this.password = password;
	}
	
	private RoleEntity role;

	@OneToOne
	public RoleEntity getRole() 
	{
		return role;
	}

	public void setRole(RoleEntity role) 
	{
		this.role = role;
	}
				
}
