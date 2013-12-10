package com.ps.shared.dataobjects;

import java.io.Serializable;
import java.util.Collection;


public class Properties implements Serializable
{
	private Collection<Property> properties;

	public Collection<Property> getProperties() {
		return properties;
	}

	public void setProperties(Collection<Property> properties) {
		this.properties = properties;
	}
	
	
}
