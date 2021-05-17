package com.project.customers.repository;

import com.project.customers.entity.Email;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmailRepository extends JpaRepository<Email, Long> {

    @Query("SELECT email FROM Email email WHERE email.customer.id = :customerId")
    List<Email> findAllByCustomerId(@Param("customerId") Long customerId);
}