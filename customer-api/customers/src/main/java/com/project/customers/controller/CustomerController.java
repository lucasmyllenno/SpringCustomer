package com.project.customers.controller;

import com.project.customers.entity.Customer;
import com.project.customers.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Resource(name = "CustomerService")
    private CustomerService customerService;

    @GetMapping()
    public ResponseEntity<List<Customer>> getAllCategories() {
        List<Customer> response = customerService.getAllCustomers();

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : response.isEmpty() ? HttpStatus.NO_CONTENT
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable(value = "id") Long id) {
        Customer response = customerService.getCustomerById(id);

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @PostMapping()
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer response = customerService.createCustomer(customer);

        HttpStatus httpStatus
                = response == null ? HttpStatus.BAD_REQUEST
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable(value = "id") Long id,
                                                   @RequestBody Customer customer) {
        Customer response = customerService.updateCustomer(id, customer);

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCustomer(@PathVariable(value = "id") Long id) {
        boolean response = customerService.deleteCustomer(id);

        HttpStatus httpStatus
                = !response ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(httpStatus);
    }
}
