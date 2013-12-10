package com.ps.restservices.passwordservice;

import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.StreamingOutput;

@Path("/password-management")
public interface ForgotPasswordService 
{
	@POST
	@Path("/forgot-password/{email}")
	public StreamingOutput forgotPassword(@PathParam("email") String email);
}
