package com.ps.restservices.imageuploadservice;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.StreamingOutput;

import org.apache.commons.io.IOUtils;
import org.jboss.logging.Logger;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;
import org.jboss.resteasy.plugins.providers.multipart.MultipartFormDataInput;

import com.drew.imaging.jpeg.JpegMetadataReader;
import com.drew.imaging.jpeg.JpegProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.ps.restservices.RestUtility;
import com.ps.shared.PSLookup;
import com.ps.shared.Utility;
import com.ps.shared.dataobjects.GPS;
import com.ps.shared.dataobjects.Property;
import com.ps.shared.email.EmailHelper;

public class ImageServiceImpl implements ImageService 
{
	private Logger logger = Logger.getLogger(ImageServiceImpl.class.getName());
	private static final String PROPERTY_IMAGES_FOLDER = System.getProperty("jboss.server.data.dir") + "/PropertyImages";
	private static final File imagesFolder = new File(PROPERTY_IMAGES_FOLDER);
	static {		
		if(!imagesFolder.exists()) {
			imagesFolder.mkdir();
		}
	}
	
	@SuppressWarnings("deprecation")
	@Override
	public StreamingOutput uploadImage(MultipartFormDataInput input) throws WebApplicationException 
	{
		Map<String, List<InputPart>> uploadForm = input.getFormDataMap();
		List<InputPart> imageInputParts = uploadForm.get("property-image");
		List<InputPart> customerInputParts = uploadForm.get("property-user");
		List<InputPart> propertyInputParts = uploadForm.get("property-name");
		String customerEmail = null;
		String propertyName = null;
		String date = Calendar.getInstance().get(Calendar.MONTH) + "-" + Calendar.getInstance().get(Calendar.YEAR);
		
		InputPart customerInputPart = customerInputParts.get(0);
		try {
			InputStream customerStream = customerInputPart.getBody(InputStream.class, null);
			byte [] customerBytes = IOUtils.toByteArray(customerStream);	
			customerEmail = new String(customerBytes);	
			
			if(customerEmail.length() > 0) {
				InputPart propertyInputPart = propertyInputParts.get(0);
				if(propertyInputPart != null) {
					InputStream propertyStream = propertyInputPart.getBody(InputStream.class, null);
					byte [] propertyBytes = IOUtils.toByteArray(propertyStream);	
					propertyName = new String(propertyBytes);
					
					if(propertyName.length() > 0) {
						StringBuffer sBuff = new StringBuffer(PROPERTY_IMAGES_FOLDER)
						.append("/").append(customerEmail)
						.append("/").append(propertyName)
						.append("/").append(date);
						
						String folderHierarchy = sBuff.toString();
						File directory = new File(folderHierarchy);
						directory.mkdirs();
						if(directory.exists()) {
							InputPart imageInputPart = imageInputParts.get(0);
							if(imageInputPart != null) {
												
								MultivaluedMap<String, String> header = imageInputPart.getHeaders();
								String fileName = getFileName(header);
								fileName = fileName.replaceAll("\\s", "_");
					 
								//convert the uploaded file to inputstream
								InputStream inputStream = imageInputPart.getBody(InputStream.class, null);
					 
								byte [] bytes = IOUtils.toByteArray(inputStream);
								String imageFileName = folderHierarchy + "/" + fileName;
								
								String publicFilePath = imageFileName.substring(imageFileName.indexOf("/PropertyImages"));
																										
								writeFile(bytes, imageFileName);
								
								GPS gpsObj = getGPSInfo(imageFileName, propertyName, customerEmail);
								
								PSLookup.getImageManager().saveUploadedImageData(customerEmail, publicFilePath, propertyName, fileName, gpsObj);
								
											 
								
								String webFolderPath = System.getProperty("jboss.server.base.dir")+"/deployments/PS.ear/web.war"+folderHierarchy.substring(folderHierarchy.indexOf("/PropertyImages"));
								File webFolder = new File(webFolderPath);
								if(!webFolder.exists()) {
									webFolder.mkdirs();
								}
								
								if(webFolder.exists()) {
									String webFileName = webFolderPath + "/" + fileName;
									writeFile(bytes, webFileName);
																			
									EmailHelper.sendImgAsEmail(customerEmail, propertyName, webFileName, fileName, gpsObj);
								}
								
								return RestUtility.returnSuccess("Successfully uploaded the image: " + fileName);
							}								
						}
						else {
							return RestUtility.returnFailure("The folder doesnt exists - " + folderHierarchy, "");
						}							
						
					}
				}
				
			}
		}
		catch(Exception e) {
			return RestUtility.returnFailure("Failed to upload image." + e.getMessage(), "");
		}
		return RestUtility.returnFailure("Failed to upload image.", "");
	}
	
	
	private GPS getGPSInfo(String fileName, String propertyName, String customerEmail)
	{
		File imageFile = new File(fileName);
		GPS gpsObj = new GPS();
        Metadata metadata = null;
        try {
            metadata = JpegMetadataReader.readMetadata(imageFile);
        } 
        catch (JpegProcessingException ex) {
			logger.error("Unable to process picture: " + fileName);
			logger.error(ex);            
        } 
        catch (IOException e) {			
			logger.error("Unable to read the picture: " + fileName);
			logger.error(e);			
		}
        // iterate through metadata directories
        Iterator<Directory> directories = metadata.getDirectories().iterator();
        if(directories != null) {
        	
            while (directories.hasNext()) {
                Directory directory = (Directory)directories.next();
                // iterate through tags and print to System.out
                Iterator tags = directory.getTags().iterator();
                while (tags.hasNext()) {
                    Tag tag = (Tag)tags.next();                  
                    String directoryName = tag.getDirectoryName();
                    if("Exif SubIFD".equals(directoryName)) {
                    	int tagType = tag.getTagType();
                    	String tagVal = tag.toString();
                    	switch(tagType) {
                    	case 36867:
                    		String dateStamp = tagVal.substring(tagVal.indexOf('-') + 1);
                    		gpsObj.setGpsTimeStamp(dateStamp);
                    		break;
                    	}
                    }
                    else if("GPS".equals(directoryName)) {
                    	int tagType = tag.getTagType();
                    	String tagVal = tag.toString();
                    	switch(tagType) {
                    		case 0:
                    			gpsObj.setGpsVersion(tagVal);
                    			break;
                    		case 1:
                    			gpsObj.setGpsLatitudeRef(tagVal);
                    			break;
                    		case 2:
                    			gpsObj.setGpsLatitude(tagVal);
                    			break;
                    		case 3:
                    			gpsObj.setGpsLongitudeRef(tagVal);
                    			break;
                    		case 4:
                    			gpsObj.setGpsLongitude(tagVal);
                    			break;
                    		case 5:
                    			gpsObj.setGpsAltitudeRef(tagVal);
                    			break;
                    		case 6:
                    			gpsObj.setGpsAltitude(tagVal);
                    			break;
                    		case 7:
                    			//gpsObj.setGpsTimeStamp(tagVal);
                    			break;                    		
                    		case 9:                    			
                    			break;     
                    		case 18:
                    			gpsObj.setGpsMapDatum(tagVal);
                    			break;  
                    		case 29:
                    			gpsObj.setGpsDateStamp(tagVal);
                    			break;                    			
                    	}                    	
                    }
                }
            }
            
        }
		
        try {
            Property property = PSLookup.getUserManagerBean().getProperty(propertyName, customerEmail);
            if(property != null) {
                String refLat = property.getLatitude();
                String refLongi = property.getLongitude();
                
                if(!Utility.isEmpty(refLongi) && !Utility.isEmpty(refLat)) {
                	gpsObj.setGpsLatitudeRef(refLat);
                	gpsObj.setGpsLongitudeRef(refLongi);
                }
                	
            }
        	
        }
        catch(Exception e) {
        	logger.error(e.getMessage());
        }

        return gpsObj;
	}
	
	

		
	/**
	 * header sample
	 * {
	 * 	Content-Type=[image/png], 
	 * 	Content-Disposition=[form-data; name="file"; filename="filename.extension"]
	 * }
	 **/
	//get uploaded filename
	private String getFileName(MultivaluedMap<String, String> header) 
	{
		String[] contentDisposition = header.getFirst("Content-Disposition").split(";");
		for (String filename : contentDisposition) {
			if ((filename.trim().startsWith("filename"))) {
				String[] name = filename.split("="); 
				String finalFileName = name[1].trim().replaceAll("\"", "");
				return finalFileName;
			}
		}
		return "unknown";
	}
	
	private void writeFile(byte[] content, String filename) throws IOException 
	{				 
		File file = new File(filename); 
		if (!file.exists()) {
			file.createNewFile();
		}
		FileOutputStream fop = new FileOutputStream(file);
		fop.write(content);
		fop.flush();
		fop.close();
	}	

}
