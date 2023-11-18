package com.fitnessapp.service;

import com.fitnessapp.entities.Exercise;
import com.fitnessapp.exceptions.NameAlreadyUsedException;
import org.springframework.util.StringUtils;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;
import com.fitnessapp.repositories.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ExerciseService {

	private final ExerciseRepository exerciseRepository;

	@Autowired
	public ExerciseService(ExerciseRepository exerciseRepository) {
		this.exerciseRepository = exerciseRepository;
	}

	public Exercise saveExercise(Exercise exercise) {
		validateExerciseFields(exercise);

		if (nameExist(exercise.getName())) {
			throw new NameAlreadyUsedException("Nome: já registrado");
		}
		return exerciseRepository.save(exercise);
	}

    public Page<Exercise> searchExercises(String searchName, String searchMuscularGroup, int pageNumber, int pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);

        return exerciseRepository.searchByCriteria(
            searchName,
            searchMuscularGroup,
            pageable
        );
    }

    public Exercise findById(Long id) {
        return exerciseRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Exercício com ID: " + id + " não foi encontrado"));
    }
	
	public Exercise updateExercise(Long id, Map<String, Object> updates) {
        if (updates.isEmpty()) {
            throw new IllegalArgumentException("Nenhum campo para atualização foi fornecido.");
        }

		Exercise exercise = exerciseRepository.findById(id)
				.orElseThrow(() -> new IllegalArgumentException("Exercício com ID: " + id + " não foi encontrado"));

		validateAndUpdateFields(exercise, updates);
		return exerciseRepository.save(exercise);
	}
	
    public void deleteExercise(Long id) {
        if (!exerciseRepository.existsById(id)) {
            throw new IllegalArgumentException("Exercício com ID: " + id + " não foi encontrado");
        }
        exerciseRepository.deleteById(id);
    }

	private void validateAndUpdateFields(Exercise exercise, Map<String, Object> updates) {
		updates.forEach((key, value) -> {
			switch (key) {
			case "name":
				updateName(exercise, (String) value);
				break;
			case "image":
				updateImage(exercise, (String) value);
				break;
			case "muscularGroup":
				updateMuscularGroup(exercise, (String) value);
				break;
			default:
				break;
			}
		});
	}

	private void updateName(Exercise exercise, String name) {
		if (StringUtils.hasText(name)) {
			validateName(name);
			exercise.setName(name);
		}
	}

	private void updateImage(Exercise exercise, String image) {
		if (StringUtils.hasText(image)) {
			validateImage(image);
			exercise.setImage(image);
		}
	}

	private void updateMuscularGroup(Exercise exercise, String muscularGroup) {
		if (StringUtils.hasText(muscularGroup)) {
			validateMuscularGroup(muscularGroup);
			exercise.setMuscularGroup(muscularGroup);
		}
	}

	private boolean nameExist(String name) {
		return exerciseRepository.findByName(name).isPresent();
	}

	private void validateExerciseFields(Exercise exercise) {
		validateName(exercise.getName());
		validateImage(exercise.getImage());
		validateMuscularGroup(exercise.getMuscularGroup());
	}

	private void validateName(String name) {
		if (!StringUtils.hasText(name)) {
			throw new IllegalArgumentException("Nome: é obrigatório");
		} else if (name.length() > 100) {
			throw new IllegalArgumentException("Nome inválido: deve conter até 100 caractéres");
		} else if (name.length() < 4) {
			throw new IllegalArgumentException("Nome inválido: deve conter pelo menos 04 caractéres");
		}
	}

	private void validateImage(String image) {
		if (!StringUtils.hasText(image)) {
			throw new IllegalArgumentException("Url: é obrigatório");
		} else if (!isValidImageFormat(image)) {
			throw new IllegalArgumentException("URL inválida: deve ser um destes formatos: 'jpg|gif|png|jpeg' ");
		} else if (image.length() > 255) {
			throw new IllegalArgumentException("URL inválida: pode conter até 255 caractéres");
		}
	}

	private boolean isValidImageFormat(String image) {
		String imageRegex = "^(http(s?):)([/|.|\\w|\\s|-])*\\.(?:jpg|gif|png|jpeg)$";
		Pattern pattern = Pattern.compile(imageRegex, Pattern.CASE_INSENSITIVE);
		return pattern.matcher(image).matches();
	}

	private void validateMuscularGroup(String muscularGroup) {
		List<String> validGroups = Arrays.asList("BICEPS", "TRICEPS", "PEITO", "COSTAS", "LOMBAR", "ABDÓMEN", "PERNAS");
		if (!validGroups.contains(muscularGroup.toUpperCase())) {
			throw new IllegalArgumentException(
					"Grupo muscular inválido. Deve ser um dos seguintes: BICEPS, TRICEPS, PEITO, COSTAS, LOMBAR, ABDÓMEN, PERNAS.");
		}
	}
}
