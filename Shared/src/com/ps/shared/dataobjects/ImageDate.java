package com.ps.shared.dataobjects;

import java.io.Serializable;

public class ImageDate implements Serializable
{
	private String month;
	private String year;
	private int id;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		month = Integer.parseInt(month) + 1 + "";
		
		if("01".equals(month) || "1".equals(month)) {
			this.month = "Jan";
		}
		else if("02".equals(month) || "2".equals(month)) {
			this.month = "Feb";
		}
		else if("03".equals(month) || "3".equals(month)) {
			this.month = "Mar";
		}		
		else if("04".equals(month) || "4".equals(month)) {
			this.month = "Apr";
		}		
		else if("05".equals(month) || "5".equals(month)) {
			this.month = "May";
		}		
		else if("06".equals(month) || "6".equals(month)) {
			this.month = "Jun";
		}		
		else if("07".equals(month) || "7".equals(month)) {
			this.month = "Jul";
		}		
		else if("08".equals(month) || "8".equals(month)) {
			this.month = "Aug";
		}		
		else if("09".equals(month) || "9".equals(month)) {
			this.month = "Sep";
		}		
		else if("10".equals(month)) {
			this.month = "Oct";
		}		
		else if("11".equals(month)) {
			this.month = "Nov";
		}		
		else if("12".equals(month)) {
			this.month = "Dec";
		}				
		
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	
	
}
