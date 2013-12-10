package com.ps.shared.jpa;

import org.hibernate.annotations.OptimisticLockType;
import javax.persistence.*;
import javax.xml.bind.annotation.XmlTransient;
import java.sql.Date;

@Entity
@org.hibernate.annotations.Entity(optimisticLock = OptimisticLockType.VERSION)
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class PlatformEntity
{
    private int id;

    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    public int getId()
    {
        return id;
    }

    public void setId(int id)
    {
        this.id = id;
    }

    private Integer version;

    @Version
    public Integer getVersion()
    {
        return version;
    }

    public void setVersion(Integer version)
    {
        this.version = version;
    }

    private Date createdDate;

    @Basic
    @XmlTransient
    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    private Date lastModifiedDate;

    @Basic
    @XmlTransient
    public Date getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(Date lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    private String comment;

    @Basic
    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    private String createdBy;

    @Basic
    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    private String lastModifiedBy;

    @Basic
    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }
}