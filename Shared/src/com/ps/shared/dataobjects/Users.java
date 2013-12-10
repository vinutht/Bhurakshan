package com.ps.shared.dataobjects;

import java.io.Serializable;
import java.util.Collection;


public class Users implements Serializable
{
	private Long total = 0L;
	Collection<User> users;

	public Collection<User> getUsers() 
	{
		return users;
	}

	public void setUsers(Collection<User> users) 
	{
		this.users = users;
	}
	
	public Long getTotal() {
		return total;
	}

	public void setTotal(Long total) {
		this.total = total;
	}	
	
}
