// Java JSP
 
<%@ page import="java.util.*"%>
<%@ page import="java.net.*"%>
<%@ page import="javax.net.ssl.*"%>
<%@ page import="java.io.*"%>
<%@ page import="org.jboss.logging.Logger" %>
 
<%
	Logger logger = Logger.getLogger("");
	// read post from PayPal system and add 'cmd'
	Enumeration en = request.getParameterNames();
	StringBuffer strBuffer = new StringBuffer("cmd=_notify-validate");
	String paramName;
	String paramValue;
	while (en.hasMoreElements()) {
		paramName = (String) en.nextElement();
		paramValue = request.getParameter(paramName);
		strBuffer.append("&").append(paramName).append("=")
				.append(URLEncoder.encode(paramValue));
	}
 
	logger.error("PAYPAL: "+strBuffer.toString());
	// post back to PayPal system to validate
	// NOTE: change http: to https: in the following URL to verify using SSL (for increased security).
	// using HTTPS requires either Java 1.4 or greater, or Java Secure Socket Extension (JSSE)
	// and configured for older versions.
	URL u = new URL("https://www.paypal.com/cgi-bin/webscr");
	HttpsURLConnection uc = (HttpsURLConnection) u.openConnection();
	uc.setDoOutput(true);
	uc.setRequestProperty("Content-Type",
			"application/x-www-form-urlencoded");
	uc.setRequestProperty("Host", "www.paypal.com");
	PrintWriter pw = new PrintWriter(uc.getOutputStream());
	pw.println(strBuffer.toString());
	pw.close();
 
	BufferedReader in = new BufferedReader(new InputStreamReader(
			uc.getInputStream()));
	String res = in.readLine();
	in.close();
 
	// assign posted variables to local variables
	String itemName = request.getParameter("item_name");
	String itemNumber = request.getParameter("item_number");
	String paymentStatus = request.getParameter("payment_status");
	String paymentAmount = request.getParameter("mc_gross");
	String paymentCurrency = request.getParameter("mc_currency");
	String txnId = request.getParameter("txn_id");
	String receiverEmail = request.getParameter("receiver_email");
	String payerEmail = request.getParameter("payer_email");
	
	try {
		
	
	String jbFolder = System.getProperty("jboss.server.data.dir") + "/IPN";
	File ipnFolder = new File(jbFolder);
	if(!ipnFolder.exists()) {
		ipnFolder.mkdir();
	}
	
	String fileName = jbFolder+"/"+Calendar.getInstance().getTimeInMillis();
	File file = new File(fileName);
	if(!file.exists()) {		
		file.createNewFile();
	}
	
	FileOutputStream fos = new FileOutputStream(fileName);
	
 
	// check notification validation
	if (res.equals("VERIFIED")) {
		/*logger.error("VERIFIED" + itemNumber);
		out.println("Item Name: "+itemName);
		out.println("Item Number: "+itemNumber);
		out.println("Payment Status: "+paymentStatus);
		out.println("Payment Amount: "+paymentAmount);
		out.println("Payment Currency: "+paymentCurrency);
		out.println("Transaction ID: "+txnId);
		out.println("Receiver Email: "+receiverEmail);
		out.println("Payer Email: "+payerEmail);*/
		strBuffer.append("  ----------->        Verified");
		

		// check that paymentStatus=Completed
		// check that txnId has not been previously processed
		// check that receiverEmail is your Primary PayPal email
		// check that paymentAmount/paymentCurrency are correct
		// process payment
	} else if (res.equals("INVALID")) {
		//out.println("Invalid");
		//out.println(strBuffer.toString());
		strBuffer.append("  ----------->        Invalid");
		
		/*out.println("Item Name: "+itemName);
		out.println("Item Number: "+itemNumber);
		out.println("Payment Status: "+paymentStatus);
		out.println("Payment Amount: "+paymentAmount);
		out.println("Payment Currency: "+paymentCurrency);
		out.println("Transaction ID: "+txnId);
		out.println("Receiver Email: "+receiverEmail);
		out.println("Payer Email: "+payerEmail);*/		
		// log for investigation
	} else {
		// error
	}
	fos.write(strBuffer.toString().getBytes());
	fos.flush();
	fos.close();
	}
	catch(IOException e) {
		//e.printStackTrace();	
	}
%>