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
<link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400italic,700,700italic" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,400italic,600,600italic,700,700italic,800,800italic" rel="stylesheet" type="text/css">

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

	<!-- Preloader -->
<script type="text/javascript">
	//<![CDATA[
		$(window).load(function() { // makes sure the whole site is loaded
			$("#status").fadeOut(); // will first fade out the loading animation
			$("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
		})
	//]]>
</script>

<!-- PrettyPhoto start -->
<link rel="stylesheet" href="layout/plugins/prettyphoto/css/pretty	Photo.css" type="text/css">
<script type="text/javascript" src="layout/plugins/prettyphoto/jquery.prettyPhoto.js"></script>
<!-- PrettyPhoto end -->

<!-- jQuery tools start -->
<script type="text/javascript" src="layout/plugins/tools/jquery.tools.min.js"></script>
<!-- jQuery tools end -->

<!-- ScrollTo start -->
<script type="text/javascript" src="layout/plugins/scrollto/jquery.scroll.to.min.js"></script>
<!-- ScrollTo end -->

<!-- FlexSlider start -->
<!--link rel="stylesheet" href="layout/plugins/flexslider/flexslider.css" type="text/css"/>
<script type="text/javascript" src="layout/plugins/flexslider/jquery.flexslider-min.js"></script>
<!-- FlexSlider end -->



<!-- jQuery Form Plugin start -->
<script type="text/javascript" src="layout/plugins/ajaxform/jquery.form.js"></script>
<!-- jQuery Form Plugin end -->

<!-- Twitter Plugin start -->
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

	<!-- Preloader -->
	<div id="preloader">
		<div id="status">&nbsp;</div>
	</div>

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
				
				<section class="section_slider_1">
					<div class="slider_line_1"></div>
					<div class="slider_line_2"></div>
					
					<div id="slider" class="slider">
						<div class="oneByOne_item">
							<img src="images/pic_slider_one.png" alt="" class="pic_1_3" data-ease-type="bounceInRight">
							<div class="text_3_1" data-ease-type="fadeInLeft">We Safeguard </div>
							<div class="text_3_2" data-ease-type="fadeInLeft">Your Property!</div>
							<div class="text_3_3" data-ease-type="fadeInLeft">Let Us Know & We </div>
							<div class="text_3_4" data-ease-type="fadeInLeft">will take care of your property the way you like to. </br>So why wait, register for it and safeguard your property.</div>							
							<div class="text_3_116" data-ease-type="fadeInLeft"><a href="#" id="register_user_slider" class="general_button big arrow_right"><span>Sign Up</span></a></div>
							<div class="text_3_111" data-ease-type="fadeInLeft"><a href="pricing.jsp" class="general_button big arrow_right"><span>Pricing</span></a></div>
							
						</div>
						
						<div class="oneByOne_item">
							<img src="images/pic_slider_two.png" alt="" class="pic_1_3" data-ease-type="bounceInRight">
							<div class="text_3_1" data-ease-type="fadeInLeft">Our Monitoring Service is</div>
							<div class="text_3_2" data-ease-type="fadeInLeft">backed with technology</div>
							<div class="text_3_3" data-ease-type="fadeInLeft">(GPS and Glonass) to locate exact location</div>
							<div class="text_3_4" data-ease-type="fadeInLeft"> Each photo of the property is embedded with latitude and longitude </br>information along with date and time from the GPS satellites. </div>	
							<div class="text_3_116" data-ease-type="fadeInLeft"><a href="#" id="register_technology_slider" class="general_button big arrow_right"><span>Sign Up</span></a></div>
							<div class="text_3_111" data-ease-type="fadeInLeft"><a href="pricing.jsp" class="general_button big arrow_right"><span>Pricing</span></a></div>
						</div>
						
						<!--div class="oneByOne_item">
							<img src="images/pic_slider_three.png" alt="" class="pic_1_3" data-ease-type="bounceInRight">
							<div class="text_3_1" data-ease-type="fadeInLeft">Assess the Ability</div>
							<div class="text_3_2" data-ease-type="fadeInLeft">to program</div>
							<div class="text_3_3" data-ease-type="fadeInLeft">Relevant Technical Capabalities.</div>
							<div class="text_3_4" data-ease-type="fadeInLeft">Learning Labs offers BestFit Programmer Aptitude Test (PAT) </br> to screen candidates for various technical postions.</div>
							<div class="text_3_5" data-ease-type="fadeInLeft"><a href="#" class="general_button big arrow_right"><span>Experience Bestfit</span></a></div>
						</div>
						<div class="oneByOne_item">
							<img src="images/pic_slider_four.png" alt="" class="pic_1_3" data-ease-type="bounceInRight">
							<div class="text_2_1" data-ease-type="fadeIn">Individual behavior impacts the overall growth of organizations' behavior</div>
							<div class="text_2_1" data-ease-type="fadeIn"></div>
							<div class="text_2_3" data-ease-type="fadeIn">Learning Labs offers Role Based Assessment &#8482;, a technique </br>created to measure how people behave in teams.</div>
							<div class="text_2_4" data-ease-type="fadeIn"><a href="#" class="general_button big arrow_down"><span>Experience Bestfit</span></a></div>
						</div-->
					</div>
					
					<!-- <div class="static_pic"><img src="images/pic_slider_1_static.jpg" alt=""></div> -->
					
					<script type="text/javascript">
						$(function() {
							$('#slider').oneByOne({
								width : 2000,
								className : 'oneByOne1',	             
								easeType : 'bounceInRight',
								slideShow : true,
								showArrow : false,
								slideShowDelay: 6000,
								showButton : false
							});
						});
					</script>
				</section>
			</div>
		</header>
		<!-- HEADER END -->
		
		<!-- CONTENT BEGIN -->
		<div id="content" class="">
			<div class="inner">
				<div class="general_content">
					<div class="main_content">
						<!--div class="block_slogan_1">
							<p class="text_1">We monitor your property by visiting the location once a month or a quarter based on your subscription. We take photographs of the property which you can later access by logging into the portal. We send a copy of the photographs to your email on every visit. </p>
						</div-->
						<div class="line_2" style="margin:0px 0px 37px;"></div>
						
						<div class="block_services_type_3">
							<div class="service">
								<div class="icon icon_3"></div>
								<div class="content">
									<h5>Flexible Subscription</h5>
									<p>Opt for different subscriptions like montly/quarterly. Speak to us to make this even more flexible.</p>
									<a href="features.jsp" class="general_button">Read More</a>
								</div>
							</div>
							<div class="service">
								<div class="icon icon_4"></div>
								<div class="content">
									<h5>Technology features </h5>
									<p>Our Monitoring Service is backed with technology (<a target="_blank" href="http://www.youtube.com/watch?feature=player_embedded&v=gB9pXInwh3k" style="color:blue">GPS and Glonass</a>) to locate exact location.</p>
									<a href="features.jsp" class="general_button">Read More</a>
								</div>
							</div>

							
							<div class="service">
								<div class="icon icon_2"></div>
								<div class="content">
									<h5>Browse Photos </h5>
									<p>You can login to our portal and browse the photographs of your property.</p>
									<a href="features.jsp" class="general_button">Read More</a>
									<div class="separator" style="height:16px;"></div>
								</div>
							</div>

							<div class="service">
								<div class="icon icon_1"></div>
								<div class="content">
									<h5>Google Map</h5>
									<p>You can know where exactly is your property located with latest technology on google maps.</p>
									<a href="features.jsp" class="general_button">Read More</a>
									<div class="separator" style="height:16px;"></div>
								</div>
							</div>
							
							<!--div class="clearboth"></div-->
							
						</div>
						
					</div>
					
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