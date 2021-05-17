package com.project.customers.service;

import com.project.customers.entity.Category;
import com.project.customers.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("CategoryService")
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    public List<Category> getAllCategories() {
        return repository.findAll();
    }

    public Category getCategoryById(Long id) {
        Optional<Category> saved = repository.findById(id);
        return saved.orElse(null);
    }

    public Category createCategory(Category category) {
        repository.save(category);
        Optional<Category> savedCategory = repository.findById(category.getId());
        return savedCategory.orElse(null);
    }

    public Category updateCategory(Long id, Category category) {
        Optional<Category> saved = repository.findById(id);
        if (saved.isPresent()) {
            repository.save(category);

            saved = repository.findById(id);
            return saved.orElse(null);
        }
        return null;
    }

    public boolean deleteCategory(Long id) {
        repository.deleteById(id);
        Optional<Category> saved = repository.findById(id);
        return !saved.isPresent();
    }
}
