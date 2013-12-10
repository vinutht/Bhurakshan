package com.ps.platform.users.jpa;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.ps.shared.Constants.SERVICES;
import com.ps.shared.jpa.PlatformEntity;

@Entity
@Table(name="Services")
public class ServiceEntity extends PlatformEntity
{
	private SERVICES service;
	private Integer amount;
	private int amountInRs;
	
	public int getAmountInRs() {
		return amountInRs;
	}
	public void setAmountInRs(int amountInRs) {
		this.amountInRs = amountInRs;
	}
		
	
	public SERVICES getService() {
		return service;
	}
	public void setService(SERVICES service) {
		this.service = service;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	
}
