package com.ps.platform.users.ejb;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.jboss.logging.Logger;

import javax.annotation.Resource;
import javax.ejb.SessionContext;
import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.ps.platform.users.jpa.PropertyEntity;
import com.ps.platform.users.jpa.RoleEntity;
import com.ps.platform.users.jpa.UserEntity;
import com.ps.platform.users.jpa.Queries;
import com.ps.shared.Constants.COUPON_TYPE;
import com.ps.shared.Constants.MONITOR_FREQUENCY;
import com.ps.shared.Constants.SERVICES;
import com.ps.shared.Constants.SERVICE_TYPE;
import com.ps.shared.Constants.SUBSCRIPTION_TYPE;
import com.ps.shared.PSLookup;
import com.ps.shared.Utility;
import com.ps.shared.dataobjects.ApiContext;
import com.ps.shared.dataobjects.Coupon;
import com.ps.shared.dataobjects.Properties;
import com.ps.shared.dataobjects.Property;
import com.ps.shared.dataobjects.Service;
import com.ps.shared.dataobjects.User;
import com.ps.shared.dataobjects.Users;
import com.ps.shared.email.EmailHelper;
import com.ps.shared.exception.ApplicationException;
import com.ps.shared.interfaces.AdminManager;
import com.ps.shared.interfaces.UserManager;

@Stateless
public class UserManagerBean implements UserManager
{
	Logger logger = Logger.getLogger(UserManagerBean.class.getName());
	
	@PersistenceContext(unitName="platform")
	private EntityManager em;
	
	@Resource 
	private SessionContext session;
	
	@Override
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void addUser(User user) throws ApplicationException 
	{
		try {
			UserEntity userEntity = new UserEntity();
			userEntity.setEmail(user.getEmail());
			userEntity.setName(user.getName());
			
			String password = RandomStringUtils.randomAlphanumeric(8);
			userEntity.setPassword(password);
			user.setPassword(password);
			
			Query query = em.createQuery(Queries.GET_ROLE_BY_NAME);
			query.setParameter("name", "CUSTOMER");			
			RoleEntity roleEntity = (RoleEntity)query.getSingleResult();									
			userEntity.setRole(roleEntity);
			
			userEntity.setAccountActivated(false);
													
			EmailHelper.sendRegistrationConfirmationEmail(user);
			
			em.persist(userEntity);	
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing addUser operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}
		
	}	
	
	@Override
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void addInternalUser(User user) throws ApplicationException 
	{
		try {
			UserEntity userEntity = new UserEntity();
			userEntity.setEmail(user.getEmail());
			userEntity.setName(user.getName());						
			userEntity.setPassword(user.getPassword());
			userEntity.setAddress(user.getAddress());
			userEntity.setPhone(user.getPhone());
			
			Query query = em.createQuery(Queries.GET_ROLE_BY_NAME);
			query.setParameter("name", "EMPLOYEE");			
			RoleEntity roleEntity = (RoleEntity)query.getSingleResult();									
			userEntity.setRole(roleEntity);			
			userEntity.setAccountActivated(true);													
			
			em.persist(userEntity);	
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing addUser operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}
		
	}		

	@Override
	public void deleteUser(int userId) throws ApplicationException 
	{		
		try {
			UserEntity user = em.find(UserEntity.class, userId);
			em.remove(user);
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing deleteUser operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}
	}
	
	@Override
	public void modifyProfile(User user) throws ApplicationException
	{
		try {
			UserEntity userEntity = getCurrentUser();
			if(userEntity != null) {
				String phone = user.getPhone();
				if(!Utility.isEmpty(phone)) {
					userEntity.setPhone(phone);
				}
				
				String address = user.getAddress();
				if(!Utility.isEmpty(address)) {
					userEntity.setAddress(address);
				}
			}
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing modifyProfile operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);			
		}		
	}

	@Override
	public void modifyUser(User user) throws ApplicationException 
	{
		try {			
			UserEntity userEntity = getCurrentUser();
			if(userEntity != null) {
				userEntity.setPassword(user.getPassword());
				userEntity.setAddress(user.getAddress());
				userEntity.setCountry(user.getCountry());
				userEntity.setRegistrationComplete(user.isRegistrationComplete());
				//userEntity.setName(user.getName());
				userEntity.setPhone(user.getPhone());	
				String referer = user.getReferer();
				userEntity.setReferer(user.getReferer());
				userEntity.setHowDidYouComeToKnow(user.getHowDidYouComeToKnow());
				
				try {
					Coupon coupon = getUserCoupon(userEntity.getEmail());				
					PSLookup.getAdminManager().addCoupon(coupon);					
				}
				catch(Exception e) {
					logger.error("Coupon already exists for user: " + user.getEmail());
				}												
				
			}
			else {
				String errorMsg = "Failed when executing modifyUser operation :: No such user.";
				logger.error(errorMsg);				
				throw new ApplicationException("No such user");
			}				
						
			
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing modifyUser operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);			
		}
		
	}
	
	private String getCouponCodeDisplayString(String couponCode)
	{
		return couponCode.substring(0, 7);
	}
	
	private Coupon getUserCoupon(String email)
	{
		Coupon coupon = new Coupon();
		
		String couponCode = Utility.encodeToB64(email);
		String displayString = getCouponCodeDisplayString(couponCode);
		
		coupon.setCouponCode(couponCode);
		coupon.setDisplayString(displayString);
		coupon.setUserEmail(email);
		coupon.setCouponType(COUPON_TYPE.USER_COUPON);
		coupon.setDiscount(0);
		coupon.setDiscountInRs(0);
		
		return coupon;
	}

	@Override
	public User getUserById(int userId) throws ApplicationException 
	{
		try {
			UserEntity userEntity = em.find(UserEntity.class, userId);
			if(userEntity != null) {
				User user = new User();
				user.setId(userEntity.getId());
				user.setName(userEntity.getName());
				user.setEmail(userEntity.getEmail());
				return user;			
			}
			return null;			
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getUserById operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);			
		}
	}

	@Override
	public User getUserByName(String userName) throws ApplicationException {
		// TODO Auto-generated method stub
		return null;
	}

	
	
	public Users getAllUsers(ApiContext apiContext) 
	{
		try {
			Query query;
			String searchFilter = apiContext.getSearchFilter();
			boolean initialize = apiContext.isInitialize();
			
			Query countQuery;
			if(searchFilter != null && searchFilter.trim().length() > 0) {
				query = em.createQuery(Queries.GET_FILTERED_USERS);
				query.setParameter("filter", "%" + searchFilter + "%");
				countQuery = em.createQuery(Queries.COUNT_FILTERED_USERS);
				countQuery.setParameter("filter", "%" + searchFilter + "%");
			}
			else if(initialize) {
				query = em.createQuery(Queries.GET_ALL_USERS_INCLUDING_ADMIN);
				countQuery = em.createQuery(Queries.COUNT_ALL_USERS_INCLUDING_ADMIN);
			}
			else {
				query = em.createQuery(Queries.GET_ALL_USERS);
				countQuery = em.createQuery(Queries.COUNT_ALL_USERS);
			}
			 			
			int start = apiContext.getStart();
			int limit = apiContext.getLimit();
			
			query.setFirstResult(start);
			query.setMaxResults(limit);
			
			List<UserEntity> userEntityList = query.getResultList();
			List<User> userList = new ArrayList<User>();
			Users users = new Users();
			for(UserEntity userEntity: userEntityList) {
				User user = getUser(userEntity);
				userList.add(user);
			}
			users.setUsers(userList);	
						 
			Object count = countQuery.getSingleResult();
			users.setTotal((Long)count);
			
			return users;

		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getAllUsers operation :: " + e.getMessage();
			logger.error(errorMsg);								
		}		
		return null;
	}

	@Override
	public void initDB() throws ApplicationException 
	{
		try {
			ApiContext apiContext = new ApiContext();
			apiContext.setLimit(Integer.MAX_VALUE);
			apiContext.setStart(0);
			apiContext.setInitialize(true);
			
			Users users = getAllUsers(apiContext);
			if(users == null || users.getTotal() == 0) {
				initialize();
			}
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getAllUsers Operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}
		
	}
	
	private void initialize()
	{						
		RoleEntity adminRole = new RoleEntity();
		adminRole.setName("ADMIN");		
		em.persist(adminRole);
				
		RoleEntity customerRole = new RoleEntity();
		customerRole.setName("CUSTOMER");
		em.persist(customerRole);
		
		RoleEntity employeeRole = new RoleEntity();
		employeeRole.setName("EMPLOYEE");
		em.persist(employeeRole);		
		
		UserEntity adminUser = new UserEntity();
		adminUser.setName("super");
		adminUser.setEmail("admin@bhurakshan.com");
		adminUser.setPassword("BhuAdm141013");		
		adminUser.setRole(adminRole);		
		em.persist(adminUser);
	}

	@Override
	public boolean isUserUnique(String email) 
	{
		try {						
			UserEntity userEntity = getUserEntityByEmail(email);
			if(userEntity != null) {
				return (userEntity.getEmail().equals(email))?false:true;
			}
			else {
				return true;
			}
		}			
		catch(Exception e) {
			String errorMsg = "Failed when executing isUserUnique Operation :: " + e.getMessage();
			logger.error(errorMsg);
			return true;
		}				
	}
	
	private UserEntity getCurrentUser()
	{
		String principal = session.getCallerPrincipal().getName();
		if(principal != null) {
			UserEntity userEntity = getUserEntityByEmail(principal);
			return userEntity;
		}
		return null;
	}
	
	private UserEntity getUserEntityByEmail(String email)
	{
		try {
			Query query = em.createQuery(Queries.GET_USER_BY_EMAIL);
			query.setParameter("email", email);
			
			UserEntity userEntity = (UserEntity)query.getSingleResult();
			if(userEntity != null) {
				return userEntity;
			}
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getUserByEmail Operation :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
		}
		return null;
	}
	
	@Override
	public Properties getUserPropertiesByEmail(String email)
	{
		try {
			Query query = em.createQuery(Queries.GET_PROPERTIES_BY_EMAIL);
			query.setParameter("email", email);
			
			List<PropertyEntity> propertyList = (List<PropertyEntity>)query.getResultList();
			List<Property> props = new ArrayList<Property>();
			
			for(PropertyEntity propertyEntity: propertyList) {
				Property property = getProperty(propertyEntity, 0, 0, 0, null);								
				props.add(property);
			}
			
			Properties properties = new Properties();
			properties.setProperties(props);
			
			return properties;			
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getUserPropertiesByEmail Operation for user "+email+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
			
		}
		return null;
	}
	
	private User getUser(UserEntity userEntity)
	{
		User user = new User();
		
		user.setAddress(userEntity.getAddress());
		user.setCountry(userEntity.getCountry());
		user.setEmail(userEntity.getEmail());
		user.setName(userEntity.getName());
		user.setPhone(userEntity.getPhone());
		user.setRegistrationComplete(userEntity.isRegistrationComplete());
		user.setRole(userEntity.getRole().getName());		
		user.setReferer(userEntity.getReferer());
		user.setHowDidYouComeToKnow(userEntity.getHowDidYouComeToKnow());
		
		String couponCode = Utility.encodeToB64(userEntity.getEmail());
		String couponCodeDisplayString = getCouponCodeDisplayString(couponCode);
		
		user.setCouponCode(couponCodeDisplayString);
		
		user.setId(userEntity.getId());
		
		return user;
	}

	@Override
	public User getUser() 
	{
		UserEntity userEntity = getCurrentUser();
		if(userEntity != null) {
			return getUser(userEntity);
		}
		return null;
	}
	
	private Service getService(MONITOR_FREQUENCY frequency, SERVICE_TYPE serviceType)
	{
		try {
			if(serviceType == SERVICE_TYPE.PROPERTY_MONITOR) {
				String serviceStr = serviceType + "_" + frequency;
				SERVICES service = SERVICES.PROPERTY_MONITOR_QUATERLY;
				if(serviceStr.equals("PROPERTY_MONITOR_MONTHLY")) {
					service = SERVICES.PROPERTY_MONITOR_MONTHLY;
				}
				else if(serviceStr.equals("PROPERTY_MONITOR_HALFYEARLY")) {
					service = SERVICES.PROPERTY_MONITOR_HALFYEARLY;
				}
				else if(serviceStr.equals("PROPERTY_MONITOR_YEARLY")) {
					service = SERVICES.PROPERTY_MONITOR_YEARLY;
				}				
				
				return PSLookup.getAdminManager().getService(service);				
			}
									
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getServiceAmount Operation for service "+serviceType+" and frequency "+frequency+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
		}
		return null;		
	}
	
	private Coupon getCoupon(String couponCode)
	{
		try {
			if(couponCode != null && couponCode.trim().length() > 0) {
				return PSLookup.getAdminManager().getCoupon(couponCode);														
			}						
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getDiscount Operation for coupon "+couponCode+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
		}
		return null;
	}
		

	private void validateProperty(String email, String propertyName) throws ApplicationException
	{
		Query countQuery = em.createQuery(Queries.COUNT_PROPERTY);
		countQuery.setParameter("email", email);
		countQuery.setParameter("propertyName", propertyName);
		
		Object count = countQuery.getSingleResult();
		
		if(((Long)count) > 0) {
			String errorMsg = "Property with the name "+propertyName+" already exists";
			logger.error(errorMsg);					
			throw new ApplicationException(errorMsg);
		}
	}
	
	@Override
	public void addNewProperty(Property property) throws ApplicationException 
	{		
		UserEntity userEntity = getCurrentUser();
		
		validateProperty(userEntity.getEmail(), property.getPropertyName());
		
		PropertyEntity propertyEntity = new PropertyEntity();
		propertyEntity.setPropertyName(property.getPropertyName());
		propertyEntity.setCity(property.getCity());
		propertyEntity.setState(property.getState());
		propertyEntity.setPropertyAddress(property.getPropertyAddress());
		propertyEntity.setServiceType(property.getServiceType());
		propertyEntity.setPhone(property.getPhone());
		//propertyEntity.setCouponCode(property.getCouponCode());
		propertyEntity.setCurrentResidence(userEntity.getCountry());
		propertyEntity.setFrequency(property.getFrequency());
		propertyEntity.setOtherServiceDescription(property.getOtherServiceDescription());
		
		propertyEntity.setUser(userEntity);
		
		em.persist(propertyEntity);
	}
	
	public void applyCouponCode(Property property) throws ApplicationException 
	{
		UserEntity userEntity = getCurrentUser();
		if(userEntity != null) {
			List<PropertyEntity> properties = userEntity.getProperties();
			for(PropertyEntity propEntity: properties) {
				String ePropertyName = propEntity.getPropertyName();
				String cPropertyName = property.getPropertyName();
				
				
				String entityCouponCode = propEntity.getCouponCode();
				/**
				 * Coupon code is already applied, you cannot apply the coupon code multiple times.
				 * User coupon code is an exception here.
				 * */
				String newCouponCode = property.getCouponCode();
				if(entityCouponCode != null && entityCouponCode.equals(newCouponCode) && !Utility.isEmpty(newCouponCode)) {
					String userEmail = userEntity.getEmail();
					String couponCode = Utility.encodeToB64(userEmail);
					String displayString = getCouponCodeDisplayString(couponCode);	
					
										
					if(!displayString.equals(newCouponCode))  {
						if(!ePropertyName.equals(cPropertyName)) {
							throw new ApplicationException("The same coupon code cannot be applied to multiple properties. Please change the coupon code. If you have any issues please contact us.");
						}												
					}					
				}
				String propertyName = propEntity.getPropertyName();
				if(propertyName != null && propertyName.equals(property.getPropertyName())) {
					propEntity.setCouponCode(newCouponCode);
				}
			}
		}
	}
	
	private PropertyEntity getPropertyEntity(String propertyName, String email) throws Exception
	{
		UserEntity userEntity = getCurrentUser();
		Query query;
		if(userEntity.getRole().getName().equals("ADMIN") && email != null) {
			query = em.createQuery(Queries.GET_PROPERTY_BY_PROP_NAME_AND_EMAIL);
			query.setParameter("email", email);
		}
		else {
			query = em.createQuery(Queries.GET_PROPERTY_BY_PROP_NAME_AND_EMAIL);
			query.setParameter("email", userEntity.getEmail());
		}
		
		query.setParameter("propertyName", propertyName);
		
		PropertyEntity propEntity = (PropertyEntity)query.getSingleResult();
		return propEntity;
	}
	
	@Override
	public void markPropertyLocation(Property property) throws ApplicationException
	{
		try {
			PropertyEntity propEntity = getPropertyEntity(property.getPropertyName(), property.getUserEmail());
			if(propEntity != null) {
				propEntity.setLatitude(property.getLatitude());
				propEntity.setLongitude(property.getLongitude());
			}
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing markPropertyLocation Operation for property "+property.getPropertyName()+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
			throw new ApplicationException(errorMsg);
		}					
		
	}
	
	private int getDiscount(String country, Coupon coupon)
	{
		if(coupon == null) {
			return 0;
		}
		if(!coupon.isUserCoupon()) {
			return coupon.getDiscountPercent();
		}
		
		UserEntity user = getCurrentUser();		
		if(country.equalsIgnoreCase("india")) {
			return coupon.getDiscountInRs();
		}
		else {
			return coupon.getDiscount();
		}
	}
	
	private String getCurrency(String country)
	{
		if(country.equalsIgnoreCase("india")) {
			return "Rs";
		}
		else {
			return "$";
		}		
	}
	
	private int getServiceAmount(String country, Service service)
	{
		if(country.equalsIgnoreCase("india")) {
			return service.getAmountInRs();
		}
		else {
			return service.getAmount();
		}		
	}	
	
	@Override
	public Property getProperty(String propertyName, String userEmail)
	{
		try {
			PropertyEntity propEntity = getPropertyEntity(propertyName, userEmail);
			UserEntity user = getCurrentUser();
			String couponCode = Utility.encodeToB64(user.getEmail());
			String displayString = getCouponCodeDisplayString(couponCode);			
			
			Coupon coupon = null;
			
			if(displayString != null && displayString.equals(propEntity.getCouponCode())) {
				coupon = getCoupon(couponCode);
			}
			else {
				coupon = getCoupon(propEntity.getCouponCode());
			}													
			
			if(user.getRole().getName().equals("ADMIN")) {
				return getProperty(propEntity, 0, 0, 0, "");
			}
			
			String country = user.getCountry();
			
			SERVICE_TYPE serviceType = propEntity.getServiceType();
			
			int discount = getDiscount(country, coupon);
			
			String currency = getCurrency(country);
			
			if(serviceType == SERVICE_TYPE.PROPERTY_MONITOR) {
				Service service = getService(propEntity.getFrequency(), serviceType);
								
				int amount = getServiceAmount(country, service);
				int total = amount;
				if(coupon != null && !coupon.isUserCoupon()) {
					int disc = (amount*discount)/100;
					total = amount - disc;
					discount = disc;
				}
				else {					
					int discountAllowed = (50*amount)/100;
					if(discount > discountAllowed) {
						total = amount - discountAllowed;
						discount = discountAllowed;
					}
					else if(discount > 0){
						total = amount - discount;
					}
				}
				if(propEntity != null) {				
					return getProperty(propEntity, amount, discount, total, currency);
				}													
			}
			else {
				return getProperty(propEntity, 0, discount, 0, currency);
			}
			
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getProperty Operation for property "+propertyName+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
			
		}	
		return null;
	}
	
	private Property getProperty(PropertyEntity propEntity, int amount, int discount, int total, String currency)
	{
		Property property = new Property();
		property.setLatitude(propEntity.getLatitude());
		property.setLongitude(propEntity.getLongitude());
		property.setPhone(propEntity.getPhone());
		property.setPropertyAddress(propEntity.getPropertyAddress());
		property.setCity(propEntity.getCity());
		property.setState(propEntity.getState());
		property.setPropertyName(propEntity.getPropertyName());
		property.setServiceType(propEntity.getServiceType());
		property.setSubscriptionType(propEntity.getSubscriptionType());
		property.setDiscount(discount);
		property.setServiceAmount(amount);
		property.setTotalAmount(total);
		property.setCurrency(currency);
		property.setFrequency(propEntity.getFrequency());
		property.setId(propEntity.getId());
		property.setCurrentResidence(propEntity.getCurrentResidence());
		property.setCouponCode(propEntity.getCouponCode());
		property.setOtherServiceDescription(propEntity.getOtherServiceDescription());
		return property;
	}
	
		
	@Override
	public List<Property> getAllProperties() throws ApplicationException 
	{
		UserEntity userEntity = getCurrentUser();
		List<PropertyEntity> propEntities = userEntity.getProperties();
		List<Property> properties = new ArrayList<Property>();
		
		for(PropertyEntity propEntity: propEntities) {
			
			Property property = getProperty(propEntity, 0, 0, 0, null);
			
			properties.add(property);
		}
		
		return properties;
	}
	
	@Override
	public void forgotPassword(String email) throws ApplicationException
	{
		try {
			Query query = em.createQuery(Queries.GET_USER_BY_EMAIL);
			query.setParameter("email", email);
			
			UserEntity userEntity = (UserEntity)query.getSingleResult();
			if(userEntity != null) {
				EmailHelper.sendPasswordViaEmail(userEntity.getEmail(), userEntity.getName(), userEntity.getPassword());				
			}
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing forgotPassword Operation for email "+email+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);
			throw new ApplicationException(errorMsg);
		}		
	}
	
	@Override
	public Coupon getMyCredits()
	{
		UserEntity userEntity = getCurrentUser();
		String email = userEntity.getEmail();
		String couponCode = Utility.encodeToB64(email);
		try {
			AdminManager adminManager = PSLookup.getAdminManager();
			String country = userEntity.getCountry();
			Coupon coupon = adminManager.getCoupon(couponCode);
			if(country.equalsIgnoreCase("india")) {
				coupon.setDiscount(0);
			}
			else {
				coupon.setDiscountInRs(0);
			}
			return coupon;
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getMyCredits Operation for email "+email+" :: " + e.getMessage();
			logger.error(errorMsg);	
			logger.error(e);			
		}
		
		return null;
		
	}

	@Override
	public void changePassword(String newPassword, String oldPassword) throws ApplicationException 
	{
		UserEntity userEntity = getCurrentUser();
		String password = userEntity.getPassword();
		if(!password.equals(oldPassword)) {
			throw new ApplicationException("Incorrect Old Password");			
		}
		else if(oldPassword.equals(newPassword)) {
			throw new ApplicationException("Old Password and the New Password are the same. Please enter a different password.");
		}
		else {
			userEntity.setPassword(newPassword);
		}
		
	}
	
	private String getUserCouponCode(String email)
	{
		if(!Utility.isEmpty(email)) {
			String couponCode = Utility.encodeToB64(email);
			return getCouponCodeDisplayString(couponCode);
		}
		return null;
	}

	@Override
	public void changeSubscriptionStatus(String email, String propertyName, String sType) throws ApplicationException 
	{
		UserEntity user = getCurrentUser();
		
		if(user.getRole().getName().equals("ADMIN")) {
			try {
				PropertyEntity propEntity = null;
				
				UserEntity propertyOwner = getUserEntityByEmail(email);
				List<PropertyEntity> properties = propertyOwner.getProperties();
				boolean dontAddCredits = false;
				for(PropertyEntity property: properties) {
					if(property.getSubscriptionType() == SUBSCRIPTION_TYPE.ACTIVE) {
						dontAddCredits = true;						
					}
					if(property.getPropertyName().equals(propertyName)) {
						propEntity = property;
					}
				}
				
				if("ACTIVE".equals(sType)) {
					propEntity.setSubscriptionType(SUBSCRIPTION_TYPE.ACTIVE);
					
					String couponCode = propEntity.getCouponCode();					
					String userCouponCode = getUserCouponCode(email);
					
					if(userCouponCode.equals(couponCode)) {	
						if(propEntity.getServiceType() == SERVICE_TYPE.PROPERTY_MONITOR) {
							Service service = getService(propEntity.getFrequency(), propEntity.getServiceType());														
							if(service != null) {
								
								String country = propertyOwner.getCountry();
								String longCoupon = Utility.encodeToB64(email);
								int amount = getServiceAmount(country, service);
								Coupon coupon = getCoupon(longCoupon);
								int discount = getDiscount(country, coupon);
																
								int discountAllowed = (50*amount)/100;
								int remainingDiscount = 0;
								if(discount > discountAllowed) {																		
									remainingDiscount = discount - discountAllowed;
								}
								int remainingDiscountInRs = 0;
								int remainingDiscountInDollars = remainingDiscount;
								
								if(country.equalsIgnoreCase("india")) {
									remainingDiscountInRs = remainingDiscount;
									remainingDiscountInDollars = 0;									
								}
								PSLookup.getAdminManager().userCouponAvailed(longCoupon, remainingDiscountInRs, remainingDiscountInDollars);
								
							}
							
						}								
						
					}
					
					if(!dontAddCredits) {
						//UserEntity userEntity = getUserEntityByEmail(email);
						String referer = propertyOwner.getReferer();
						if(!Utility.isEmpty(referer)) {
							PSLookup.getAdminManager().addDiscount(referer);
						}																	
					}
															
					EmailHelper.sendSubscriptionActiveEmail(getUser(propertyOwner), getProperty(propEntity, 0, 0, 0, ""));
				}
				else if("NOT_SUBSCRIBED".equals(sType)) {
					propEntity.setSubscriptionType(SUBSCRIPTION_TYPE.NOT_SUBSCRIBED);
				}
				Date date = new Date();
				propEntity.setSubscriptionDate(date.toString());
				
			}
			catch(Exception e) {
				String errorMsg = "Failed when executing changeSubscriptionStatus Operation for property "+propertyName+" :: " + e.getMessage();
				logger.error(errorMsg);	
				logger.error(e);
				
			}			
			
			
		}	
		
	}

}
