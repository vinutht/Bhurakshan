package com.ps.restservices.userservice;

import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.StreamingOutput;

@Path("/users")
public interface UserService 
{
	@POST	
	@Consumes("application/json")
	public StreamingOutput addUser(InputStream is, @Context HttpServletRequest req);
	
	@PUT	
	@Consumes("application/json")	
	public StreamingOutput modifyUser(InputStream is);	
	
	@POST
	@Path("/modify-profile")
	@Consumes("application/json")	
	public StreamingOutput modifyProfile(InputStream is);	
	
	@POST
	@Path("/change-password")
	@Consumes("application/json")	
	public StreamingOutput changePassword(InputStream is);
	
	
	@GET
	@Produces("application/json")
	@Path("/get-current-user")
	public StreamingOutput getUser();		
	
	@POST
	@Consumes("application/json")
	@Path("/properties")
	public StreamingOutput addNewProperty(InputStream is);
	
	@GET
	@Produces("application/json")
	@Path("/properties")
	public StreamingOutput getAllProperties();
	
	@GET
	@Produces("application/json")
	@Path("/get-image-dates")	
	public StreamingOutput getImagesUploadedDate(@QueryParam("property-name") String propertyName, @QueryParam("user-email") String userEmail);
	
	@GET
	@Produces("application/json")
	@Path("/images")
	public StreamingOutput getUploadedImageData(@QueryParam("property-name") String propertyName, @QueryParam("user-email") String userEmail, @QueryParam("month") String month, @QueryParam("year") String year);
	
	@POST	
	@Consumes("application/json")
	@Path("/properties/mark-property-location")
	public StreamingOutput markPropertyLocation(InputStream is);
	
	@GET
	@Produces("application/json")
	@Path("/properties/{property-name}")
	public StreamingOutput getProperty(@PathParam("property-name") String propertyName, @QueryParam("userEmail") String userEmail);

	@GET
	@Produces("application/json")
	@Path("/credits")	
	public StreamingOutput getMyCredits();
	
	@POST	
	@Consumes("application/json")
	@Path("/properties/apply-coupon-code")
	public StreamingOutput applyCouponCode(InputStream is);	
	
	
}
