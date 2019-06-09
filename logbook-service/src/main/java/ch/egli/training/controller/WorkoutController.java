package ch.egli.training.controller;

import ch.egli.training.exception.BadRequestException;
import ch.egli.training.model.Workout;
import ch.egli.training.repository.WorkoutRepository;
import ch.egli.training.util.PagingInfo;
import ch.egli.training.util.ResourceValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/8/19.
 */
@Controller
@RequestMapping("/v1")
@Slf4j
public class WorkoutController {

    private final static String PAGING_INFO = "PAGING_INFO";

    private final static String USERS_ALL = "all";
    private final static String GROUP_EGLI_SISTERS = "groupEgliSisters";
    private final static String GROUP_EGLI_SISTERS__NAME_1 = "zoe";
    private final static String GROUP_EGLI_SISTERS__NAME_2 = "liv";

    private Sort workoutSort = new Sort(Sort.Direction.DESC, "datum");

    public WorkoutController(WorkoutRepository workoutRepository, ResourceValidator resourceValidator) {
        this.workoutRepository = workoutRepository;
        this.resourceValidator = resourceValidator;
    }

    private WorkoutRepository workoutRepository;
    private ResourceValidator resourceValidator;


    @GetMapping(value = "/users/{benutzername}/workouts/{year}")
    public ResponseEntity<List<Workout>> getWorkouts(@PathVariable String benutzername,
                                                     @PathVariable Integer year,
                                                     @RequestParam(value = "page", required = false, defaultValue = "0") final int page,
                                                     @RequestParam(value = "size", required = false, defaultValue = "8") final int size,
                                                     HttpServletResponse response) {

        final PagingInfo pagingInfo = new PagingInfo(page, size, workoutRepository.countByBenutzername(benutzername));
        response.addHeader(PAGING_INFO, pagingInfo.toString());

        final List<Workout> allWorkouts = workoutRepository.findByBenutzername(benutzername, PageRequest.of(page, size, workoutSort)).getContent();
        return ResponseEntity.ok(allWorkouts);
    }

    @RequestMapping(value="/public/lastworkouts", method= RequestMethod.GET)
    public ResponseEntity<Iterable<Workout>> getLastPublicWorkouts() {
        final Iterable<Workout> publicWorkouts = workoutRepository.findTop8ByOrderByDatumDesc();
        return new ResponseEntity<Iterable<Workout>>(publicWorkouts, HttpStatus.OK);
    }

    @RequestMapping(value="/users/{benutzername}/workouts", method= RequestMethod.GET)
    public ResponseEntity<Iterable<Workout>> getWorkouts(@PathVariable String benutzername,
                                                         @RequestParam(value = "page", required = false, defaultValue = "0") final int page,
                                                         @RequestParam(value = "size", required = false, defaultValue = "8") final int size,
                                                         HttpServletResponse response) {

        if (USERS_ALL.equalsIgnoreCase(benutzername)) {
            // return all workouts of all users
            return getAllWorkouts(page, size, response);

        } else if (GROUP_EGLI_SISTERS.equalsIgnoreCase(benutzername)) {
            // return the workouts of the Egli sisters
            return  getEgliSistersWorkouts(page, size, response);

        } else {
            // return all workouts of a given user
            return getUsersWorkouts(benutzername, page, size, response);
        }
    }

    private ResponseEntity<Iterable<Workout>> getAllWorkouts(int page, int size, HttpServletResponse response) {
        final PagingInfo pagingInfo = new PagingInfo(page, size, workoutRepository.count());
        response.addHeader(PAGING_INFO, pagingInfo.toString());

        final Iterable<Workout> allWorkouts = workoutRepository.findAll(new PageRequest(page, size, workoutSort));
        return new ResponseEntity<Iterable<Workout>>(allWorkouts, HttpStatus.OK);
    }

    private ResponseEntity<Iterable<Workout>> getEgliSistersWorkouts(int page, int size, HttpServletResponse response) {
        final PagingInfo pagingInfo = new PagingInfo(page, size, workoutRepository.countAllWorkoutsOfGivenUsers(GROUP_EGLI_SISTERS__NAME_1, GROUP_EGLI_SISTERS__NAME_2));
        response.addHeader(PAGING_INFO, pagingInfo.toString());

        final Iterable<Workout> allWorkouts = workoutRepository.findAllWorkoutsOfGivenUsers(GROUP_EGLI_SISTERS__NAME_1, GROUP_EGLI_SISTERS__NAME_2,
                new PageRequest(page, size, workoutSort));
        return new ResponseEntity<Iterable<Workout>>(allWorkouts, HttpStatus.OK);
    }

    private ResponseEntity<Iterable<Workout>> getUsersWorkouts(String benutzername, int page, int size, HttpServletResponse response) {
        resourceValidator.validateUser(benutzername);

        final PagingInfo pagingInfo = new PagingInfo(page, size, workoutRepository.countByBenutzername(benutzername));
        response.addHeader(PAGING_INFO, pagingInfo.toString());

        final Iterable<Workout> allWorkouts = workoutRepository.findByBenutzername(benutzername, new PageRequest(page, size, workoutSort));
        return new ResponseEntity<Iterable<Workout>>(allWorkouts, HttpStatus.OK);
    }


    @RequestMapping(value="/users/{benutzername}/workouts/top/{top}", method= RequestMethod.GET)
    public ResponseEntity<Iterable<Workout>> getAllWorkouts(@PathVariable String benutzername, @PathVariable Integer top) {
        resourceValidator.validateUser(benutzername);
        Pageable topPage = new PageRequest(0, top);
        Page<Workout> page = workoutRepository.findTopByBenutzername(benutzername, topPage);
        final Iterable<Workout> topWorkouts = page.getContent();
        return new ResponseEntity<Iterable<Workout>>(topWorkouts, HttpStatus.OK);
    }


    @RequestMapping(value="/users/{benutzername}/workouts/{workoutId}", method= RequestMethod.GET)
    public ResponseEntity<?> getWorkout(@PathVariable String benutzername, @PathVariable Long workoutId) {
        resourceValidator.validateUser(benutzername);
        resourceValidator.validateWorkout(workoutId);
        final Workout workout = workoutRepository.findByBenutzernameAndId(benutzername, workoutId);
        return new ResponseEntity<>(workout, HttpStatus.OK);
    }


    @RequestMapping(value="/users/all/workouts/{workoutId}", method= RequestMethod.GET)
    public ResponseEntity<?> getWorkout(@PathVariable Long workoutId) {
        resourceValidator.validateWorkout(workoutId);
        final Optional<Workout> workout = workoutRepository.findById(workoutId);
        return new ResponseEntity<>(workout.get(), HttpStatus.OK);
    }


    @RequestMapping(value="/users/{benutzername}/workouts", method= RequestMethod.POST)
    public ResponseEntity<?> createWorkout(@PathVariable String benutzername, @Valid @RequestBody Workout workout) {
        resourceValidator.validateUser(benutzername);
        final HttpHeaders responseHeaders = new HttpHeaders();
        try {
            // save the new workout...
            workout.setBenutzername(benutzername);
            workout = workoutRepository.save(workout);

            // Set the location header for the newly created resource
            final URI newWorkoutUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(workout.getId()).toUri();
            responseHeaders.setLocation(newWorkoutUri);
        } catch (Exception e) {
            throw new BadRequestException("Workout could not be saved in the database: " + e.getMessage());
        }

        return new ResponseEntity<>(workout, responseHeaders, HttpStatus.CREATED);
    }


    @RequestMapping(value="/users/{benutzername}/workouts/{workoutId}", method= RequestMethod.PUT)
    public ResponseEntity<?> updateWorkout(@RequestBody Workout workout, @PathVariable String benutzername, @PathVariable Long workoutId) {
        resourceValidator.validateUser(benutzername);
        resourceValidator.validateWorkout(workoutId);

        // only allow updating a workout with an id that corresponds to the given workoutId!
        // otherwise we allow insert operation with PUT...
        workout.setId(workoutId);
        workout.setBenutzername(benutzername);

        workoutRepository.save(workout);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @RequestMapping(value="/users/{benutzername}/workouts/{workoutId}", method= RequestMethod.DELETE)
    public ResponseEntity<?> deleteWorkout(@PathVariable String benutzername, @PathVariable Long workoutId) {
        resourceValidator.validateUser(benutzername);
        resourceValidator.validateWorkout(workoutId);
        workoutRepository.deleteById(workoutId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}

