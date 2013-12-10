package com.ps.shared.email;

public class Email 
{
	private String to;
	private String subject;
	private String body;
	private String filePath;
	private String fileName;
	private String cc;
	private String bcc;
	private String from;
	
	
		
	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getCc() {
		return cc;
	}

	public void setCc(String cc) {
		this.cc = cc;
	}

	public String getBcc() {
		return bcc;
	}

	public void setBcc(String bcc) {
		this.bcc = bcc;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getTo() {
		return to;
	}
	
	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public void setTo(String to) {
		this.to = to;
	}
	
	public String getSubject() {
		return subject;
	}
	
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	public String getBody() {
		return body;
	}
	
	public void setBody(String body) {
		this.body = body;
	}
	
	
}
