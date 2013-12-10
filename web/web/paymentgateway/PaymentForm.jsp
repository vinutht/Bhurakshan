<%@ page import="net.authorize.sim.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
  "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
  </head>
  <body>
<%
	String apiLoginId = "5K9Lc9es";	
	String transactionKey = "345Q7b3FbmPpr36e";
	String relayResponseUrl = "http://localhost:8080/home/paymentgateway/PaymentRelayResponse.jsp";
	//String relayResponseUrl = "http://www.bhurakshan.com";
	
	String amount = "1.99";
	Fingerprint fingerprint = Fingerprint.createFingerprint(apiLoginId,transactionKey,1234567890, amount);
	
	long x_fp_sequence = fingerprint.getSequence();
	long x_fp_timestamp = fingerprint.getTimeStamp();
	String x_fp_hash = fingerprint.getFingerprintHash();
%>

<!--<form name='secure_redirect_form' id='secure_redirect_form_id' action='www.bhurakshan.com' method='GET'>-->
<form name='secure_redirect_form' id="secure_redirect_form_id" action='https://test.authorize.net/gateway/transact.dll' method='POST'>
<!--<FORM NAME='secure_redirect_form' ID='secure_redirect_form_id' onSubmit="JavaScript:alert('Hi there!!')" METHOD='GET'>-->

  <label>CreditCardNumber</label><input type='text' class='text' name='x_card_num' size='15'>
    </input>
  <label>Expiration.</label><input type='text' class='text' name='x_exp_date' size='4'></input>
  <label>Amount</label><input type='text' class='text' name='x_amount' size='9'
    readonly value='<%=amount%>'></input>
  <INPUT TYPE='HIDDEN' NAME='x_invoice_num' VALUE='<%=System.currentTimeMillis()%>'>
  <INPUT TYPE='HIDDEN' NAME='x_relay_url' VALUE='<%=relayResponseUrl%>'>
  <INPUT TYPE='HIDDEN' NAME='x_login' VALUE='<%=apiLoginId%>'>
  <INPUT TYPE='HIDDEN' NAME='x_fp_sequence' VALUE='<%=x_fp_sequence%>'>
  <INPUT TYPE='HIDDEN' NAME='x_fp_timestamp' VALUE='<%=x_fp_timestamp%>'>
  <INPUT TYPE='HIDDEN' NAME='x_fp_hash' VALUE='<%=x_fp_hash%>'>
  <INPUT TYPE='HIDDEN' NAME='x_version' VALUE='3.1'>
  <INPUT TYPE='HIDDEN' NAME='x_method' VALUE='CC'>
  <INPUT TYPE='HIDDEN' NAME='x_type' VALUE='AUTH_CAPTURE'>
  <INPUT TYPE='HIDDEN' NAME='x_amount' VALUE='<%=amount%>'>
  <INPUT TYPE='HIDDEN' NAME='x_cust_id' VALUE='Vinuth'>
  <INPUT TYPE='HIDDEN' NAME='x_test_request' VALUE='TRUE'>
  <INPUT TYPE='HIDDEN' NAME='notes' VALUE='extra hot please'>
  <INPUT TYPE='SUBMIT' NAME='SUBMIT' VALUE='BUY'>
</form>

</body>
</html>