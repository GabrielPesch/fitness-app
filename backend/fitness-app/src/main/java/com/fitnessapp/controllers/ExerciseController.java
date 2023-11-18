package com.fitnessapp.controllers;

import com.fitnessapp.entities.Exercise;
import com.fitnessapp.exceptions.EmailAlreadyUsedException;
import com.fitnessapp.service.ExerciseService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {

	private final ExerciseService exerciseService;

	@Autowired
	public ExerciseController(ExerciseService exerciseService) {
		this.exerciseService = exerciseService;
	}

	@PostMapping
	public ResponseEntity<?> insert(@RequestBody Exercise exercise) {
		Exercise savedExercise = exerciseService.saveExercise(exercise);
		return ResponseEntity.ok(savedExercise);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Exercise> getExerciseById(@PathVariable Long id) {
		Exercise exercise = exerciseService.findById(id);
		return ResponseEntity.ok(exercise);
	}

    @GetMapping("/search")
    public ResponseEntity<Page<Exercise>> searchExercises(
            @RequestParam(value = "name", required = false) String searchName,
            @RequestParam(value = "muscularGroup", required = false) String searchMuscularGroup,
            @RequestParam(value = "page", defaultValue = "0") int pageNumber,
            @RequestParam(value = "size", defaultValue = "10") int pageSize) {

        Page<Exercise> exercises = exerciseService.searchExercises(searchName, searchMuscularGroup, pageNumber, pageSize);
        return ResponseEntity.ok(exercises);
    }

	@PatchMapping("/{id}")
	public ResponseEntity<Exercise> updateExercise(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
		Exercise updatedExercise = exerciseService.updateExercise(id, updates);
		return ResponseEntity.ok(updatedExercise);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteExercise(@PathVariable Long id) {
		exerciseService.deleteExercise(id);
		return ResponseEntity.ok("Sucesso");

	}

	@ExceptionHandler(EmailAlreadyUsedException.class)
	public ResponseEntity<?> handleNameAlreadyUsed(EmailAlreadyUsedException exception) {
		return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException exception) {
		return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
	}
}
