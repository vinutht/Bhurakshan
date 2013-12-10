package com.ps.shared.interfaces;

import com.ps.shared.exception.ApplicationException;

public interface DatabaseInitializer 
{
	public void initDB() throws ApplicationException;
}
