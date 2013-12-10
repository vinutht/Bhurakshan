package com.ps.shared.interfaces;

import java.util.List;

import javax.ejb.Remote;

import com.ps.shared.dataobjects.GPS;
import com.ps.shared.dataobjects.ImageDate;
import com.ps.shared.dataobjects.ImageData;

@Remote
public interface ImageManager 
{
	public void saveUploadedImageData(String email, String path, String propertyName, String imageName, GPS gpsObj);
	
	public List<ImageDate> getImagesUploadedDate(String propertyName, String userEmail);
	public List<ImageData> getUploadedImageData(String propertyName, String userEmail, String month, String year);

}
