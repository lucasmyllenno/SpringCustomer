package com.project.customers.controller;

import com.project.customers.entity.Category;
import com.project.customers.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/email-category")
public class CategoryController {

    @Resource(name = "CategoryService")
    private CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> response = categoryService.getAllCategories();

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : response.isEmpty() ? HttpStatus.NO_CONTENT
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable(value = "id") Long id) {
        Category response = categoryService.getCategoryById(id);

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @PostMapping()
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category response = categoryService.createCategory(category);

        HttpStatus httpStatus
                = response == null ? HttpStatus.BAD_REQUEST
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable(value = "id") Long id,
                                                   @RequestBody Category category) {
        Category response = categoryService.updateCategory(id, category);

        HttpStatus httpStatus
                = response == null ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(response, httpStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteCategory(@PathVariable(value = "id") Long id) {
        boolean response = categoryService.deleteCategory(id);

        HttpStatus httpStatus
                = !response ? HttpStatus.NOT_FOUND
                : HttpStatus.OK;

        return new ResponseEntity<>(httpStatus);
    }
}
