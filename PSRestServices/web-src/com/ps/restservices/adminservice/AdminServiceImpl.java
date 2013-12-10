package com.ps.restservices.adminservice;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintStream;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.UriInfo;

import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ps.restservices.RestUtility;
import com.ps.shared.PSLookup;
import com.ps.shared.dataobjects.ApiContext;
import com.ps.shared.dataobjects.Coupon;
import com.ps.shared.dataobjects.Properties;
import com.ps.shared.dataobjects.Service;
import com.ps.shared.dataobjects.SubscriptionStatusChange;
import com.ps.shared.dataobjects.User;
import com.ps.shared.dataobjects.Users;
import com.ps.shared.exception.ApplicationException;
import com.ps.shared.interfaces.AdminManager;
import com.ps.shared.interfaces.UserManager;

public class AdminServiceImpl implements AdminService
{
	
	private Logger logger = Logger.getLogger(AdminServiceImpl.class.getName());

	@Override
	public StreamingOutput getAllUsers(SecurityContext sec, UriInfo uriInfo) 
	{
		try {
			if(sec.isUserInRole("ADMIN")) {
				String startStr = uriInfo.getQueryParameters().getFirst("start");
				String limitStr = uriInfo.getQueryParameters().getFirst("limit");
				String searchFilter = uriInfo.getQueryParameters().getFirst("searchFilter");
				int start =0, limit=Integer.MAX_VALUE;
								
				if(null != startStr && startStr.trim().length() > 0 && null != limitStr && limitStr.trim().length() > 0){
					 start = Integer.parseInt(startStr);
					 limit = Integer.parseInt(limitStr); 
				}				
				
				ApiContext apiContext = new ApiContext();
				apiContext.setLimit(limit);
				apiContext.setStart(start);
				apiContext.setSearchFilter(searchFilter);
				
				UserManager userManager = PSLookup.getUserManagerBean();
				final Users users = userManager.getAllUsers(apiContext);
				
				return new StreamingOutput() {
					public void write(OutputStream outputStream) throws IOException, WebApplicationException 
					{
						ObjectMapper oMapper = new ObjectMapper();
						PrintStream ps = new PrintStream(outputStream);
						oMapper.writeValue(ps, users);									
					}
				};										
			}			
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation getAllUsers :: " + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
		}
		
		return RestUtility.returnFailure("Unable to get all users", "");		
	}

	@Override
	public StreamingOutput getProperties(String userEmail) 
	{
		try {
			UserManager userManager = PSLookup.getUserManagerBean();
			final Properties props = userManager.getUserPropertiesByEmail(userEmail);
			return new StreamingOutput() {
				public void write(OutputStream outputStream) throws IOException, WebApplicationException 
				{
					ObjectMapper oMapper = new ObjectMapper();
					PrintStream ps = new PrintStream(outputStream);
					oMapper.writeValue(ps, props);									
				}
			};			
		}		
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation getProperties :: " + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
		}
		
		return RestUtility.returnFailure("Unable to get properties for the user " + userEmail, "");		

	}

	@Override
	public StreamingOutput addCouponCode(@Context SecurityContext sec, InputStream is) 
	{
		Coupon coupon = null;
		try {
			if(sec.isUserInRole("ADMIN")) {
				coupon = (Coupon)readObject(is, Coupon.class);
				AdminManager adminManager = PSLookup.getAdminManager();
				adminManager.addCoupon(coupon);
				return RestUtility.returnSuccess("Successfully added the coupon: " + coupon.getCouponCode());				
			}
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation addCouponCode :: " + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
		}		
		
		return RestUtility.returnFailure("Unable to add coupon " + coupon.getCouponCode(), "");		
	}

	@Override
	public StreamingOutput addService(@Context SecurityContext sec, InputStream is) 
	{
		Service service = null;
		try {
			if(sec.isUserInRole("ADMIN")) {
				service = (Service)readObject(is, Service.class);
				PSLookup.getAdminManager().addService(service);
				return RestUtility.returnSuccess("Successfully added the service " + service.getService());				
			}
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation addCouponCode :: " + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
		}		
		return RestUtility.returnFailure("Unable to add service " + service.getService(), "");
	}
	
	
	private Object readObject(InputStream is, Class clazz) throws ApplicationException
	{
		try {
			ObjectMapper oMapper = new ObjectMapper();
			return oMapper.readValue(is, clazz);			
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing readUser operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}		
	}

	@Override
	public StreamingOutput addEmployee(SecurityContext sec, InputStream is) 
	{
		User user = null;
		try {
			if(sec.isUserInRole("ADMIN")) {
				user = (User)readObject(is, User.class);
				PSLookup.getUserManagerBean().addInternalUser(user);
				return RestUtility.returnSuccess("Successfully added the user " + user.getName());
			}
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation addUser :: " + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
		}		
		return RestUtility.returnFailure("Unable to add user ", "");
	}

	@Override
	public StreamingOutput changeSubscriptionStatus(SecurityContext sec, InputStream is) 
	{
	
		try {
			if(sec.isUserInRole("ADMIN")) {
				SubscriptionStatusChange sStatusChange = (SubscriptionStatusChange)readObject(is, SubscriptionStatusChange.class);
				PSLookup.getUserManagerBean().changeSubscriptionStatus(sStatusChange.getEmail(), sStatusChange.getPropertyName(), sStatusChange.getSubscriptionStatus());
				return RestUtility.returnSuccess("Successfully changed the subscription status to " + sStatusChange.getSubscriptionStatus());
			}
		}
		catch(ApplicationException e) {
			String errorMsg = "Failed when performing operation changeSubscriptionStatus :: " + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);
		}
		return RestUtility.returnFailure("Unable to change Subscription Status", "");		
	}	

}
