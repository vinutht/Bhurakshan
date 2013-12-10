<%@ page import="net.tanesha.recaptcha.ReCaptcha" %>
<%@ page import="net.tanesha.recaptcha.ReCaptchaImpl" %>
<%@ page import="net.tanesha.recaptcha.ReCaptchaFactory" %>
<!DOCTYPE html>
<html>

<head>
<title>BhuRakshan - We safeguard your property!</title>

<meta name="keywords" content="">
<meta name="description" content="">

<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

<!--[if lt IE 9]>
<script type="text/javascript" src="layout/plugins/html5.js"></script>
<![endif]-->

<link rel="stylesheet" href="layout/style.css" type="text/css">
<link href="http://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700,700italic" rel="stylesheet" type="text/css">
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,600italic,700,700italic,800,800italic" rel="stylesheet" type="text/css">

	<style>	
		.bhurakshan-registration-dialog { font-size: 90.75%; }	
		.bhurakshan-registration-dialog label, .bhurakshan-registration-dialog input { display:block; }
		.bhurakshan-registration-dialog input.text { margin-bottom:12px; width:95%; padding: .4em; }
		.bhurakshan-registration-dialog fieldset { padding:0; border:0; margin-top:25px; }
		
		.bhurakshan-login-dialog { font-size: 90.75%; }	
		.bhurakshan-login-dialog label, .bhurakshan-login-dialog input { display:block; }
		.bhurakshan-login-dialog input.text { margin-bottom:12px; width:95%; padding: .4em; }
		.bhurakshan-login-dialog form { padding:0; border:0; margin-top:25px; }
				
		.ui-dialog .ui-state-error { padding: .3em; }
		.validateTips { border: 1px solid transparent; padding: 0.3em; }
		.validateLoginTips { border: 1px solid transparent; padding: 0.3em; }		
		
		#registration_failure, #registration_success, #forgot_password_success {			
		    background-color: #fff;
		    border-radius: 15px;
		    color: #000;
		    display: none;
		    font-size: 1.5em;
		    padding: 20px;
		    width: 300px;
		    min-height: 80px;
		}
		#registration_failure .bClose, #registration_success .bClose, #forgot_password_success .bClose{
		    cursor:pointer;
		    position:absolute;		    
		    right:10px;
		    top:5px;
		}		
	</style>

<script type="text/javascript" src="layout/js/jquery.js"></script>

<!-- PrettyPhoto start -->
<link rel="stylesheet" href="layout/plugins/prettyphoto/css/prettyPhoto.css" type="text/css">
<script type="text/javascript" src="layout/plugins/prettyphoto/jquery.prettyPhoto.js"></script>
<!-- PrettyPhoto end -->

<!-- jQuery tools start -->
<script type="text/javascript" src="layout/plugins/tools/jquery.tools.min.js"></script>
<!-- jQuery tools end -->

<!-- ScrollTo start -->
<script type="text/javascript" src="layout/plugins/scrollto/jquery.scroll.to.min.js"></script>
<!-- ScrollTo end -->

<!-- FlexSlider start -->
<link rel="stylesheet" href="layout/plugins/flexslider/flexslider.css" type="text/css"/>
<script type="text/javascript" src="layout/plugins/flexslider/jquery.flexslider-min.js"></script>
<!-- FlexSlider end -->

<!-- jQuery Form Plugin start -->
<script type="text/javascript" src="layout/plugins/ajaxform/jquery.form.js"></script>
<!-- jQuery Form Plugin end -->

<!-- Twitter Plugin start -->
<script charset="utf-8" src="../widgets.twimg.com/j/2/widget.js"></script>
<script type="text/javascript" src="layout/plugins/tweet/tweet.widget.js"></script>
<!-- Twitter Plugin end -->

<!-- jQuery Sort Plugin start -->
<script type="text/javascript" src="layout/plugins/sort/jquery.sort.min.js"></script>
<!-- jQuery Sort Plugin end -->

<!-- Roundabout Plugin start -->
<script type="text/javascript" src="layout/plugins/roundabout/jquery.roundabout.min.js"></script>
<!-- Roundabout Plugin end -->

<!-- Nivo Slider Plugin start -->
<link rel="stylesheet" href="layout/plugins/nivo/nivo-slider.css" type="text/css">
<script type="text/javascript" src="layout/plugins/nivo/jquery.nivo.slider.pack.js"></script>
<!-- Nivo Slider Plugin end -->

<!-- OneByOne start -->
<link rel="stylesheet" href="layout/plugins/onebyone/css/jquery.onebyone.css" type="text/css"/>
<link rel="stylesheet" href="layout/plugins/onebyone/css/animate.css" type="text/css"/>
<script type="text/javascript" src="layout/plugins/onebyone/jquery.onebyone.min.js"></script>
<!-- OneByOne end -->

	<link type="text/css" href="css/jquery-ui-1.8.23.custom.css" rel="stylesheet" />
	<!--  <script type="text/javascript" src="jquery/jquery-1.8.0.min.js"></script>-->
	<script type="text/javascript" src="jquery/jquery-ui-1.8.23.custom.min.js"></script>
	
<script type="text/javascript" src="bpopup/jquery.bpopup-0.7.0.min.js"></script>

<script type="text/javascript" src="homepage/Register.js"></script>
<script type="text/javascript" src="homepage/LoginForm.js"></script>


</head>

<body>
	<div class="wrapper sticky_footer">
		<!-- HEADER BEGIN -->
		<header>
			<div id="header">
				<section class="section_top">
					<div class="inner">
						<div id="logo"><a href="."><img src="images/logo.png" alt="BhuRakshan" title="Bhurakshan"></a></div>
						
						<nav class="main_menu">
							<ul>
								<li><a href="about.jsp">About Us<span class="subtext"></span></a>
								</li>
								<li><a href="services.jsp">Services<span class="subtext"></span></a>
									<ul>
										
										<li><a href="services.jsp#pm">Property Monitoring</a> </li>
										<li><a href="services.jsp#pc">Property Cleaning</a></li>
										<li><a href="services.jsp#pf">Property Fencing</a> </li>
									</ul>
								</li>
								<li><a href="faq.jsp">FAQ<span class="subtext"></span></a></li>
								<li><a href="#" id="login_user">Sign In<span class="subtext"></span></a>
								</li>
								<li><a href="#" id="register_user">Sign Up<span class="subtext"></span></a>								
								</li>
								<li><a href="contact.jsp">Contact<span class="subtext"></span></a></li>
							</ul>
						</nav>
						
						<div class="clearboth"></div>
					</div>
				</section>
				
				<section class="section_title">
					<div class="inner">
						<div class="block_title"><h1>Terms and Conditions</h1></div>
						
						<div class="block_breadcrumbs">
							<p><a href=".">Home</a> / <span>Terms and Conditions</span></p>
						</div>
						
						<div class="clearboth"></div>
					</div>
				</section>
				<div class="line_3"></div>
			</div>
		</header>
		<!-- HEADER END -->
		
		<!-- CONTENT BEGIN -->
		<div id="content" class="right_sidebar">
			<div class="inner">
				<div class="general_content">
					<div class="main_content">
						<div class="separator" style="height:37px;"></div>
						
							<div class="block_about">
								<div class="main">
									
									<p>Description - Services of BhuRakshan can be availed by individuals across the globe who have immovable properties in and around Bangalore and Mysore. Charges of the services are customized to the services taken. Our services are not limited to Property Monitoring, we also undertake Property Fencing and Cleaning responsibilities based on particular requests.  Our services come to with proper e reporting system through which you can track the genuinity of our service.</p> 

<h4>1.  User Relationship with BhuRakshan: </h4>

<ul class="list_1">
<li>"BhuRakshan" a principle brand wholly owned by Bhumi.Inc </li>
<li>Unless otherwise agreed in writing with BhuRakshan, your agreement will always be for minimum terms and conditions set out in this document. These are refereed to below as the "Universal terms"</li>
<li>Your agreement with BhuRakshan will include the terms of any legal notices applicable to the services, in addition to the universal terms. All of these are referred to below as the 'Additional Terms' where additional terms will apply to a service, these terms are accessible for you to read either within, or through you use of service.</li>
<li>The universal terms and conditions together with the additional terms form a legally binding agreement between user and BhuRakshan in relation to your use of the services. It's important that you take time and read them carefully. Collectively this legal agreement is refereed to below as "Terms".</li>
<li>We will not share your personal/non-personal information to our marketing partners, advertisers or other third-parties </li>
</ul>

<h4>2.  Accepting the terms: </h4>

<p>BhuRakshan will accept your property for monitoring purpose under the terms and conditions related to our operating rules and policies. By accepting this you as a client indicate that our agreement is bound and you are bound to all of the terms and conditions of our agreement. </p> 

<ul class="list_1">
<li>In order to use our services you must first agree to the terms and conditions. You may not use our services without accepting the terms.</li>
<li>By accepting the terms of our services. In this case, you understand and agree that BhuRakshan will treat your use of the services as acceptance of the terms from that point onwards.</li>
<li>You may not use the services or may not accept the terms if you are not of legal age to form a binding contract with BhuRakshan or you are a person barred from receiving the services under the laws of India/other countries. (Including the country in which you are residing or from which you use this services). Before continuing you should print off or save a local copy of the universal terms for your records.</li>
</ul>

<h4>3.  Provision of the services by BhuRakshan: </h4>

<p>BhuRakshan will accept your property for monitoring purpose under the terms and conditions related to our operating rules and policies. By accepting this you as a client indicate that our agreement is bound and you are bound to all of the terms and conditions of our agreement. </p> 

<ul class="list_1">
<li>You acknowledge and agree that if BhuRakshan disables access to your account, you may be prevented from accessing the services, your account details / any files / contents which is contained in your account on our portal. In some cases BhuRakshan may disable your service once you opt for the refund. (Read more in the refund policy) </li>
<li>You acknowledge and agree that while BhuRakshan may not have set currently any upper limit for storage capacity for your documents or contents. Such fixed limits may be set by BhuRakshan at any time, at BhuRakshan's discretions.</li>
</ul>

<h4>4.  Use of the services by you:</h4>

<ul class="list_1">
<li>To access and avail certain services from BhuRakshan, you may be required to provide information, for necessary details in respective areas as sought by BhuRakshan and as a part of the registration process for the service. You agree that any registration information you give to BhuRakshan will always be correct, accurate and up to date. Information that you provide during the registration process to BhuRakshan will be used as basic source for service delivery and technology synchronization. </li>
</ul>

<h4>5.  Password and account security: </h4>

<ul class="list_1">
<li>You agree and understand that you are responsible for maintaining the confidentiality of your secret code and password associated with any of your account, use to access the services. Accordingly you agree that you'll be solely responsible to BhuRakshan for all activities that occur under your account. </li>
<li>If you become aware of any unauthorized use of your password or code you agree to notify BhuRakshan immediately at  support@bhurakshan.com </li>
</ul>

<p>You can share your certain information to your friends or who are known to you in BhuRakshan account and access provision permitting to BhuRakshan server only by using value added services, provided you have to follow and agree the terms.</p> 

<h4>6.  Content Services: </h4>

<ul class="list_1">
<li>You should be aware that content presented to you as part of the services, including but not limited to photographs and other details in the services and sponsored content within the services may be protected by intellectual property rights which are owned by sponsors and advertisers who provide that content to BhuRakshan or by other persons or companies on their behalf. You may not modify, sell, lease, loan, rent, distribute or create derivative works based on this contents either in whole or in part unless you have been specifically told you may do so by BhuRakshan or by the owner of the content in a separate agreement.</li>
<li>BhuRakshan reserves the right but shall have no obligation to review, pre-screen, filter, flag, modify, remove or refuse any or all contents from the services. From some of the services, BhuRakshan may provide tools to filter out explicit contents. These tools include the safe search preference settings </li>
<li>You are solely responsible for any content, document and photograph that you transmit or display while using the services and for the consequences of your actions including any damage or loss which BhuRakshan may suffer you will be liable for legal or any action as per the law of land. </li>
</ul>

<h4>7.  Proprietary Rights: </h4>

<ul class="list_1">
<li>You acknowledge and agree that BhuRakshan owns no legal rights, no titles of your property during the course of service. Whether those rights happen to be registered or not, and wherever in the world those rights may exists. You further acknowledge that the services may contain information which is designated confidential by BhuRakshan and that you shall not disclose any such information without BhuRakshan's prior written consent.</li>
<li>Unless you have agreed otherwise in writing with BhuRakshan, nothing in the terms gives you a right to use any Trade Mark, Service Marks, Trade Names, Logo's, Domain Names and other distinctive brand features.</li>
<li>Other than the limited license set forth in Section 11, BhuRakshan  acknowledges and agrees that it obtains no rights, title or interest from you or your licenses under these terms in or two any content that you submit, transmit, post, or display on, or through, the services, including any intellectual property rights which subsists in that content whether those rights happen to be registered or not, and wherever in the world those rights may exists.  </li>
<li>You agree that you shall not remove, obscure, or alter any proprietary rights notices including, Copy Right and Trade Mark notices which may be affixed to or contained within the services. Unless you have been expressly authorized to do so in writing by BhuRakshan, you agree that in using the services, you'll not use any Trade Mark, Service Mark, Logo, Trade Name of any company or organisation in a way that is likely or intended to cause confusion about the owner or authorized user of such names, Marks, Logos.
</ul>

<h4>8.  License from BhuRakshan: </h4>

<ul class="list_1">
<li>BhuRaskhan gives you a worldwide, personal, royalty free, non-assignable and exclusive license to use the portal provided by BhuRakshan. This license is for the sole purpose of enabling you to use and enjoy the benefit of the services as provided by BhuRakshan, in the manner permitted by the terms.</li>
<li>You may not permit anyone else to modify, copy, create a derivative work of, reverse engineer, the compile or otherwise attempt to extract the source code of the software or any part thereof, unless this is expressly permitted or required by law, or unless you have been specifically told that you may do so by BhuRakshan in writing.</li>
<li>Unless BhuRakshan has given you specific written permission to do so, you may not assign or grant a sub-license of your rights to use the software, grant a security interest in or over your rights to use the software or otherwise transfer any part of your rights to use the BhuRakshan. </li>
</ul>

<h4>9. Content License from you: </h4>

<ul class="list_1">
<li>You retain copy right and any other rights you already hold in  information, documents which you submit, post or display on or through, the services. By submitting details you authorize BhuRakshan to adapt that and use it for the services. This license is for the sole purpose of enabling services.</li>
<li>You agree that this license includes a right for BhuRakshan to make such content available to its people who are directly involved in the project and is no further to be used by the other companies, organisations or individuals with whom BhuRakshan has relationship for the provision of syndicated services, and to use such content in connection with the provision of those services.</li>
</ul>

<h4>10. Software Updates : </h4>

<ul class="list_1">
<li>The software which you use may automatically download and install updates from time to time from BhuRakshan. These updates are designed to improve, enhance and further develop the services and may take the form of bug fixes, enhanced functions, new software modules and completely new versions. You agree to receive such updates and permit BhuRakshan to deliver these to you as part of your use of the services.</li>
</ul>

<h4>11. Service Delivery : </h4>

<p>Services of BhuRakshan are bound to the laws of geographical area of Bangalore, Karnataka, India. Hence any legal related issues are dealt only in Bangalore. </p>

<p>The information we procure from you to offer the services are meant to be used by BhuRakshan staff only. Other than this we also have the rights to share your details (when sought) to law keepers viz., Police/Legal authorities.  </p>

<p>The date of the visits might differ 10% either ways. But there will be no difference to the numbers of guaranteed visits - Monthly - 12 | Quarterly - 4 | Half Yearly - 2 | Yearly - 1. </p>

<p>Refund policy - Refunds are made available to clients only after the approval of the board at BhuRakshan. There will be no questions asked to the decision of the client. </p>

<h5> Terms for refund include </h5>

<ul class="list_1">
<li>if client stops taking service during First Quarter  - 75% will be refunded</li>
<li>If client stops taking service during Second Quarter - 50% will be refunded</li>
<li>If client stops taking service during Third Quarter  - 25% will be refunded</li>
</ul>

<h5>Note</h5>
<ul class="list_1">
<li>During maintenance/upgradation of our website the access to the client may be terminated, at this point BhuRakshan will make sincere and honest attempt to backup the data or retrieve in case of any loss, even further to this attempt if the data is lost then BhuRakshan will not refund/repay/be held responsible for any data loss. </li>
<li>While making the refund BhuRakshan will take into account and deduct if any additional costs involved in executing your service. </li>
<li>No refunds will be available after the service delivery for complete term. </li>
<li>BhuRakshan will take a minimum of 7 working days to start the refund process. However the reach of refund to client will be based on speed of the banks and other payment gateway channels. </li>
<li>BhuRakshan can also stop the services and even access to the website to any client at any point of time even without stating any reason whatsoever. This decision making power is purely based on the customer-BhuRakshan relationship. </li>
</ul>

<h5>Locating a property is of key function and we use various technologies for the same</h5>

<p>In case a customer makes mistake in marking his site on google maps or  makes mistake in showing his site personally or his contacts who show us the site makes mistake then we will not be responsible for any legal issues like trespassing of our staff into others property. </p>
<p>Sameway if staff at BhuRakshan monitors a wrong site because of technological errors (gps + glonas) or human errors then we request the customer to get back to us within 5 working days. </p>
<p>If customer doesnt reply back then we assume that the photos are correct and are approved by customer. Please note that Bhurakshan will not be liable to pay any amount of the property cost in above or any other cases not said above.</p>
<p>Subscription for monitoring a property is not substitutable/transfarreble to monitor different properties of the client.</p>
<p>Team and Management of Bhurakshan is not responsible if the client property is acquired by government or any type of government agencies or court attachmeets or trespassing of any goonda elements. </p>
<p>Once the agreement is signed between Bhurakshan and client then it is not transferable.</p>
<h5>Keynote to customer</h5>
<p>we request every client to revert with feedback on the property photographs if it does not match with the original property within 5working days. </p>

<h4>12.  Changes to the Terms:</h4>
<ul class="list_1">
<li>BhuRakshan may change the universal terms or additional terms. When these changes are made we will post those changes on this page and update the modification date below. BhuRakshan will make a new copy of the universal terms available here and any new additional terms will be made available to you from within or through the affected services.</li>
<li>You understand and agree that if you use the services after the date on which the universal terms or additional terms have changed, BhuRakshan will treat users acceptance of the updated universal terms or additional terms.</li>
<li>Last Modified Date : 14th October 2013</li>
</ul>

<ul class="list_1">
<li>The software which you use may automatically download and install updates from time to time from BhuRakshan. These updates are designed to improve, enhance and further develop the services and may take the form of bug fixes, enhanced functions, new software modules and completely new versions. You agree to receive such updates and permit BhuRakshan to deliver these to you as part of your use of the services.</li>
</ul>


								</div>
							
							<div class="clearboth"></div>
						</div>
						
						<div class="clearboth"></div>
						
					</div>
					
					<div class="sidebar">
						<div class="separator" style="height:17px;"></div>

						
						<div class="separator" style="height:37px;"></div>
						<div class="block_categories">
						<a href="pricing.jsp"><h6>Prices</h6></a>
						<p>For people residing outside India</p>
							<ul class="list_5">
								<li>Yearly visit      : 19 USD per annum</li>
								<li>Half Yearly visit : 35 USD per annum</li>							
								<li>Quarterly visit   : 59 USD per annum</li>
								<li>Monthly visit     : 119 USD per annum</li>
							</ul></br></br>
						<p>For people residing in India</p>
							<ul class="list_5">
								<li>Yearly visit      : INR 799 per annum</li>
								<li>Half Yearly visit : INR 1499 per annum</li>							
								<li>Quarterly visit : INR 2499 per annum</li>
								<li>Monthly visit : INR 5999 per annum</li>
							</ul>
						</div>
						
						<div class="separator" style="height:38px;"></div>
						<div class="block_categories">
							<a href="services.jsp"><h6>Services</h6></a>
							<ul class="list_5">
								
								<li><a href="services.jsp#pm">Property Monitoring</a> </li>
								<li><a href="services.jsp#pc">Property Cleaning</a></li>
								<li><a href="services.jsp#pf">Property Fencing</a> </li>
							</ul>
						</div>
						
						<div class="separator" style="height:38px;"></div>
						
						
					</div>
					
					<div class="clearboth"></div>
				</div>
			</div>
		</div>
		<!-- CONTENT END -->
		
		<!-- FOOTER BEGIN -->
		<footer>
			<div id="footer">
				<section class="section_top">
					<div class="inner">
						<div class="block_to_top">
							<a href="#">BACK TO TOP</a>						</div>
						
						<div class="block_footer_widgets">
							<div class="column">
								<h3>Contact Us</h3>
								
								<div class="block_footer_about">
									<p>Bhumi.Inc</p>
									<p>&nbsp;</p>
									<p>Telephone: +91 98453 33211 <BR/>
									 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+91 99014 33211 </p>
									<p>eMail: support@bhurakshan.com</p>
								</div>
								
								<div class="block_footer_social_1">
									<ul>
										<li><a href="#" class="twitter">Twitter</a></li>
										<li><a href="#" class="facebook">Facebook</a></li>
										<li><a href="#" class="pinterest">Pinterest</a></li>
										<li><a href="#" class="vimeo">Vimeo</a></li>
										<li><a href="#" class="rss">RSS</a></li>
										<li><a href="#" class="flickr">Flickr</a></li>
									</ul>
								</div>
							</div>
							
							
							<div class="column">
								<h3>Pages</h3>
								
								<div class="block_footer_recent_posts">
									<ul>
										<li><a href="about.jsp">About Us</a></li>
										<li><a href="features.jsp">Features</a></li>
										<li><a href="services.jsp">Services</a></li>
										<li><a href="pricing.jsp">Pricing</a></li>
										<li><a href="faq.jsp">FAQ</a></li>
										<li><a href="contact.jsp">Contact Us</a></li>
									</ul>
								</div>
							</div>																				
							<div class="column">
								<h3>This website is best viewed in Firefox or Chrome</h3>
								<h3>Refer Bhurakshan and Earn</h3>
								<a href="pricing.jsp#ref"><img src="images/refer.png" alt=""></a>
								<h3>Tags</h3>
								<h6>Bhu Rakshan, Land Protection,
								Safegaurd Land, Know your Neighbour,
								Take Land Photos, Capture Land Photos, 
								Property Monitoring, Property Safeguard, Property Cleaning, 
								Property Fencing</h6>
							</div>
							
							<div class="column">
								<h3>Testimonial</h3>
								<marquee behavior="scroll" direction="up" 
									onmouseover="this.stop();" 
									onmouseout="this.start();">
										<h3>"When I invested in properties few years ago, I hadn't foreseen the difficulties in guarding them. Over the period of time, it has become increasingly difficult. 
Sitting remotely and asking friends & family to go and check the site once in a while, is a serious pain. 
I am very glad to have found Bhurakshan. Instead of depending on someone to monitor my property, I can see the status regularly. 
I am hoping that Bhurakshan is soon going to extend the facilities like property tax handling etc." <BR/><BR/>Srinivas, California, USA.</h3> 
								</marquee>
                            </div>
							
							<div class="clearboth"></div>
						</div>
					</div>
				</section>
				
				<section class="section_bottom">
					<div class="inner">
						<div class="block_bottom_menu">
							<ul>
								<li><a href="terms.jsp">Terms and Conditions</a></li>
							</ul>
						</div>
						
						<div class="block_copyrights"><p>Copyright &copy; 2012 BhuRakshan. All rights reserved.</p></div>
						
						<div class="clearboth"></div>
					</div>
				</section>
			</div>
		</footer>
		<!-- FOOTER END -->
	</div>
	<div id="bhurakshan-registration-form" title="Register">
		<p class="validateTips">Please complete the form to signup.</p>	

		<form>
		<fieldset id="registration_fieldset">
			<label for="register_name">Name *</label> 
			<input type="text" name="register_name" id="register_name" class="text ui-widget-content ui-corner-all" /> 
			<label for="register_email">Email *</label>
			<input type="text" name="register_email" id="register_email" value="" class="text ui-widget-content ui-corner-all" />
			<%
			 ReCaptcha c = ReCaptchaFactory.newSecureReCaptcha("6LdgYdcSAAAAAEW9EuqnTnlCDzV05pXxwuDIhBsL", "6LdgYdcSAAAAAFYH48hN32p59LHQI9a3__PuPUb5", false);
			 ((ReCaptchaImpl) c).setRecaptchaServer("https://www.google.com/recaptcha/api");
			 out.print(c.createRecaptchaHtml(null, null));
			%>			       	
		</fieldset>
		</form>
	</div> 
	
	<div id="bhurakshan-login-form" title="Login">
		<p class="validateLoginTips"></p>	

		<form id="the_security_guard" action="j_security_check" method="post">
			<label for="j_username">Email *</label> 
			<input type="text" name="j_username" id="j_username" class="text ui-widget-content ui-corner-all" /> 
			<label for="j_password">Password *</label>
			<input type="password" name="j_password" id="j_password" value="" class="text ui-widget-content ui-corner-all" />		
		</form>
	</div> 	
	
	<div id="registration_success">
		<a class="bClose">x</a>
			<h1>Thank you and Congratulations!</h1> <br/> <br/>
			Welcome to the Bhurakshan family. We are excited to have you as part of our family. We have sent an email. <br/>
			Please follow the instructions in the email which guides you through the next steps. <br/><br/>
			-The Bhurakshan Team.
		
	</div>
	
	<div id="forgot_password_success">
		<a class="bClose">x</a>
			<h>Thank you</h> <br/> <br/>
			Your password has been emailed to your email address successfully. <br/><br/>
			-The Bhurakshan Team.		
	</div>	
	
	<div id="registration_failure">
		<a class="bClose">x</a>			
			There was some problem in registering, we are sorry about that. <br/>
			Please contact system admin at support@bhurakshan.com <br/><br/><br/>
			-The Bhurakshan Team.		
	</div>	
</body>

</html>