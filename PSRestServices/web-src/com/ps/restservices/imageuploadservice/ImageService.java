package com.ps.restservices.imageuploadservice;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.StreamingOutput;

import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

@Path("/images")
public interface ImageService 
{
	@POST
	@Consumes("multipart/form-data")
	public StreamingOutput uploadImage(MultipartFormDataInput input) throws WebApplicationException;
	
}
