package com.ps.restservices.userservice;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;
import java.util.List;


import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.WebApplicationException;

import javax.ws.rs.core.StreamingOutput;

import net.tanesha.recaptcha.ReCaptchaImpl;
import net.tanesha.recaptcha.ReCaptchaResponse;

import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ps.restservices.RestUtility;
import com.ps.restservices.ReturnObject;
import com.ps.shared.PSLookup;
import com.ps.shared.dataobjects.Coupon;
import com.ps.shared.dataobjects.ImageDate;
import com.ps.shared.dataobjects.Password;
import com.ps.shared.dataobjects.Properties;
import com.ps.shared.dataobjects.Property;
import com.ps.shared.dataobjects.ImageData;
import com.ps.shared.dataobjects.User;
import com.ps.shared.email.EmailHelper;
import com.ps.shared.exception.ApplicationException;
import com.ps.shared.interfaces.UserManager;


public class UserServiceImpl implements UserService 
{
	private Logger logger = Logger.getLogger(UserServiceImpl.class.getName());

	@Override
	public StreamingOutput addUser(InputStream is, HttpServletRequest req)
	{
		final User user;
		try {			
			user = (User)readObject(is, User.class);				
			ReturnObject retObj = validateUserRegistration(user, req);
			if(retObj.isSuccess()) {
				UserManager userManager = PSLookup.getUserManagerBean();
				userManager.addUser(user);				
			}
			else {
				return RestUtility.returnFailure(retObj);
			}					
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation addUser :: " + e.getMessage();
			logger.error(errorMsg);									
			return RestUtility.returnFailure("Failed to register user. Please contact us.", "");
		}		
		return RestUtility.returnSuccess("Successfully added the user: " + user.getName());
	}	
	
				
	private ReturnObject validateUserRegistration(User user, HttpServletRequest req)
	{
		ReturnObject retObj = new ReturnObject();
		try {
			UserManager userManager = PSLookup.getUserManagerBean();
			boolean isUserUnique = userManager.isUserUnique(user.getEmail());			
			
			if(!isUserUnique) {				
				retObj.setMsg("User with this email id is already registered. Please use a different email.");
				retObj.setSuccess(false);
				retObj.setField("Email");				
				return retObj;
			}
			else {
		        ReCaptchaImpl reCaptcha = new ReCaptchaImpl();
		        reCaptcha.setPrivateKey("6LdgYdcSAAAAAFYH48hN32p59LHQI9a3__PuPUb5");
		        		        
		        String remoteAddr = req.getRemoteAddr();		        		        
		        
		        ReCaptchaResponse reCaptchaResponse = reCaptcha.checkAnswer(remoteAddr, user.getCaptchaChallengeField(), user.getCaptchaResponseField());		        
		        if (!reCaptchaResponse.isValid()) {
					retObj.setMsg("Incorrect captcha.");
					retObj.setSuccess(false);
					retObj.setField("Captcha");				
					return retObj;		        	
		        }
		        else {
					retObj.setMsg("");
					retObj.setSuccess(true);
					retObj.setField("");				
					return retObj;		        	
		        }		        									
			}
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation validateUserRegistration :: " + e.getMessage();
			logger.error(errorMsg);						
			
			retObj.setMsg("User validation failed due to some reason. Please contact us.");
			retObj.setSuccess(false);
			retObj.setField("");				
			return retObj;						
		}		
	}
	
	
	private Object readObject(InputStream is, Class clazz) throws ApplicationException
	{
		try {
			ObjectMapper oMapper = new ObjectMapper();
			return oMapper.readValue(is, clazz);			
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing readObject operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}		
	}	

	@Override
	public StreamingOutput getUser()
	{
		try {
			UserManager userManager = PSLookup.getUserManagerBean();
			final User user = userManager.getUser();
			if(user != null) {
				return new StreamingOutput() {
					public void write(OutputStream outputStream) throws IOException, WebApplicationException 
					{
						PrintStream ps = new PrintStream(outputStream);
						ObjectMapper oMapper = new ObjectMapper();					
						oMapper.writeValue(ps, user);					
					}
				};							
			}
						
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation getUser :: " + e.getMessage();
			logger.error(errorMsg);
		}	
		return RestUtility.returnFailure("Unable to get user", "");				
	}




	@Override
	public StreamingOutput modifyUser(InputStream is) 
	{		
		String name = "";
		try {				
			User user = (User)readObject(is, User.class);
			name = user.getName();
			UserManager userManager = PSLookup.getUserManagerBean();
			userManager.modifyUser(user);
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation modifyUser :: " + e.getMessage();
			logger.error(errorMsg);			
			return RestUtility.returnFailure("Unable to complete the registration", "Registration Form");
		}
		return RestUtility.returnSuccess("Successfully modified the user: " + name);
	}

	@Override
	public StreamingOutput modifyProfile(InputStream is) 
	{		
		String name = "";
		try {				
			User user = (User)readObject(is, User.class);
			name = user.getName();
			UserManager userManager = PSLookup.getUserManagerBean();
			userManager.modifyProfile(user);
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation modifyProfile :: " + e.getMessage();
			logger.error(errorMsg);			
			return RestUtility.returnFailure("Unable to modify the profile", "");
		}
		return RestUtility.returnSuccess("Successfully modified the profile: " + name);
	}	
	
	@Override
	public StreamingOutput addNewProperty(InputStream is) 
	{
		String propertyName = "";
		try {
			Property property = (Property)readObject(is, Property.class);
			propertyName = property.getPropertyName();
			
			PSLookup.getUserManagerBean().addNewProperty(property);					
			User user = PSLookup.getUserManagerBean().getUser();
			EmailHelper.sendNewPropertyAlertEmail(user, property);
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation addNewProperty :: " + e.getMessage();
			logger.error(errorMsg);			
			return RestUtility.returnFailure("Unable to add new property:: " + e.getMessage(), "");
		}		
		
		return RestUtility.returnSuccess("Successfully added new property: " + propertyName);
	}
	
	@Override
	public StreamingOutput markPropertyLocation(InputStream is)
	{
		String lat = "";
		String longi = "";
		String propertyName = "";
		try {
			Property property = (Property)readObject(is, Property.class);
			if(property != null) {
				lat = property.getLatitude();
				longi = property.getLongitude();
				propertyName = property.getPropertyName();
				
				PSLookup.getUserManagerBean().markPropertyLocation(property);
				User user = PSLookup.getUserManagerBean().getUser();
				String email = user.getEmail();
				
				if(user.getRole().equals("ADMIN")) {
					email = property.getUserEmail();
				}
				EmailHelper.sendPropertyLocationChange(propertyName, lat, longi, email);
			}
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation addNewProperty :: " + e.getMessage();
			logger.error(errorMsg);			
			return RestUtility.returnFailure("Unable to mark property location", "");
		}
		return RestUtility.returnSuccess("Successfully added new property marker for property " + propertyName + " at latitude: "+ lat + " and at longitude: " + longi);
	}

	@Override
	public StreamingOutput getProperty(String propertyName, String userEmail)
	{
		try {
			final Property property = PSLookup.getUserManagerBean().getProperty(propertyName, userEmail);
			return new StreamingOutput() {
				public void write(OutputStream outputStream) throws IOException, WebApplicationException 
				{
					ObjectMapper oMapper = new ObjectMapper();
					PrintStream ps = new PrintStream(outputStream);
					oMapper.writeValue(ps, property);									
				}
			};			
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation getProperty :: " + e.getMessage();
			logger.error(errorMsg);			
			
		}
		return RestUtility.returnFailure("Unable to get property information", "");
	}
	
	@Override
	public StreamingOutput getMyCredits()
	{
		try {
			final Coupon coupon = PSLookup.getUserManagerBean().getMyCredits();
			return new StreamingOutput() {
				public void write(OutputStream outputStream) throws IOException, WebApplicationException 
				{
					ObjectMapper oMapper = new ObjectMapper();
					PrintStream ps = new PrintStream(outputStream);
					oMapper.writeValue(ps, coupon);									
				}
			};			
			
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation getMyCredits :: " + e.getMessage();
			logger.error(errorMsg);			
			
		}
		return RestUtility.returnFailure("Unable to get my credit information", "");
		
	}

	@Override
	public StreamingOutput getAllProperties() 
	{
		try {
			List<Property> propertyList = PSLookup.getUserManagerBean().getAllProperties();
			final Properties properties = new Properties();
			properties.setProperties(propertyList);
			
			return new StreamingOutput() {
				public void write(OutputStream outputStream) throws IOException, WebApplicationException 
				{
					ObjectMapper oMapper = new ObjectMapper();
					PrintStream ps = new PrintStream(outputStream);
					oMapper.writeValue(ps, properties);									
				}
			};
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation getAllProperties :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
		}
		
		return RestUtility.returnFailure("Unable to get all properties", "");		
	}
	
	public StreamingOutput getImagesUploadedDate(String propertyName, String userEmail)
	{
		try {
			final List<ImageDate> imgUploadedDates = PSLookup.getImageManager().getImagesUploadedDate(propertyName, userEmail);
			return new StreamingOutput() {
				public void write(OutputStream outputStream) throws IOException, WebApplicationException 
				{
					ObjectMapper oMapper = new ObjectMapper();
					PrintStream ps = new PrintStream(outputStream);
					oMapper.writeValue(ps, imgUploadedDates);									
				}
			};
			
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation getImagesUploadedDate :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
		}
		
		return RestUtility.returnFailure("Unable to get Images Uploaded Date", "");		
				
	}
	
	public StreamingOutput getUploadedImageData(String propertyName, String userEmail, String month, String year)
	{
		try {
			final List<ImageData> imageDataList = PSLookup.getImageManager().getUploadedImageData(propertyName, userEmail, month, year);
			return new StreamingOutput() {
				public void write(OutputStream outputStream) throws IOException, WebApplicationException 
				{
					ObjectMapper oMapper = new ObjectMapper();
					PrintStream ps = new PrintStream(outputStream);
					oMapper.writeValue(ps, imageDataList);									
				}
			};			
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation getUploadedImageData :: " + e.getMessage();
			logger.error(errorMsg);
		}	
		return RestUtility.returnFailure("Unable to get image data", "");			
	}


	@Override
	public StreamingOutput changePassword(InputStream is) 
	{
		
		try {
			Password pwd = (Password)readObject(is, Password.class);
			if(pwd != null) {
				PSLookup.getUserManagerBean().changePassword(pwd.getNewPassword(), pwd.getOldPassword());
			}
		}
		catch(ApplicationException appExp) {
			return RestUtility.returnFailure(appExp.getMessage(), "");
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation changePassword :: " + e.getMessage();
			logger.error(errorMsg);									
			return RestUtility.returnFailure("Failed to change password. Please contact us.", "");
		}		
		return RestUtility.returnSuccess("Successfully changed the password");				
	}


	@Override
	public StreamingOutput applyCouponCode(InputStream is) 
	{
		try {
			Property property = (Property)readObject(is, Property.class);
			if(property != null) {
				PSLookup.getUserManagerBean().applyCouponCode(property);
			}
		}
		catch(ApplicationException ae) {
			return RestUtility.returnFailure(ae.getMessage(), "Coupon Code");
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation applyCouponCode :: " + e.getMessage();
			logger.error(errorMsg);									
			return RestUtility.returnFailure("Failed to apply couponCode. Please contact us.", "");			
		}

		return RestUtility.returnSuccess("Successfully applied the coupon code");				
	}
	
	
	
	
}
