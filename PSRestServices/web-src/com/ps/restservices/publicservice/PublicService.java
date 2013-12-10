package com.ps.restservices.publicservice;

import java.io.InputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.StreamingOutput;

@Path("/public-services")
public interface PublicService 
{
	@POST
	@Path("/contact-us")
	@Consumes("application/json")	
	public StreamingOutput contactUs(@Context SecurityContext sec, InputStream is);	
	
}
