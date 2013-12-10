package com.ps.shared.dataobjects;

import java.io.Serializable;

public class Password implements Serializable 
{

	String oldPassword;
	String newPassword;
	
	public String getOldPassword() {
		return oldPassword;
	}
	
	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}
	
	public String getNewPassword() {
		return newPassword;
	}
	
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	
	
}
