package com.project.customers.controller;

import com.project.customers.entity.Email;
import com.project.customers.service.EmailService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/email")
public class EmailController {

    @Resource(name = "EmailService")
    private EmailService emailService;

    @GetMapping()
    public ResponseEntity<List<Email>> getAllEmails() {
        List<Email> response = emailService.getAllEmails();

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : response.isEmpty() ? HttpStatus.NO_CONTENT
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Email> getEmail(@PathVariable(value = "id") Long id) {
        Email response = emailService.getEmailById(id);

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Email>> getEmailByCustomerId(@PathVariable(value = "customerId") Long customerId) {
        List<Email> response = emailService.getEmailByCustomerId(customerId);

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @PostMapping()
    public ResponseEntity<Email> createEmail(@RequestBody Email email) {
        Email response = emailService.createEmail(email);

        HttpStatus httpStatus
                = response == null ? HttpStatus.BAD_REQUEST
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Email> updateEmail(@PathVariable(value = "id") Long id,
                                                   @RequestBody Email email) {
        Email response = emailService.updateEmail(id, email);

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteEmail(@PathVariable(value = "id") Long id) {
        boolean response = emailService.deleteEmail(id);

        HttpStatus httpStatus
                = !response ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(httpStatus);
    }
}
