package ch.egli.training.util;

import ch.egli.training.exception.ResourceNotFoundException;
import ch.egli.training.model.Benutzer;
import ch.egli.training.model.Workout;
import ch.egli.training.repository.BenutzerRepository;
import ch.egli.training.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 2/4/16.
 */
@Component
public class ResourceValidator {

    @Autowired
    private BenutzerRepository benutzerRepository;

    @Autowired
    private WorkoutRepository workoutRepository;

    public void validateUser(final String benutzername) throws ResourceNotFoundException {
        final Benutzer benutzer = benutzerRepository.findByBenutzername(benutzername);
        if (benutzer == null) {
            throw new ResourceNotFoundException("User '" + benutzername + "' not found");
        }
    }

    public void validateWorkout(final Long workoutId) throws ResourceNotFoundException {
        final Optional<Workout> workout = workoutRepository.findById(workoutId);
        if (!workout.isPresent()) {
            throw new ResourceNotFoundException("Workout with id " + workoutId + " not found");
        }
    }



}
