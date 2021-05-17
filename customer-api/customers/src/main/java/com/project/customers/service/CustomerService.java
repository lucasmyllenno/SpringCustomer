package com.project.customers.service;

import com.project.customers.entity.Category;
import com.project.customers.entity.Customer;
import com.project.customers.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("CustomerService")
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return this.customerRepository.findAll();
    }

    public Customer getCustomerById(Long id) {
        Optional<Customer> saved = customerRepository.findById(id);
        return saved.orElse(null);
    }

    public Customer createCustomer(Customer customer) {
        customerRepository.save(customer);
        Optional<Customer> saved = customerRepository.findById(customer.getId());
        return saved.orElse(null);
    }

    public Customer updateCustomer(Long id, Customer customer) {
        Optional<Customer> saved = customerRepository.findById(id);
        if (saved.isPresent()) {
            customerRepository.save(customer);

            saved = customerRepository.findById(id);
            return saved.orElse(null);
        }
        return null;
    }

    public boolean deleteCustomer(Long id) {
        customerRepository.deleteById(id);
        Optional<Customer> saved = customerRepository.findById(id);
        return !saved.isPresent();
    }
}
