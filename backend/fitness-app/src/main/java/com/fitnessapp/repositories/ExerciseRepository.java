package com.fitnessapp.repositories;

import com.fitnessapp.entities.Exercise;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
	Optional<Exercise> findByName(String name);

	@Query("SELECT e FROM Exercise e WHERE "
			+ "(:name IS NULL OR :name = '' OR LOWER(e.name) LIKE LOWER(CONCAT('%', :name, '%'))) AND "
			+ "(:muscularGroup IS NULL OR :muscularGroup = '' OR LOWER(e.muscularGroup) LIKE LOWER(CONCAT('%', :muscularGroup, '%')))")
	Page<Exercise> searchByCriteria(String name, String muscularGroup, Pageable pageable);
}
