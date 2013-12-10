package com.ps.shared.interfaces;

import java.util.List;

import javax.ejb.Local;
import javax.ejb.Remote;

import com.ps.shared.dataobjects.ApiContext;
import com.ps.shared.dataobjects.Coupon;
import com.ps.shared.dataobjects.Properties;
import com.ps.shared.dataobjects.Property;
import com.ps.shared.dataobjects.User;
import com.ps.shared.dataobjects.Users;
import com.ps.shared.email.Email;
import com.ps.shared.exception.ApplicationException;

@Remote
public interface UserManager extends DatabaseInitializer
{
	public void addUser(User user) throws ApplicationException;
	public void deleteUser(int userId) throws ApplicationException;
	public void modifyUser(User user) throws ApplicationException;
	public void modifyProfile(User user) throws ApplicationException;
	public User getUserById(int userId) throws ApplicationException;
	public User getUser() throws ApplicationException;
	public User getUserByName(String userName) throws ApplicationException;
	//public List<User> getAllUsers() throws ApplicationException; 
	public boolean isUserUnique(String email) throws ApplicationException;
	public void addNewProperty(Property property) throws ApplicationException;
	public List<Property> getAllProperties() throws ApplicationException;
	public Properties getUserPropertiesByEmail(String email);
	public void markPropertyLocation(Property property) throws ApplicationException;
	public Property getProperty(String propertyName, String userEmail);
	public void forgotPassword(String email) throws ApplicationException;
	public Coupon getMyCredits();
	public Users getAllUsers(ApiContext apiContext);
	public void addInternalUser(User user) throws ApplicationException;	
	public void changePassword(String newPassword, String oldPassword) throws ApplicationException;
	public void changeSubscriptionStatus(String email, String propertyName, String sType) throws ApplicationException;
	public void applyCouponCode(Property property) throws ApplicationException;
}
