package com.ps.platform.users.ejb;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.jboss.logging.Logger;

import com.ps.platform.users.jpa.CouponEntity;
import com.ps.platform.users.jpa.Queries;
import com.ps.platform.users.jpa.ServiceEntity;
import com.ps.shared.Constants.SERVICES;
import com.ps.shared.dataobjects.Coupon;
import com.ps.shared.dataobjects.Service;
import com.ps.shared.exception.ApplicationException;
import com.ps.shared.interfaces.AdminManager;

@Stateless
public class AdminManagerBean implements AdminManager
{

	@PersistenceContext(unitName="platform")
	private EntityManager em;
	
	Logger logger = Logger.getLogger(AdminManagerBean.class.getName());
	
	@Override
	public void addCoupon(Coupon coupon) throws ApplicationException 
	{
		try {
			CouponEntity couponEntity = new CouponEntity();
			couponEntity.setCouponCode(coupon.getCouponCode());
			couponEntity.setDisplayString(coupon.getDisplayString());
			couponEntity.setCouponType(coupon.getCouponType());
			couponEntity.setUserEmail(coupon.getUserEmail());
			couponEntity.setDiscount(coupon.getDiscount());			
			couponEntity.setValidUpto(coupon.getValidUpto());
			couponEntity.setDiscountInRs(coupon.getDiscountInRs());
			couponEntity.setDiscountPercent(coupon.getDiscountPercent());
			couponEntity.setUserCoupon(coupon.isUserCoupon());
			
			em.persist(couponEntity);
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing addCoupon operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}		
	}
	
	@Override
	public void addDiscount(String userEmail) throws ApplicationException 
	{
		try {
			Query query = em.createQuery(Queries.GET_COUPON);
			query.setParameter("userEmail", userEmail);
			
			CouponEntity couponEntity =  (CouponEntity)query.getSingleResult();		
			int discount = couponEntity.getDiscount();
			discount = discount + 5;
			
			int discountInRs = couponEntity.getDiscountInRs();
			discountInRs = discountInRs + 200;
			
			couponEntity.setDiscount(discount);			
			couponEntity.setDiscountInRs(discountInRs);
			
			int referralCount = couponEntity.getReferralCount();
			couponEntity.setReferralCount(referralCount + 1);
			
			em.persist(couponEntity);
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing addCoupon operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}		
	}	

	@Override
	public void addService(Service service) throws ApplicationException 
	{
		try {
			ServiceEntity serviceEntity = new ServiceEntity();
			serviceEntity.setAmount(service.getAmount());
			serviceEntity.setService(service.getService());
			serviceEntity.setAmountInRs(service.getAmountInRs());
			
			em.persist(serviceEntity);
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing addService operation :: " + e.getMessage();
			logger.error(errorMsg);
			throw new ApplicationException(errorMsg);
		}		
		
	}
	
	public void userCouponAvailed(String couponCode, int remainingDiscountInRs, int remainingDiscountInDollars)
	{
		try {
			Query query = em.createQuery(Queries.GET_DISCOUNT);
			query.setParameter("couponCode", couponCode);
			
			CouponEntity cEntity =  (CouponEntity)query.getSingleResult();

			cEntity.setDiscount(remainingDiscountInDollars);
			cEntity.setDiscountInRs(remainingDiscountInRs);
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing userCouponAvailed operation for coupon :: " + couponCode + " - "+ e.getMessage();
			logger.error(errorMsg);
		}		
	}
	
	
	public Coupon getCoupon(String couponCode)
	{
		try {
			Query query = em.createQuery(Queries.GET_DISCOUNT);
			query.setParameter("couponCode", couponCode);
			
			CouponEntity cEntity =  (CouponEntity)query.getSingleResult();
			
			Coupon coupon = new Coupon();
			coupon.setCouponCode(couponCode);
			coupon.setDiscount(cEntity.getDiscount());
			coupon.setDiscountInRs(cEntity.getDiscountInRs());
			coupon.setDisplayString(cEntity.getDisplayString());
			coupon.setCouponType(cEntity.getCouponType());
			coupon.setUserEmail(cEntity.getUserEmail());
			coupon.setValidUpto(cEntity.getValidUpto());
			coupon.setReferralCount(cEntity.getReferralCount());
			coupon.setDiscountPercent(cEntity.getDiscountPercent());
			coupon.setUserCoupon(cEntity.isUserCoupon());
			return coupon;
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getCoupon operation for coupon :: " + couponCode + " - "+ e.getMessage();
			logger.error(errorMsg);
		}
		return null;
	}

	
	public Service getService(SERVICES service)
	{
		try {
			Query query = em.createQuery(Queries.GET_SERVICE_AMOUNT);
			query.setParameter("service", service);
			ServiceEntity se = (ServiceEntity)query.getSingleResult();
			
			Service s = new Service();
			s.setAmount(se.getAmount());
			s.setAmountInRs(se.getAmountInRs());
			s.setServices(se.getService());
			return s;
		}
		catch(Exception e) {
			String errorMsg = "Failed when executing getService operation for service :: " + service + " - "+ e.getMessage();
			logger.error(errorMsg);
			
		}
		return null;		
	}

	@Override
	public void initDB() throws ApplicationException {
		
		Query query = em.createQuery(Queries.COUNT_SERVICES);
		Long count = (Long)query.getSingleResult();
		if(count == 0) {
			Service quaterlyServiceForMonitoring = new Service();
			quaterlyServiceForMonitoring.setAmount(100);
			quaterlyServiceForMonitoring.setAmountInRs(4000);
			quaterlyServiceForMonitoring.setServices(SERVICES.PROPERTY_MONITOR_QUATERLY);
			
			addService(quaterlyServiceForMonitoring);
			
			Service monthlyServiceForMonitoring = new Service();
			monthlyServiceForMonitoring.setAmount(200);
			monthlyServiceForMonitoring.setAmountInRs(7000);
			monthlyServiceForMonitoring.setServices(SERVICES.PROPERTY_MONITOR_MONTHLY);
			
			addService(monthlyServiceForMonitoring);
			
			Service halfYearlyServiceForMonitoring = new Service();
			halfYearlyServiceForMonitoring.setAmount(50);
			halfYearlyServiceForMonitoring.setAmountInRs(2000);
			halfYearlyServiceForMonitoring.setServices(SERVICES.PROPERTY_MONITOR_HALFYEARLY);
			
			addService(halfYearlyServiceForMonitoring);
			
			Service yearlyServiceForMonitoring = new Service();
			yearlyServiceForMonitoring.setAmount(25);
			yearlyServiceForMonitoring.setAmountInRs(1000);
			yearlyServiceForMonitoring.setServices(SERVICES.PROPERTY_MONITOR_YEARLY);
			
			addService(yearlyServiceForMonitoring);			
		}
		

		
	}

}
