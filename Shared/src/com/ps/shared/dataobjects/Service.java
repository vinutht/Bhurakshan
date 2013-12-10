package com.ps.shared.dataobjects;

import java.io.Serializable;

import com.ps.shared.Constants.SERVICES;

public class Service implements Serializable
{
	private SERVICES service;
	private int amount;
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
	public void setServices(SERVICES service) {
		this.service = service;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
}
