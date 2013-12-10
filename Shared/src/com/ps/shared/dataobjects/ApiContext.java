package com.ps.shared.dataobjects;

import java.io.Serializable;

public class ApiContext implements Serializable
{
	private int start;
	private int limit;
	private String searchFilter;
	private boolean initialize = false;		
	
	public boolean isInitialize() {
		return initialize;
	}
	public void setInitialize(boolean initialize) {
		this.initialize = initialize;
	}
	public int getStart() {
		return start;
	}
	public void setStart(int start) {
		this.start = start;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}
	public String getSearchFilter() {
		return searchFilter;
	}
	public void setSearchFilter(String searchFilter) {
		this.searchFilter = searchFilter;
	}
	
}
