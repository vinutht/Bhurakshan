package com.ps.restservices;

import java.sql.Timestamp;
import java.util.Date;

public class ReturnObject 
{
	private boolean success;
	private String msg;
	private String time;
	private String field;
	
	public ReturnObject()
	{
		Date date = new Date();
		Timestamp timestamp = new Timestamp(date.getTime());
		time = timestamp.toString();
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}			

}
