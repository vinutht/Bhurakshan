package com.ps.restservices.adminservice;

import java.io.InputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.UriInfo;

@Path("/admin")
public interface AdminService 
{
	@GET
	@Path("/users")
	@Produces("application/json")	
	public StreamingOutput getAllUsers(@Context SecurityContext sec, @Context UriInfo uriInfo);
	
	@POST
	@Path("/users")
	@Consumes("application/json")	
	public StreamingOutput addEmployee(@Context SecurityContext sec, InputStream is);	
	
	@GET
	@Path("/users/{email}/properties")
	@Produces("application/json")	
	public StreamingOutput getProperties(@PathParam("email") String userEmail);
	
	@POST
	@Path("/coupons")
	@Consumes("application/json")
	public StreamingOutput addCouponCode(@Context SecurityContext sec, InputStream is);
	
	@POST
	@Path("/services")
	@Consumes("application/json")
	public StreamingOutput addService(@Context SecurityContext sec, InputStream is);	
	
	@POST	
	@Consumes("application/json")
	@Path("/users/change-subscription-status")	
	public StreamingOutput changeSubscriptionStatus(@Context SecurityContext sec, InputStream is);	
}
