package ch.egli.training.controller;

import ch.egli.training.model.ChartDataSet;
import ch.egli.training.model.StatsData;
import ch.egli.training.repository.StatisticsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/8/19.
 */
@Controller
@RequestMapping("/v1")
public class ChartDataController {

    public ChartDataController(StatisticsRepository statisticsRepository) {
        this.statisticsRepository = statisticsRepository;
    }

    private StatisticsRepository statisticsRepository;

    @GetMapping(value = "/charts/{benutzername}/{year}")
    public ResponseEntity<ChartDataSet> getChartData(@PathVariable String benutzername, @PathVariable Integer year) {

        final List<StatsData> statsData = statisticsRepository.getStatsByUserAndYear(benutzername, year);

        List<String> labels = new ArrayList<>();
        List<Double> belastungData = new ArrayList<>();
        List<Double> zuege34Data = new ArrayList<>();
        List<Double> totalZuegeData = new ArrayList<>();
        List<Double> schlafData = new ArrayList<>();

        Map<String, List<Double>> chartData = new HashMap<>();
        for (StatsData data : statsData) {
            //labels.add("Woche " + data.getWeek());
            labels.add(data.getWeekDate().toString());

            belastungData.add(data.getMaxBelastung());
            schlafData.add(data.getAvgSchlaf());
            zuege34Data.add(data.getZuege34());
            totalZuegeData.add(data.getTotalZuege());
        }
        chartData.put("Belastung", belastungData);
        chartData.put("Zuege34", zuege34Data);
        chartData.put("ZuegeTotal", totalZuegeData);
        chartData.put("Schlaf", schlafData);

        ChartDataSet chartDataSet = new ChartDataSet(chartData, labels);

        return ResponseEntity.ok(chartDataSet);
    }

}

