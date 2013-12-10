package com.ps.restservices.passwordservice;

import javax.ws.rs.core.StreamingOutput;

import org.jboss.logging.Logger;

import com.ps.restservices.RestUtility;
import com.ps.shared.PSLookup;


public class ForgotPasswordServiceImpl implements ForgotPasswordService
{
	private Logger logger = Logger.getLogger(ForgotPasswordServiceImpl.class.getName());

	@Override
	public StreamingOutput forgotPassword(String email) 
	{
		try {
			PSLookup.getUserManagerBean().forgotPassword(email);
			return RestUtility.returnSuccess("Your password is sent to your email.");
		}
		catch(Exception e) {
			String errorMsg = "Failed when performing operation forgotPassword :: " + e.getMessage();
			logger.error(errorMsg);												
		}				
		return RestUtility.returnFailure("Invalid email, please make sure the email is correct.", "Email");
	}

}
