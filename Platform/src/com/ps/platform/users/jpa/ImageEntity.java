package com.ps.platform.users.jpa;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.ps.shared.jpa.PlatformEntity;

@Entity
@Table(name="Images")
public class ImageEntity extends PlatformEntity 
{
	private String userEmail;
	private String imagePath;
	private String uploadedTime;
	private String monthAndYear;
	private String propertyName;
	private String imageName;
	private GPSEntity gps;
	
	@OneToOne
	public GPSEntity getGps() {
		return gps;
	}

	public void setGps(GPSEntity gps) {
		this.gps = gps;
	}

	@Basic
	public String getPropertyName() {
		return propertyName;
	}
	
	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	
	@Basic
	public String getImageName() {
		return imageName;
	}
	
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	
	@Basic
	public String getMonthAndYear() {
		return monthAndYear;
	}
	public void setMonthAndYear(String monthAndYear) {
		this.monthAndYear = monthAndYear;
	}
	@Basic
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	
	@Basic
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	
	@Basic
	public String getUploadedTime() {
		return uploadedTime;
	}
	public void setUploadedTime(String uploadedDate) {
		this.uploadedTime = uploadedDate;
	}
	
	

}
