package com.ps.restservices;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.StreamingOutput;

import com.fasterxml.jackson.databind.ObjectMapper;

public class RestUtility 
{
	public static StreamingOutput getStreamingOutput(final ReturnObject retObj)
	{
		return new StreamingOutput() {
			public void write(OutputStream outputStream) throws IOException, WebApplicationException 
			{
				PrintStream ps = new PrintStream(outputStream);
				ObjectMapper oMapper = new ObjectMapper();					
				oMapper.writeValue(ps, retObj);					
			}
		};		
	}
	
	public static StreamingOutput returnSuccess(final String msg)
	{
		return new StreamingOutput() {
			public void write(OutputStream outputStream) throws IOException, WebApplicationException 
			{
				ReturnObject retObj = new ReturnObject();
				retObj.setMsg(msg);
				retObj.setSuccess(true);
				PrintStream ps = new PrintStream(outputStream);
				ObjectMapper oMapper = new ObjectMapper();					
				oMapper.writeValue(ps, retObj);					
			}
		};
	}
	
	public static StreamingOutput returnFailure(final String msg, final String field)
	{
		return new StreamingOutput() {
			public void write(OutputStream outputStream) throws IOException, WebApplicationException 
			{
				ReturnObject retObj = new ReturnObject();
				retObj.setMsg(msg);
				retObj.setSuccess(false);
				retObj.setField(field);
				PrintStream ps = new PrintStream(outputStream);
				ObjectMapper oMapper = new ObjectMapper();					
				oMapper.writeValue(ps, retObj);					
			}
		};
	}
	
	public static StreamingOutput returnFailure(final ReturnObject retObj)
	{
		return new StreamingOutput() {
			public void write(OutputStream outputStream) throws IOException, WebApplicationException 
			{								
				PrintStream ps = new PrintStream(outputStream);
				ObjectMapper oMapper = new ObjectMapper();					
				oMapper.writeValue(ps, retObj);					
			}
		};
	}
	
}

