package com.ps.shared.dataobjects;

import java.io.Serializable;

public class ImageData implements Serializable
{
	private String userEmail;
	private String imagePath;
	private String uploadedTime;
	private String monthAndYear;
	private String propertyName;
	private String imageName;
	private String latitude;
	private String longitude;
	private String timestamp;			
	private String datestamp;
	private String referenceLat;
	private String referenceLong;		
	
	public String getReferenceLat() {
		return referenceLat;
	}
	public void setReferenceLat(String referenceLat) {
		this.referenceLat = referenceLat;
	}
	public String getReferenceLong() {
		return referenceLong;
	}
	public void setReferenceLong(String referenceLong) {
		this.referenceLong = referenceLong;
	}
	public String getDatestamp() {
		return datestamp;
	}
	public void setDatestamp(String datestamp) {
		this.datestamp = datestamp;
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
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public String getUploadedTime() {
		return uploadedTime;
	}
	public void setUploadedTime(String uploadedTime) {
		this.uploadedTime = uploadedTime;
	}
	public String getMonthAndYear() {
		return monthAndYear;
	}
	public void setMonthAndYear(String monthAndYear) {
		this.monthAndYear = monthAndYear;
	}
	public String getPropertyName() {
		return propertyName;
	}
	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	public String getImageName() {
		return imageName;
	}
	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	
	
}
