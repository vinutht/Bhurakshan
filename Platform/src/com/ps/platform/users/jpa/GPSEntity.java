package com.ps.platform.users.jpa;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="GPS")
public class GPSEntity 
{	
	
	private int id;
	private String gpsVersion;
	private String gpsLatitudeRef;
	private String gpsLatitude;
	private String gpsLongitudeRef;
	private String gpsLongitude;
	private String gpsAltitudeRef;
	private String gpsAltitude;
	private String gpsTimeStamp;
	private String gpsDateStamp;
	private String gpsMapDatum;
	
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGpsVersion() {
		return gpsVersion;
	}
	public void setGpsVersion(String gpsVersion) {
		this.gpsVersion = gpsVersion;
	}
	public String getGpsLatitudeRef() {
		return gpsLatitudeRef;
	}
	public void setGpsLatitudeRef(String gpsLatitudeRef) {
		this.gpsLatitudeRef = gpsLatitudeRef;
	}
	public String getGpsLatitude() {
		return gpsLatitude;
	}
	public void setGpsLatitude(String gpsLatitude) {
		this.gpsLatitude = gpsLatitude;
	}
	public String getGpsLongitudeRef() {
		return gpsLongitudeRef;
	}
	public void setGpsLongitudeRef(String gpsLongitudeRef) {
		this.gpsLongitudeRef = gpsLongitudeRef;
	}
	public String getGpsLongitude() {
		return gpsLongitude;
	}
	public void setGpsLongitude(String gpsLongitude) {
		this.gpsLongitude = gpsLongitude;
	}
	public String getGpsAltitudeRef() {
		return gpsAltitudeRef;
	}
	public void setGpsAltitudeRef(String gpsAltitudeRef) {
		this.gpsAltitudeRef = gpsAltitudeRef;
	}
	public String getGpsAltitude() {
		return gpsAltitude;
	}
	public void setGpsAltitude(String gpsAltitude) {
		this.gpsAltitude = gpsAltitude;
	}
	public String getGpsTimeStamp() {
		return gpsTimeStamp;
	}
	public void setGpsTimeStamp(String gpsTimeStamp) {
		this.gpsTimeStamp = gpsTimeStamp;
	}
	public String getGpsDateStamp() {
		return gpsDateStamp;
	}
	public void setGpsDateStamp(String gpsDateStamp) {
		this.gpsDateStamp = gpsDateStamp;
	}
	public String getGpsMapDatum() {
		return gpsMapDatum;
	}
	public void setGpsMapDatum(String gpsMapDatum) {
		this.gpsMapDatum = gpsMapDatum;
	}
	
	

}
