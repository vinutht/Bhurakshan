package com.ps.shared;

import javax.naming.InitialContext;

import org.jboss.logging.Logger;

import com.ps.shared.email.EmailSender;
import com.ps.shared.exception.ApplicationException;
import com.ps.shared.interfaces.AdminManager;
import com.ps.shared.interfaces.ImageManager;
import com.ps.shared.interfaces.UserManager;

public class PSLookup 
{
	private static Logger logger = Logger.getLogger(PSLookup.class.getName());
	
	public static UserManager getUserManagerBean() throws ApplicationException
	{
		try {
			InitialContext ic = new InitialContext();
			UserManager userManager = (UserManager)ic.lookup("java:global/PS/Platform/UserManagerBean!com.ps.shared.interfaces.UserManager");
			return userManager;			
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing getUserManagerBean operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);			
		}
	}
	
	public static AdminManager getAdminManager() throws ApplicationException
	{
		try {
			InitialContext ic = new InitialContext();
			AdminManager adminManager = (AdminManager)ic.lookup("java:global/PS/Platform/AdminManagerBean!com.ps.shared.interfaces.AdminManager");
			return adminManager;				
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing getAdminManager operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}
	}
	
	public static ImageManager getImageManager() throws ApplicationException
	{
		try {
			InitialContext ic = new InitialContext();
			ImageManager uploadedImagesManager = (ImageManager)ic.lookup("java:global/PS/Platform/ImageManagerBean!com.ps.shared.interfaces.ImageManager");
			return uploadedImagesManager;			
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing getUploadedImagesBean operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);			
		}
	}	
	
	public static EmailSender getEmailSender() throws ApplicationException
	{
		try {
			InitialContext ic = new InitialContext();
			EmailSender emailSender = (EmailSender)ic.lookup("java:global/PS/Shared/EmailSender");
			return emailSender;			
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing getUserManagerBean operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);			
		}
	}	
		
}

