import java.io.*;
import java.util.*;

public class CombineJsCss {
  public static File baseDir;
  private static File jsPropertiesDir;
  private static File cssPropertiesDir;
  private static String combinedFilesOutputDir;
  public static BufferedWriter jsLoaderFile;
  private static final String LIST_EXT = ".properties";

  private static void log(String msg) {
    System.out.println("CombineJsCss: " + msg);
  }

  public static void main(String[] args) throws Exception {
    log("Start");
    if (args == null || args.length < 3) { 
      throw new Exception("Insufficient number of arguments!");
    }
    
    baseDir = new File(args[0]);
    log("Base Dir: " + baseDir.getAbsolutePath());
    jsPropertiesDir = new File(args[1]);
    log("JS Properties Dir: " + jsPropertiesDir.getAbsolutePath());

    cssPropertiesDir = new File(args[2]);
    log("CSS Properties Dir: " + cssPropertiesDir.getAbsolutePath());
    combinedFilesOutputDir = args[3];
    log("Combined Files Output Dir: " + combinedFilesOutputDir);
    jsLoaderFile = new BufferedWriter(new FileWriter(
          args[3] + "/js/smJsLoader.js"));

    File jsFiles[] = jsPropertiesDir.listFiles();
    for(File file: jsFiles) {
      createCombinedFile(file, "js");
    }

    File cssFiles[] = cssPropertiesDir.listFiles();
    for(File file: cssFiles) {
      createCombinedFile(file, "css");
    }
    jsLoaderFile.flush();
    jsLoaderFile.close();
  }

  public static StringBuffer generateScriptLoaderJs(String fName, 
      String combined_min_file, String jsOrCss) {
    StringBuffer buffer = new StringBuffer();
    buffer.append("// ********* SYSTEM GENERATED JAVASCRIPT CODE ********** \n\n");
    buffer.append("Juniper.space.sm.load_" + fName+"_"+jsOrCss+" = function() {\n"+
        "\tvar includeFiles = [];\n"+
        "\tif(!Juniper.space.sm.DEBUG) {\n"+
        "\t\tincludeFiles.push([\"" + jsOrCss + "\", \"/web/combined/" + combined_min_file + "\"]);\n"+
        "\t}else {\n"
        );
    return buffer;
  }

  public static void createCombinedFile(File propertiesFile, String jsOrCss) 
    throws IOException {
      String propertyFileName = propertiesFile.getName();
      // Ignore other types of file
      if (!propertyFileName.endsWith(LIST_EXT)) {
        return;
      }
      int index = propertyFileName.length() - LIST_EXT.length() + 1;
      FileInputStream jsIs = new FileInputStream(propertiesFile);
      String fnm = propertyFileName.substring(0, index-1);
      String minifiedFileName = fnm + "-combined." + jsOrCss;
      String combinedFileName = fnm + "-combined-raw." + jsOrCss;
      File newCombinedFile = new File(combinedFilesOutputDir + 
          "/" + jsOrCss + "/" + combinedFileName);
      log("Creating " + newCombinedFile.getAbsolutePath() + " from " + propertyFileName);
      StringBuffer scriptFileBuffer = 
        generateScriptLoaderJs(fnm, minifiedFileName, jsOrCss);
      boolean isNew = newCombinedFile.createNewFile();
      PrintWriter pw = new PrintWriter(new FileOutputStream(newCombinedFile));

      BufferedReader reader = new BufferedReader(new InputStreamReader(jsIs));
      String line;
      while((line = reader.readLine()) != null)  {
        line = line.trim();
        if (!(line.equals("") || line.charAt(0) == '#')) {
          printJsFile(pw, line, scriptFileBuffer, jsOrCss);
        }
      }

      pw.flush();
      pw.close();
      scriptFileBuffer.append("\t}\n");
      scriptFileBuffer.append("\treturn includeFiles;\n");
      scriptFileBuffer.append("}");
      jsLoaderFile.write(scriptFileBuffer.toString()+"\n\n");
  }


  // Convert an array of strings to one string.
  // Put the 'separator' string between each element.
  public static String arrayToString(String[] a, String separator) {
      StringBuffer result = new StringBuffer();
      if (a.length > 0) {
          result.append(a[0]);
          for (int i=1; i<a.length; i++) {
              result.append(separator);
              result.append(a[i]);
          }
      }
      return result.toString();
  }

  public static void jsLint(File jsFile) {
    //TODO
  }

  public static void printJsFile(PrintWriter pw, String jsFile, StringBuffer scriptFileBuffer, String jsOrCss) 
      throws IOException {
    String paths[] = jsFile.split("/");
    if(paths.length>3 && paths[2].equals("web")) {
      paths[2] = "";
    }
    String jsFilePathInEar = arrayToString(paths, "/");
    log("Processing " + jsFilePathInEar);
    jsFilePathInEar = jsFilePathInEar.substring(1).replaceAll("//","/");

    scriptFileBuffer.append("\t\tincludeFiles.push([\""+jsOrCss+"\",\""+jsFilePathInEar+"\"]);\n");
    log("Processing " + jsFile + "... ");
    File jsFileFile = new File(baseDir, jsFile);
    if ("js".equals(jsOrCss)) {
      jsLint(jsFileFile);
    }
    BufferedReader br = new BufferedReader(new FileReader(jsFileFile));
    String line = br.readLine();
    while (line != null) {
      pw.println(line);
      line = br.readLine();
    }
    br.close();
  }
}

