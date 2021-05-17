package com.project.customers.service;

import com.project.customers.entity.Email;
import com.project.customers.repository.EmailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("EmailService")
public class EmailService {

    @Autowired
    private EmailRepository emailRepository;

    public List<Email> getAllEmails() {
        return emailRepository.findAll();
    }

    public Email getEmailById(Long id) {
        Optional<Email> saved = emailRepository.findById(id);
        return saved.orElse(null);
    }

    public List<Email> getEmailByCustomerId(Long customerId) {
        return emailRepository.findAllByCustomerId(customerId);
    }

    public Email createEmail(Email email) {
        emailRepository.save(email);
        Optional<Email> saved = emailRepository.findById(email.getId());
        return saved.orElse(null);
    }

    public Email updateEmail(Long id, Email email) {
        Optional<Email> saved = emailRepository.findById(id);
        if (saved.isPresent()) {
            emailRepository.save(email);

            saved = emailRepository.findById(id);
            return saved.orElse(null);
        }
        return null;
    }

    public boolean deleteEmail(Long id) {
        emailRepository.deleteById(id);
        Optional<Email> saved = emailRepository.findById(id);
        return !saved.isPresent();
    }
}
