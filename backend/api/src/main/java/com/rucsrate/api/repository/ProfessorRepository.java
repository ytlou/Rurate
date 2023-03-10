package com.rucsrate.api.repository;

import com.rucsrate.api.model.Course;
import com.rucsrate.api.model.Professor;
import com.rucsrate.api.model.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessorRepository extends MongoRepository<Professor, String> {
    @Override
    List<Professor> findAll();

    Professor findByName(String name);

    Professor findBy_id(String id);
}
