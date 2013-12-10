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
								<li class="current_page_item"><a href="contact.jsp">Contact<span class="subtext"></span></a></li>
							</ul>
						</nav>
						
						<div class="clearboth"></div>
					</div>
				</section>
				
				<section class="section_title">
					<div class="inner">
						<div class="block_title"><h1>Contact Us</h1></div>
						
						<div class="block_breadcrumbs">
							<p><a href=".">Home</a> / <span>Contact Us</span></p>
						</div>
						
						<div class="clearboth"></div>
					</div>
				</section>
				<div class="line_3"></div>
			</div>
		</header>
		<!-- HEADER END -->
		
		<!-- CONTENT BEGIN -->
		<div id="content" class="">
			<div class="inner">
				<div class="general_content">
					<div class="main_content">
						<div class="separator" style="height:35px;"></div>
						
						<div class="block_contact_us_type_2">
							<div class="col_left">
							<h4>On the Map</h4>
								<div class="map">
									<iframe width="300" height="300" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/ms?msa=0&amp;msid=214899740395118411507.00048b6cf633a79899d3e&amp;ie=UTF8&amp;t=m&amp;ll=12.97160,77.59456&amp;spn=0.050182,0.051498&amp;z=13&amp;output=embed"></iframe><br /><br />
								</div>
								
								<div class="address">
									<h4>Bhumi.Inc</h4>																	
									<p><span class="text_subtitle_2">Phone:</span> +91 98453 33211<BR/>
									 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+91 99014 33211 </p>
									<p><span class="text_subtitle_2">eMail:</span> support@bhurakshan.com</p>
									<div class="separator" style="height:14px;"></div>
								</div>
							</div>
							
							<div class="send_message">
								<h4>Keep in Touch</h4>
								
								<div class="form">
									<form id="contact_form" >
										<p class="label">Name <span>(required)</span></p>
										<div class="field"><input type="text" id="c_username" name="name" class="req"></div>
										
										<p class="label">E-mail <span>(required)</span></p>
										<div class="field"><input type="text" name="email" id="c_useremail" class="req"></div>
										
										<p class="label">Subject </p>
										<select name="subject" id="c_subject">	
												<option value="QUESTION" selected="selected">Question</option>
												<option value="SUGGESTION">Suggestion</option>
												<option value="BUSINESS_PROPOSAL">Business proposal</option>
												<option value="ADVERTISEMENT">Advertising</option>
												<option value="COMPLAINT">Complaint</option>
												<option value="OTHER">Other</option>
											</select>										
										<!-- <div class="field">																															
										<input name="subject" type="text" id="c_subject"> 
										</div>-->
										<BR/>
										<BR/>
										<p class="label">Message <span>(required)</span></p>
										<div class="textarea"><textarea name="message" cols="21" rows="1" class="req" id="c_message"></textarea></div>
										
										<div class="button"><input id="c_contact_submit" type="button" class="general_button" value="Send Message"></div>
									</form>
									<script type="text/javascript">
										$(function () {
											var userName = $("#c_username"),
												userEmail = $("#c_useremail"),
												subject = $("#c_subject"),
												message = $("#c_message");
											
											function isEmpty(o, msg) {
												if(o.val().length < 1 || o.val() === undefined || o.val() === '') {
													alert(msg);
													return false;
												}
												else {
													return true;
												}
											}
											
											function checkRegexp( o, regexp, n ) {
												if ( !( regexp.test( o.val() ) ) ) {
													alert(n);
													return false;
												} else {
													return true;
												}
											}	
											
											$("#c_contact_submit").click(function(evtObj) {
												var valid = true;
												
												valid = valid && checkRegexp( userName, /^[a-z]([0-9a-z_\s])+$/i, "Name cannot be empty." );
												valid = valid && checkRegexp( userEmail, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "Email should be of the form abc@xyz.com" );
												
												if(valid) {
													$.ajax({
														url: '/ps/public-services/contact-us',
														type: 'POST',
														data: '{"name": "'+userName.val()+'","email": "'+userEmail.val()+'", "subject": "'+subject.val()+'", "message": "'+message.val()+'"}',
														contentType: 'application/json; charset=utf-8',
														dataType: 'json',
														success: function(data, status, jqXHR) {
															alert(data.msg)	;
														}
													});
												}
												
											});
											
											
										});
									</script>
								</div>
							</div>
							
							<div class="clearboth"></div>
						</div>
						
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