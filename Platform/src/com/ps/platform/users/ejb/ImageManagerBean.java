package com.ps.platform.users.ejb;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

import javax.annotation.security.RolesAllowed;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.jboss.logging.Logger;

import com.ps.platform.users.jpa.GPSEntity;
import com.ps.platform.users.jpa.PropertyEntity;
import com.ps.platform.users.jpa.Queries;
import com.ps.platform.users.jpa.ImageEntity;
import com.ps.shared.PSLookup;
import com.ps.shared.dataobjects.GPS;
import com.ps.shared.dataobjects.ImageDate;
import com.ps.shared.dataobjects.ImageData;
import com.ps.shared.dataobjects.User;
import com.ps.shared.interfaces.ImageManager;

@Stateless
public class ImageManagerBean implements ImageManager
{
	Logger logger = Logger.getLogger(ImageManagerBean.class.getName());
	
	@PersistenceContext(unitName="platform")
	private EntityManager em;	

	@Override
	@RolesAllowed("ADMIN")
	public void saveUploadedImageData(String email, String path, String propertyName, String imageName, GPS gpsObj) 
	{
		try {
			Query query = em.createQuery(Queries.GET_UPLOADED_IMAGE_BY_PATH);
			query.setParameter("path", path);
			query.getSingleResult();			
		}
		catch(NoResultException nre) {
			ImageEntity uploadedImagesEntity = new ImageEntity();
			uploadedImagesEntity.setImagePath(path);
			uploadedImagesEntity.setUserEmail(email);
			uploadedImagesEntity.setPropertyName(propertyName);
			uploadedImagesEntity.setImageName(imageName);
			uploadedImagesEntity.setMonthAndYear(Calendar.getInstance().get(Calendar.MONTH) + "-" + Calendar.getInstance().get(Calendar.YEAR));
			Date date = new Date();		
			uploadedImagesEntity.setUploadedTime(date.toString());
			
			if(gpsObj != null && gpsObj.getGpsLatitude() != null) {
				GPSEntity gpsEntity = new GPSEntity();
				gpsEntity.setGpsAltitude(gpsObj.getGpsAltitude());
				gpsEntity.setGpsAltitudeRef(gpsObj.getGpsAltitudeRef());
				gpsEntity.setGpsDateStamp(gpsObj.getGpsDateStamp());
				gpsEntity.setGpsLatitude(gpsObj.getGpsLatitude());
				gpsEntity.setGpsLatitudeRef(gpsObj.getGpsLatitudeRef());
				gpsEntity.setGpsLongitude(gpsObj.getGpsLongitude());
				gpsEntity.setGpsLongitudeRef(gpsObj.getGpsLongitudeRef());
				gpsEntity.setGpsMapDatum(gpsObj.getGpsMapDatum());
				gpsEntity.setGpsTimeStamp(gpsObj.getGpsTimeStamp());
				gpsEntity.setGpsVersion(gpsObj.getGpsVersion());
				
				em.persist(gpsEntity);
				
				uploadedImagesEntity.setGps(gpsEntity);				
			}
			
			em.persist(uploadedImagesEntity);								
		}
	}
	
	public List<ImageDate> getImagesUploadedDate(String propertyName, String userEmail)
	{
		try {
			
			User user = PSLookup.getUserManagerBean().getUser();
			Query query = em.createQuery(Queries.GET_UPLOADED_IMAGE_DATE_BY_PROPERTY_NAME_AND_EMAIL);
			
			if(user.getRole().equals("ADMIN")) {
				query.setParameter("userEmail", userEmail);	
			}
			else {
				String email = user.getEmail();									
				query.setParameter("userEmail", email);				
			}
			
			query.setParameter("propertyName", propertyName);
			
			@SuppressWarnings("unchecked")
			List<String> dates = query.getResultList();
			List<ImageDate> imageUploadDates = new ArrayList<ImageDate>();
			
			for(String date: dates) {
				ImageDate imgUploadDate = new ImageDate();
				StringTokenizer tokenizer = new StringTokenizer(date, "-");
				
				imgUploadDate.setMonth(tokenizer.nextToken());
				imgUploadDate.setYear(tokenizer.nextToken());
				
				imageUploadDates.add(imgUploadDate);
			}
			return imageUploadDates;
			
		}
		catch(Exception e) {
			String errorMsg = "Failed when getting images uploaded date :" + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
			
		}
		return new ArrayList<ImageDate>();
	}
	
	
	public List<ImageData> getUploadedImageData(String propertyName, String userEmail, String month, String year)
	{
		try {
			Query query = em.createQuery(Queries.GET_UPLOADED_IMAGE_BY_PROPERTY_NAME_AND_EMAIL);	
			User user = PSLookup.getUserManagerBean().getUser();
			String email = user.getEmail();
			if("ADMIN".equals(user.getRole())) {
				query.setParameter("userEmail", userEmail);	
				email = userEmail;
			}
			else {
																
				query.setParameter("userEmail", email);					
			}		
			
			query.setParameter("propertyName", propertyName);
			month = Integer.parseInt(month) - 1 + "";
			query.setParameter("monthAndYear", month+"-"+year);
			
			List<ImageEntity> uploadedImages = query.getResultList();
			List<ImageData> uploadedImagesDataList = new ArrayList<ImageData>();
			
			Query propQuery = em.createQuery(Queries.GET_PROPERTY_BY_PROP_NAME_AND_EMAIL);			
			propQuery.setParameter("email", email);
			propQuery.setParameter("propertyName", propertyName);			
			PropertyEntity propEntity = (PropertyEntity)propQuery.getSingleResult();
			
			
			for(ImageEntity uploadedImagesEntity: uploadedImages) {
				ImageData uploadedImageData = new ImageData();
				uploadedImageData.setImageName(uploadedImagesEntity.getImageName());
				uploadedImageData.setImagePath(uploadedImagesEntity.getImagePath());
				uploadedImageData.setMonthAndYear(uploadedImagesEntity.getMonthAndYear());
				uploadedImageData.setPropertyName(uploadedImagesEntity.getPropertyName());
				uploadedImageData.setUploadedTime(uploadedImagesEntity.getUploadedTime());
				uploadedImageData.setUserEmail(uploadedImagesEntity.getUserEmail());
				
				String refLat = propEntity.getLatitude();
				if(refLat != null) {
					uploadedImageData.setReferenceLat(propEntity.getLatitude());
					uploadedImageData.setReferenceLong(propEntity.getLongitude());					
				}
				else {
					uploadedImageData.setReferenceLat("Please set the latitude of the location");
					uploadedImageData.setReferenceLong("Please set the longitude of the location");										
				}
				
				GPSEntity gps = uploadedImagesEntity.getGps();				
				if(gps != null) {
					uploadedImageData.setLatitude(gps.getGpsLatitude());
					uploadedImageData.setLongitude(gps.getGpsLongitude());
					uploadedImageData.setTimestamp(gps.getGpsTimeStamp());
					uploadedImageData.setDatestamp(gps.getGpsDateStamp());
				}
				else if(gps == null) {
					uploadedImageData.setLatitude("Not Available");
					uploadedImageData.setLongitude("Not Available");
					uploadedImageData.setTimestamp("Not Available");
					uploadedImageData.setDatestamp("Not Available");
				}
				uploadedImagesDataList.add(uploadedImageData);

			}
			
			return uploadedImagesDataList;
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getUploadedImageData :" + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
			
		}
		return new ArrayList<ImageData>();		
	}
}
