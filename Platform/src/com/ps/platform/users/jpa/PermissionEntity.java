package com.ps.platform.users.jpa;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="Permissions")
public class PermissionEntity 
{
    private int id;

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    private String name;

    @Basic
	public String getName() 
	{
		return name;
	}

	public void setName(String name) 
	{
		this.name = name;
	} 
	
	private CapabilityEntity capability;

	@OneToOne
	public CapabilityEntity getCapability() 
	{
		return capability;
	}

	public void setCapability(CapabilityEntity capability) 
	{
		this.capability = capability;
	}
	
	private String description;

	@Basic
	public String getDescription() 
	{
		return description;
	}

	public void setDescription(String description) 
	{
		this.description = description;
	}
	
	
		
}
