package com.ps.platform.users.ejb;

import javax.annotation.PostConstruct;
import com.ps.shared.exception.ApplicationException;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.Startup;

import org.jboss.logging.Logger;

import com.ps.shared.interfaces.AdminManager;
import com.ps.shared.interfaces.UserManager;

@Singleton
@Startup
public class ApplicationInitializer 
{
	Logger logger = Logger.getLogger(ApplicationInitializer.class.getName());
	
	@EJB
	private UserManager userManager;
	
	
	@EJB
	private AdminManager adminManager;	
	
    @PostConstruct
    private void startup() 
    {
    	try {
    		userManager.initDB();
    		adminManager.initDB();
    	}
    	catch(ApplicationException appEx) {
    		String errorMsg = "Failed when executing startup @ ApplicationInitializer :: " + appEx.getMessage();
    		logger.error(errorMsg);    		
    	}
    	
    }	
}
