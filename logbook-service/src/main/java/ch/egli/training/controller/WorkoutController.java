package ch.egli.training.controller;

import ch.egli.training.model.Workout;
import ch.egli.training.repository.WorkoutRepository;
import ch.egli.training.util.PagingInfo;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/8/19.
 */
@Controller
@RequestMapping("/v1")
public class WorkoutController {

    private final static String PAGING_INFO = "PAGING_INFO";

    private Sort workoutSort = new Sort(Sort.Direction.DESC, "datum");

    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    private WorkoutRepository workoutRepository;


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

}

