package com.ps.platform.users.jpa;

public class Queries 
{
	public static String GET_ALL_USERS = "SELECT u FROM UserEntity u WHERE u.email != 'admin@bhurakshan.com'";
	public static String GET_ALL_USERS_INCLUDING_ADMIN = "SELECT u FROM UserEntity u";
	public static String COUNT_ALL_USERS_INCLUDING_ADMIN = "SELECT COUNT(u) FROM UserEntity u";
	public static String COUNT_ALL_USERS = "SELECT COUNT(u) FROM UserEntity u WHERE u.email != 'admin@bhurakshan.com'";
	public static String GET_FILTERED_USERS = "SELECT u FROM UserEntity u WHERE u.email != 'admin@bhurakshan.com' AND u.name LIKE :filter OR u.address LIKE :filter OR u.email LIKE :filter OR u.phone LIKE :filter";
	public static String COUNT_FILTERED_USERS = "SELECT COUNT(u) FROM UserEntity u WHERE u.email != 'admin@bhurakshan.com' AND u.name LIKE :filter OR u.address LIKE :filter OR u.email LIKE :filter OR u.phone LIKE :filter";
	
	public static String GET_USER_BY_EMAIL = "SELECT u FROM UserEntity u WHERE u.email = :email";
	public static String GET_ROLE_BY_NAME = "SELECT r FROM RoleEntity r WHERE r.name = :name";	
	public static String GET_PROPERTIES_BY_EMAIL = "SELECT p FROM PropertyEntity p, UserEntity u WHERE u.email = :email AND u.id = p.user.id";
	public static String GET_PROPERTY_BY_PROP_NAME_AND_EMAIL = "SELECT p FROM PropertyEntity p WHERE p.user.email = :email AND p.propertyName = :propertyName";		
	
	public static String GET_UPLOADED_IMAGE_BY_PATH = "SELECT i FROM ImageEntity i WHERE i.imagePath = :path";
	public static String GET_UPLOADED_IMAGE_DATE_BY_PROPERTY_NAME_AND_EMAIL = "SELECT DISTINCT i.monthAndYear FROM ImageEntity i WHERE i.propertyName = :propertyName AND i.userEmail = :userEmail";	
	public static String GET_UPLOADED_IMAGE_BY_PROPERTY_NAME_AND_EMAIL = "SELECT i FROM ImageEntity i WHERE i.propertyName = :propertyName AND i.userEmail = :userEmail and i.monthAndYear = :monthAndYear";			
	public static String GET_DISCOUNT = "SELECT c FROM CouponEntity c WHERE c.id = (SELECT MAX(id) FROM CouponEntity WHERE couponCode = :couponCode or displayString = :couponCode)";
	public static String GET_SERVICE_AMOUNT = "SELECT s FROM ServiceEntity s WHERE id = (SELECT MAX(id) FROM ServiceEntity WHERE service = :service)";	
	public static String GET_COUPON = "SELECT c FROM CouponEntity c WHERE c.userEmail = :userEmail";
	public static String COUNT_PROPERTY = "SELECT count(p) FROM PropertyEntity p WHERE p.user.email = :email AND p.propertyName = :propertyName";	
	public static String COUNT_SERVICES = "SELECT COUNT(s) FROM ServiceEntity s";
	
}
