package com.ps.web.security;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class RedirectServlet extends HttpServlet 
{
	
	protected void service(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws ServletException, IOException 
	{
	    final String svlpath = httpServletRequest.getServletPath();
	    final HttpSession s = httpServletRequest.getSession();
	    boolean isLogout = false;
	    
	    if ("/unsecured/logout".equals(svlpath)) {	    	
	        if (s != null) {
	          s.invalidate();
	          isLogout = true;
	        }
	    }	
	    redirectToLogin(httpServletRequest, httpServletResponse, isLogout);	    
	}
	
	private void redirectToLogin(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, boolean isLogout) throws IOException, ServletException 
	{
		String pageName = (isLogout ? "" : "/Login.html");
		RequestDispatcher dispatcher = this.getServletContext().getContext("/home").getRequestDispatcher(pageName);
		if (dispatcher != null) {
			httpServletResponse.setContentType("text/html");
			dispatcher.include(httpServletRequest, httpServletResponse);
		}		
	}
}
