package com.ps.restservices.publicservice;

import java.io.InputStream;

import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.StreamingOutput;

import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ps.restservices.RestUtility;
import com.ps.shared.PSLookup;
import com.ps.shared.dataobjects.ContactUs;
import com.ps.shared.email.Email;
import com.ps.shared.exception.ApplicationException;

public class PublicServiceImpl implements PublicService
{
	private Logger logger = Logger.getLogger(PublicServiceImpl.class.getName());

	@Override
	public StreamingOutput contactUs(SecurityContext sec, InputStream is) 
	{
		try {
			ContactUs contactUs = (ContactUs)readObject(is, ContactUs.class);
			
			Email email = new Email();
			email.setTo("support@bhurakshan.com");
			email.setSubject("Contact Us: " + contactUs.getSubject() + " from " + contactUs.getName()+" ("+contactUs.getEmail()+")");
			email.setBody(contactUs.getMessage());			
			PSLookup.getEmailSender().sendEMail(email);			
			logger.info("PublicServiceImpl.contactUs: Email sent successfully!");
			
			return RestUtility.returnSuccess("An email was sent successfully. We will get in touch with you soon. Thank you.");
		}
		catch(Exception e) {
			String errorMsg = "PublicServiceImpl.contactUs: Failed when performing operation contactUs :: " + e.getMessage();
			logger.error(errorMsg);
			logger.error(e);			
		}
		return RestUtility.returnFailure("Unable to send Email ", "");
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
	
}
