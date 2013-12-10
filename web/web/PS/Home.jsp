<%@page import="com.ps.shared.PSLookup"%>
<%@page import="com.ps.shared.interfaces.UserManager"%>
<%@page import="com.ps.shared.dataobjects.User"%>

<!DOCTYPE html>
<html>
	<head>
	    <title>Welcome to BhuRakshan - We safeguard your property!!</title>
	    <link rel="stylesheet" type="text/css" href="../extjs/resources/css/ext-all.css">
		<link rel="stylesheet" type="text/css" href="../css/Customer.css" />
		<link rel="stylesheet" type="text/css" href="../css/admin.css" />
		<link rel="stylesheet" type="text/css" href="../css/Desktop.css" />	    
				
	    <!-- <script type="text/javascript" src="../extjs/ext-all-debug-w-comments.js"></script> -->
	    
	    <script type="text/javascript" src="../extjs/ext-all.js"></script>
		<script type="text/javascript" src="../desktop/Desktop.js"></script>
		
		<!-- <script type="text/javascript" src="../ux/RowExpander.js"></script>
		<script type="text/javascript" src="../ux/GMapPanel.js"></script> -->
		
		<script type="text/javascript" src="../ux/UX.js"></script>
		
	    <script type="text/javascript"
	      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAC1Rrr_hsvLNM80XbE0iMmA01J6sMteJQ&sensor=false">
	    </script> 			   	   
		
		<!--  <script type="text/javascript" src="customer/CustomerPhotoBrowser.js"></script>
		<script type="text/javascript" src="customer/CustomerProfile.js"></script>
		<script type="text/javascript" src="customer/CustomerSubscription.js"></script>
		<script type="text/javascript" src="customer/CustomerDesktop.js"></script>
		<script type="text/javascript" src="customer/LocationMap.js"></script>	
		<script type="text/javascript" src="customer/RegistrationDetails.js"></script>	
		
		<script type="text/javascript" src="customer/Customer.js"></script>
		<script type="text/javascript" src="StartUp.js"></script> -->
		<script type="text/javascript" src="shared/Shared.js"></script>    
	    <script>
	    	window.BHURAKSHAN_CONTEXT = new Ext.util.HashMap();
	    </script>
	</head>
	<body>
		<%
			UserManager userManager = PSLookup.getUserManagerBean();
			User currentUser = userManager.getUser();
			String role = currentUser.getRole();
			
			if("ADMIN".equals(role)) {
		%>
				<script type="text/javascript" src="admin/Admin.js"></script>
				<script>													
					Ext.application({
					    name: 'PS',    
					    launch: function() {    	    	    	
					    	var adminDesktop = new AdminDesktop.App({});    	
					    }
					});			
				</script>				
		<% 	}
			else {										
				boolean isRegistrationComplete = currentUser.isRegistrationComplete();			
		%>
				<script type="text/javascript" src="customer/Customer.js"></script>
				<script type="text/javascript" src="StartUp.js"></script>			
				<script>
					var isRegComplete = '<%=isRegistrationComplete%>';			
					
					var desktopConfig = {};
					if(isRegComplete === 'false') {
						desktopConfig = {
					    		listeners: {
					    			'ready': function() {
					    				var regWindow = ps.startup.getCompleteRegistrationWindow();
					    				regWindow.show();    				
					    			}
					    		}
					    	};	
					}
					Ext.application({
					    name: 'PS',    
					    launch: function() {    	    	    	
					    	var myDesktopApp = new MyDesktop.App(desktopConfig);    	
					    }
					});			
				</script>
			
		<% } %>
	</body>
</html>