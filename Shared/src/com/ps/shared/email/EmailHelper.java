package com.ps.shared.email;

import java.util.Date;

import org.jboss.logging.Logger;

import com.ps.shared.PSLookup;
import com.ps.shared.dataobjects.GPS;
import com.ps.shared.dataobjects.Property;
import com.ps.shared.dataobjects.User;
import com.ps.shared.exception.ApplicationException;

public class EmailHelper 
{
	
	private static Logger logger = Logger.getLogger(EmailHelper.class.getName());

	
/**
 * 
 * Dear Mr….. 

Greetings from Bhurakshan, 

YOUR NEW PROPERTY IS SUCCESSFULLY ADDED. 

Dear customer thanks for choosing Bhurakshan again to safeguard your property. In this regard we value your action of adding another property to your account. Please find below the details of your new account -  
UserName: srivathsas@gmail.com

Property Details

PropertyName: p1
PropertyAddress: asdf
ServiceType: PROPERTY_MONITOR
ServiceDescription: Not available
Frequency: QUATERLY
Latitude: Not available
Longitude: Not available

We foresee to provide you best of the services. 

Thanking you, 
Bhurakshan Team 


 * */	
	public static void sendNewPropertyAlertEmail(User user, Property property) throws ApplicationException
	{
		
		StringBuilder body = new StringBuilder();			
		body.append("Dear "+ user.getName())
		.append("<BR>")
		.append("Greetings from Bhurakshan, ")
		.append("<BR>")
		.append("<H3>YOUR NEW PROPERTY IS SUCCESSFULLY ADDED.</H3>")
		.append("<BR>")
		.append("<BR>")
		.append("Dear customer thanks for choosing Bhurakshan again to safeguard your property.")
		.append("<BR>")
		.append("In this regard we value your action of adding another property to your account.")
		.append("<BR>")
		.append("Please find below the details of your new account")
		.append("<BR>")
		.append("<BR>")
		.append("<B>UserName: </B>").append(user.getEmail())			
		.append("<BR><BR>")
		.append("Property Details")
		.append("<BR><BR>")
		.append("<B>PropertyName: </B>").append(property.getPropertyName())
		.append("<BR>")
		.append("<B>PropertyAddress: </B>").append(property.getPropertyAddress())
		.append("<BR>")
		.append("<B>ServiceType: </B>").append(property.getServiceType())
		.append("<BR>")
		.append("<B>ServiceDescription: </B>").append(checkForEmpty(property.getOtherServiceDescription(), "Not available"))
		.append("<BR>")
		.append("<B>Frequency: </B>").append(property.getFrequency())
		.append("<BR>")
		.append("<B>Latitude: </B>").append(checkForEmpty(property.getLatitude(), "Not available"))
		.append("<BR>")
		.append("<B>Longitude: </B>").append(checkForEmpty(property.getLongitude(), "Not available"))
		.append("<BR>")
		.append("<BR>")
		.append("We foresee to provide you best of the services.")
		.append("<BR>")
		.append("Thank you and have a great day!")
		.append("<BR>")
		.append("Your's Sincerely,")
		.append("<BR>")
		.append("The Bhurakshan Team.");
		
		Email email = new Email();
		email.setTo(user.getEmail());
		//email.setFrom("service@bhurakshan.com");
		//email.setCc("admin@bhurakshan.com");
		email.setSubject("Bhurakshan New Property Alert: Thank you!");
		email.setBody(body.toString());
		
		PSLookup.getEmailSender().sendEMail(email);								
		
	}
	
	public static void sendSubscriptionActiveEmail(User user, Property property) throws ApplicationException
	{
		
		StringBuilder body = new StringBuilder();			
		body.append("Dear "+ user.getName())
		.append("<BR>")
		.append("Greetings from Bhurakshan, ")
		.append("<BR>")
		.append("<H3>YOUR SUBSCRIPTION IS ACTIVE NOW.</H3>")
		.append("<BR>")
		.append("<BR>")
		.append("Dear customer thanks for choosing Bhurakshan again to safeguard your property.")
		.append("<BR>")
		.append("We will start the work on your subscription immediately. We might contact you regarding this.")
		.append("<BR>")			
		.append("<BR>")
		.append("Please find the details of your subscription below: ")
		.append("<BR>")			
		.append("<BR><BR>")
		.append("Property Details")
		.append("<BR><BR>")
		.append("<B>PropertyName: </B>").append(property.getPropertyName())
		.append("<BR>")
		.append("<B>PropertyAddress: </B>").append(property.getPropertyAddress())
		.append("<BR>")
		.append("<B>ServiceType: </B>").append(property.getServiceType())
		.append("<BR>")
		.append("<B>ServiceDescription: </B>").append(checkForEmpty(property.getOtherServiceDescription(), "Not available"))
		.append("<BR>")
		.append("<B>Frequency: </B>").append(property.getFrequency())
		.append("<BR>")
		.append("<BR>")
		.append("We foresee to provide you best of the services.")
		.append("<BR>")
		.append("Thank you and have a great day!")
		.append("<BR>")
		.append("Your's Sincerely,")
		.append("<BR>")
		.append("The Bhurakshan Team.");
		
		Email email = new Email();
		email.setTo(user.getEmail());
		//email.setFrom("service@bhurakshan.com");
		//email.setCc("admin@bhurakshan.com");
		email.setSubject("Bhurakshan: Subscription is Active now, thank you!");
		email.setBody(body.toString());
		
		PSLookup.getEmailSender().sendEMail(email);								
		
	}	
	
	/**
	 * 
	 * Dear Mr….. 

Greetings from Bhurakshan, 

YOUR PROPERTY DETAILS ARE SUCCESSFULLY MODIFIED.  

Dear customer thanks for changing the location of your property. The changes you made has been successfully updated in our records. Please find below the details of your changed account -  

PropertyName: p2
ChangedLatitude: 12.984044194222689
ChangedLongitude: 77.53120422363281

We assume the above changes are right. In case of any change please logon to the website and modify or get in touch with our customer care. 

We foresee to provide you best of the services. 

Thanking you, 
Bhurakshan Team
	 * */
	public static void sendPropertyLocationChange(String propertyName, String lat, String longi, String emailAddr) throws ApplicationException
	{
		StringBuilder body = new StringBuilder();
		body.append("Dear "+ emailAddr)
		.append("<BR>")
		.append("Greetings from Bhurakshan, ")
		.append("<BR>")
		.append("<H3>YOUR PROPERTY DETAILS ARE SUCCESSFULLY MODIFIED.</H3>")
		.append("<BR>")
		.append("<BR>")
		.append("Dear customer thanks for changing the location of your property")
		.append("<BR>")
		.append("The changes you made has been successfully updated in our records.")	
		.append("<BR>")
		.append("Please find below the details of your changed account -")		
		.append("<BR>")
		.append("<BR>")
		.append("PropertyName: "+propertyName)
		.append("<BR>")
		.append("ChangedLatitude: " + lat)
		.append("<BR>")
		.append("ChangedLongitude: " + longi)
		.append("<BR><BR>")		
		.append("We assume the above changes are right. In case of any change please logon to the website and modify or get in touch with our customer care.")
		.append("<BR>")
		.append("We foresee to provide you best of the services.")
		.append("<BR><BR>")		
		.append("Thank you and have a great day!")
		.append("<BR>")
		.append("Your's Sincerely,")
		.append("<BR>")
		.append("The Bhurakshan Team.");
		
		Email email = new Email();
		email.setTo(emailAddr);
		//email.setCc("admin@bhurakshan.com");
		email.setSubject("Bhurakshan: Location change notification for the property - " + propertyName);
		email.setBody(body.toString());
		
		PSLookup.getEmailSender().sendEMail(email);								
		
	}
	
	
	public static void sendImgAsEmail(String emailId, String propertyName, String filePath, String fileName, GPS gpsObj)
	{
		
		Date date = new Date();
		String gpsLatitudeRef = gpsObj.getGpsLatitudeRef();
		String gpsLatitude = gpsObj.getGpsLatitude();
		String gpsLongitude = gpsObj.getGpsLongitude();
		String gpsLongitudeRef = gpsObj.getGpsLongitudeRef();
		
		
		StringBuilder body = new StringBuilder();		
		body.append("<H3>Property Picture</H3>")
		.append("<BR>")
		.append("Hi, please find attached the property picture dated - " + date.toString())
		.append("<BR><BR>")
		.append("These are the other details - ")
		.append("<BR>")
		.append("<B>Latitude: </B>").append((gpsLatitude!=null)?gpsLatitude:"Not Available")			
		.append("<BR>")
		.append("<B>Reference Latitude: </B>").append((gpsLatitudeRef!=null)?gpsLatitudeRef:"Not Available")			
		.append("<BR>")		
		.append("<B>Longitude: </B>").append((gpsLongitude!=null)?gpsLongitude:"Not Available")
		.append("<BR>")		
		.append("<B>Reference Longitude: </B>").append((gpsLongitudeRef!=null)?gpsLongitudeRef:"Not Available")		
		.append("<BR><BR>")
		.append("Thank you and have a great day!")
		.append("<BR>")
		.append("Your's Sincerely,")
		.append("<BR>")
		.append("The Bhurakshan Team.");
		
		Email email = new Email();
		email.setTo(emailId);
		email.setSubject("Bhurakshan: Property Picture of the property " + propertyName + ", dated " + date.toString());
		email.setBody(body.toString());
		email.setFrom("service@bhurakshan.com");
		email.setFileName(fileName);
		email.setFilePath(filePath);
		
		try {
			PSLookup.getEmailSender().sendEMail(email);			
		}
		catch(Exception e) {
			logger.error("Unable to send email of the picture: " + filePath);
			logger.error(e);
		}				
				
	}
		
	public static void sendPasswordViaEmail(String email, String name, String password) throws ApplicationException
	{
		try {
			StringBuilder body = new StringBuilder();
			body.append("Dear ").append(name).append(", ")
			.append("<BR><BR>")		
			.append("Greetings from Bhurakshan, ")
			.append("<BR>")			
			.append("This is your password to login into the system - <B>").append(password).append("</B>")
			.append("<BR><BR>")
			.append("Thank you for choosing Bhurakshan. Have a great day!")
			.append("<BR>")
			.append("Your's Sincerely,")
			.append("<BR>")
			.append("The Bhurakshan Team.");
			
			Email emailObj = new Email();				
			emailObj.setBody(body.toString());
			emailObj.setSubject("Bhurakshan: Forgot Password Request");
			emailObj.setTo(email);
			
			PSLookup.getEmailSender().sendEMail(emailObj);
				
		}		
		catch(Exception e) {
			String errorMsg = "Failed when executing forgotPassword Operation for email "+email+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
			throw new ApplicationException(errorMsg);
		}		
	}
		/**
		 * Dear (CustomerName) –

Thanks for joining hands with us to secure your property assets. We ensure to support you in everystep to keep your property monitored and maintained. Welcome to our family!

Bhurakshan offers you a dynamic tool to avail our services. As you are NOW a registered user we provide you access to our portal. On this portal you can see your property images, time and date details of when the photo clicked, your selected subscription package details, renew options, etc…

To visit our webportal and login click here -   http://www.bhurakshan.com 


Your 
UserName  - srivathsas@gmail.com
Password – MOTrEPai
(You can change the password when you login for the first time) 

In case of any further details please feel free to contact us. 
		 * */
	public static void sendRegistrationConfirmationEmail(User user) throws ApplicationException
	{
		
		StringBuilder body = new StringBuilder();		
		body.append("<H3>Welcome to our family!</H3>")
		.append("<BR>")
		.append("Dear ").append(user.getName())	
		.append("<BR><BR>")
		.append("Thanks for joining hands with us to secure your property assets. We ensure to support you in everystep to keep your property monitored and maintained. Welcome to our family! ")
		.append("<BR>")
		.append("Bhurakshan offers you a dynamic tool to avail our services. As you are NOW a registered user we provide you access to our portal. <BR>On this portal you can see your property images, time and date details of when the photo clicked, your selected subscription package details, renew options, etc")
		.append("<BR>")
		.append("<BR>")
		.append("To visit our webportal and login click here -  <a href='http://www.bhurakshan.com'>Bhurakshan</a>")
		.append("<BR><BR>Your credentials are as follows: <BR>")
		.append("<B>UserName: </B>").append(user.getEmail())			
		.append("<BR>")
		.append("<B>Password: </B>").append(user.getPassword())
		.append("<BR>(You can change the password when you login for the first time) <BR> <BR>")
		.append("Once you login, we will guide you through the rest of the process.")
		.append("<BR>")
		.append("<BR>")
		.append("In case of any further details please feel free to contact us. Please give us a call at <B>+91 98453 33211</B> or write to us at <B>support@bhurakshan.com</B>")
		.append("<BR><BR>")
		.append("Thank you and have a great day!")
		.append("<BR>")
		.append("Your's Sincerely,")
		.append("<BR>")
		.append("The Bhurakshan Team.");
		
		Email email = new Email();
		email.setTo(user.getEmail());
		email.setSubject("Thank you and welcome to Bhurakshan!");
		email.setBody(body.toString());
		PSLookup.getEmailSender().sendEMail(email);
	}	
	
	private static String checkForEmpty(String str, String defaultValue)
	{
		if(str == null || str.trim().length() == 0) {
			return defaultValue;
		}
		return "";
	}
	
	
}
