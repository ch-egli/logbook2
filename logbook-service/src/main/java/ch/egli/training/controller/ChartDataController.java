package ch.egli.training.controller;

import ch.egli.training.model.*;
import ch.egli.training.repository.StatisticsRepository;
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
import java.util.ArrayList;
import java.util.List;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/8/19.
 */
@Controller
@RequestMapping("/v1")
public class ChartDataController {

    private final static String PAGING_INFO = "PAGING_INFO";

    private Sort workoutSort = new Sort(Sort.Direction.DESC, "datum");

    public ChartDataController(WorkoutRepository workoutRepository, StatisticsRepository statisticsRepository) {
        this.workoutRepository = workoutRepository;
        this.statisticsRepository = statisticsRepository;
    }

    private WorkoutRepository workoutRepository;
    private StatisticsRepository statisticsRepository;



    @GetMapping(value = "/ng2-charts/{benutzername}/workouts/{year}")
    public ResponseEntity<ChartDataSet> getNg2ChartData(@PathVariable String benutzername,
                                                        @PathVariable Integer year,
                                                        @RequestParam(value = "page", required = false, defaultValue = "0") final int page,
                                                        @RequestParam(value = "size", required = false, defaultValue = "52") final int size,
                                                        HttpServletResponse response) {

        final PagingInfo pagingInfo = new PagingInfo(page, size, workoutRepository.countByBenutzername(benutzername));
        response.addHeader(PAGING_INFO, pagingInfo.toString());

        final List<Workout> allWorkouts = workoutRepository.findByBenutzername(benutzername, PageRequest.of(page, size, workoutSort)).getContent();


        List<String> labels = new ArrayList<>();
        List<Double> belastungData = new ArrayList<>();
        List<Double> zuege34Data = new ArrayList<>();
        List<Double> totalZuegeData = new ArrayList<>();
        List<ChartData> chartData = new ArrayList<>();
        for (Workout w : allWorkouts) {
            labels.add(checkAndIncrement2(w.getDatum().toString(), labels));
            belastungData.add(w.getBelastung().doubleValue());
            Integer zuege12 = w.getZuege12() == null ? 0 : w.getZuege12();
            Integer zuege23 = w.getZuege23() == null ? 0 : w.getZuege23();
            Integer zuege34 = w.getZuege34() == null ? 0 : w.getZuege34();
            Integer totalZuege = zuege12 + zuege23 + zuege34;
            zuege34Data.add(zuege34.doubleValue());
            totalZuegeData.add(totalZuege.doubleValue());
        }
        chartData.add(new ChartData(belastungData, "Belastung", "y-axis-0"));
        chartData.add(new ChartData(zuege34Data, "Zuege34", "y-axis-1"));
        chartData.add(new ChartData(totalZuegeData, "ZuegeTotal", "y-axis-1"));
        ChartDataSet chartDataSet = new ChartDataSet(chartData, labels);

        return ResponseEntity.ok(chartDataSet);
    }

    @GetMapping(value = "/charts/{benutzername}/{year}")
    public ResponseEntity<ChartDataSet> getChartData(@PathVariable String benutzername,
                                                        @PathVariable Integer year,
                                                        HttpServletResponse response) {

        final List<StatsData> statsData = statisticsRepository.getStatsByUserAndYear(benutzername, year);

        List<String> labels = new ArrayList<>();
        List<Double> belastungData = new ArrayList<>();
        List<Double> zuege34Data = new ArrayList<>();
        List<Double> totalZuegeData = new ArrayList<>();
        List<Double> schlafData = new ArrayList<>();
        List<ChartData> chartData = new ArrayList<>();
        for (StatsData data : statsData) {
            labels.add("Woche " + data.getWeek());
            belastungData.add(data.getMaxBelastung());
            schlafData.add(data.getAvgSchlaf());
            zuege34Data.add(data.getZuege34());
            totalZuegeData.add(data.getTotalZuege());
        }
        chartData.add(new ChartData(belastungData, "Belastung", "y-axis-0"));
        chartData.add(new ChartData(schlafData, "Schlaf", "y-axis-0"));
        chartData.add(new ChartData(zuege34Data, "Zuege34", "y-axis-1"));
        chartData.add(new ChartData(totalZuegeData, "ZuegeTotal", "y-axis-1"));
        ChartDataSet chartDataSet = new ChartDataSet(chartData, labels);

        return ResponseEntity.ok(chartDataSet);
    }

    private String checkAndIncrement(String newEntry, List<NameValue> list) {
        String returnVal = newEntry;
        for (NameValue nv : list) {
            if (nv.getName().equals(newEntry)) {
                returnVal = newEntry + "_2";
            }
        }
        return returnVal;
    }

    private String checkAndIncrement2(String newEntry, List<String> list) {
        String returnVal = newEntry;
        if (list.contains(newEntry)) {
            returnVal = newEntry + "_2";
        }
        return returnVal;
    }

}

