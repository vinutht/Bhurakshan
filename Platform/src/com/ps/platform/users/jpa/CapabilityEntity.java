package com.ps.platform.users.jpa;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name="Capabilities")
public class CapabilityEntity
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
    
    
}
