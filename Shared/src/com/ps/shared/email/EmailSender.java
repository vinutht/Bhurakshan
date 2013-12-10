package com.ps.shared.email;

import java.util.Properties;
import java.util.UUID;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.ejb.Asynchronous;
import javax.ejb.Singleton;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.jboss.logging.Logger;

import com.ps.shared.Utility;
import com.ps.shared.dataobjects.User;
import com.ps.shared.exception.ApplicationException;


@Asynchronous
@Singleton
public class EmailSender 
{
	private static Logger logger = Logger.getLogger(EmailSender.class.getName());
		
	
	
	@Asynchronous
	public void sendEMail(final Email email)  throws ApplicationException
	{
		
		String from = "";
		String pass = "";
		
		if(!Utility.isEmpty(email.getFrom())) {
			from = email.getFrom();
			pass = Utility.decodeFromB64("U2VydmljZTgwNzg=");
		}
		else {
			from = getAddr();
			pass = getSec();
		}
		final String addr = from;
		final String key = pass;
		
		try {
			Properties props = new Properties();
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.smtp.host", "smtp.gmail.com");
			props.put("mail.smtp.port", "587");
	 
			Session session = Session.getInstance(props,
				new javax.mail.Authenticator() {		
					protected PasswordAuthentication getPasswordAuthentication() {
						return new PasswordAuthentication(addr, key);
					}
			});
	 
			try {
	 
				final Message message = new MimeMessage(session);
				message.setFrom(new InternetAddress(addr));
				message.setRecipients(Message.RecipientType.TO,
					InternetAddress.parse(email.getTo()));
				
				String cc = email.getCc();
				String bcc = email.getBcc();
				
				if(cc != null && cc.trim().length() > 0) {
					message.setRecipients(Message.RecipientType.CC,
							InternetAddress.parse(email.getCc()));
				}
				
				if(bcc != null && bcc.trim().length() > 0) {
					message.setRecipients(Message.RecipientType.BCC,
							InternetAddress.parse(email.getBcc()));					
				}																
				
				message.setSubject(email.getSubject());
				
		        /** 
		         * multipart attachments here, part one is the message text,  
		         * the other is the actual file. notice the explicit mime type  
		         * declarations 
		         *  
		         */  
		         
		  
		       /* MimeBodyPart messageText = new MimeBodyPart();  
		        messageText.setContent(email.getBodyAsText(), "text/plain");  
		        multiPart.addBodyPart(messageText);  
		  
		        MimeBodyPart report = new MimeBodyPart();  
		        report.setFileName(email.getFileName());  
		        report.setContent(email.getAttachmentAsText(), "text/xml");  
		        multiPart.addBodyPart(report);*/  
		  
		        String imagePath = email.getFilePath();
		        if(imagePath != null && imagePath.length() > 0) {
		        	Multipart multiPart = new MimeMultipart(); 
			        MimeBodyPart imgAttachment = new MimeBodyPart();  
			        FileDataSource imgFile = new FileDataSource(imagePath);  
			        imgAttachment.setDataHandler(new DataHandler(imgFile));  
			        imgAttachment.setFileName(email.getFileName());  
			        multiPart.addBodyPart(imgAttachment);  
			        
				    MimeBodyPart messageText = new MimeBodyPart();  
			        messageText.setContent(email.getBody(), "text/html");  
			        multiPart.addBodyPart(messageText); 		        
			        
			        message.setContent(multiPart); 
		        }
		        else {
		        	message.setContent(email.getBody(), "text/html" );
		        }
		          												
				Transport.send(message);			

				
			} 
			catch (Exception e) {
				String errorMsg = "Failed to send email to: "+email.getTo()+" :: " + e.getMessage();
				logger.error(errorMsg);
				throw new ApplicationException(errorMsg);		
			}
		}
		catch(Exception e) {
			
		}				
				
	}
	
	private static String getSec()
	{
		String sec = "VmluU3JpODA3OA==";
					 
		byte[] decoded = javax.xml.bind.DatatypeConverter.parseBase64Binary(sec);
		
		return new String(decoded);
	}
	
	private static String getAddr()
	{
		String addr = "YWRtaW5AYmh1cmFrc2hhbi5jb20=";
		byte[] decoded = javax.xml.bind.DatatypeConverter.parseBase64Binary(addr);
		
		return new String(decoded);		
	}
		
	

		
	
}
