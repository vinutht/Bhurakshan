package com.ps.platform.users.ejb;

import com.drew.imaging.jpeg.JpegMetadataReader;
import com.drew.imaging.jpeg.JpegProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import java.io.File;
import java.util.Iterator;

public class ImagePropertyViewer 
{
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception {
        File jpegFile = new File("/home/vinutht/Vinuth/Lattitude.jpg");
        Metadata metadata = null;
        try {
            metadata = JpegMetadataReader.readMetadata(jpegFile);
        } catch (JpegProcessingException ex) {
            ex.printStackTrace();
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
                    // use Tag.toString()
                    System.out.println("DirectoryName: " + tag.getDirectoryName());
                    System.out.println("TagName: " + tag.getTagName());
                    System.out.println(tag.getTagType());
                    System.out.println(tag.toString());                    
                    System.out.println(">>>>>>>>>");
                    System.out.println();
                    System.out.println();
                    
                    /**
                     * 
DirectoryName: GPS
TagName: GPS Version ID
0
[GPS] GPS Version ID - 2.200
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Latitude Ref
1
[GPS] GPS Latitude Ref - N
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Latitude
2
[GPS] GPS Latitude - 12.0° 59.0' 17.656999999993985"
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Longitude Ref
3
[GPS] GPS Longitude Ref - E
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Longitude
4
[GPS] GPS Longitude - 77.0° 31.0' 39.40200000002051"
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Altitude Ref
5
[GPS] GPS Altitude Ref - Sea level
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Altitude
6
[GPS] GPS Altitude - 854400 metres
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Time-Stamp
7
[GPS] GPS Time-Stamp - 15:43:43 UTC
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Status
9
[GPS] GPS Status - Active (Measurement in progress)
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Map Datum
18
[GPS] GPS Map Datum - WGS-84
>>>>>>>>>


DirectoryName: GPS
TagName: GPS Date Stamp
29
[GPS] GPS Date Stamp - 2012:08:26
>>>>>>>>>
                     * 
                     * */
                }
            }
        }
       
    }

}
