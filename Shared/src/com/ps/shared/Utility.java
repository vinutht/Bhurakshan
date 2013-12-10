package com.ps.shared;

public class Utility 
{
	public static boolean isEmpty(String str) 
	{
		return (str == null || str.trim().length() == 0)?true:false;
	}
	
	public static String encodeToB64(String str)
	{
		return javax.xml.bind.DatatypeConverter.printBase64Binary(str.getBytes());
	}
	
	public static String decodeFromB64(String str)
	{
		return new String(javax.xml.bind.DatatypeConverter.parseBase64Binary(str));
	}
}
