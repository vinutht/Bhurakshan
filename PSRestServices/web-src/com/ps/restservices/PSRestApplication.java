package com.ps.restservices;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;

import com.ps.restservices.passwordservice.ForgotPasswordServiceImpl;
import com.ps.restservices.publicservice.PublicServiceImpl;
import com.ps.restservices.userservice.UserServiceImpl;
import com.ps.restservices.adminservice.AdminServiceImpl;
import com.ps.restservices.imageuploadservice.ImageServiceImpl;

public class PSRestApplication extends Application 
{
	private Set<Object> singletons = new HashSet<Object>();
	private Set<Class<?>> empty = new HashSet<Class<?>>();
	
	public PSRestApplication() 
	{
		singletons.add(new AdminServiceImpl());
		singletons.add(new UserServiceImpl());
		singletons.add(new ImageServiceImpl());
		singletons.add(new ForgotPasswordServiceImpl());
		singletons.add(new PublicServiceImpl());
	}
	
	@Override
	public Set<Class<?>> getClasses() 
	{
		return empty;
	}
	
	@Override
	public Set<Object> getSingletons() 
	{
		return singletons;
	}
	

}
