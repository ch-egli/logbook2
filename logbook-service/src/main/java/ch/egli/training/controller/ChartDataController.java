package ch.egli.training.controller;

import ch.egli.training.model.ChartDataSet;
import ch.egli.training.model.StatsData;
import ch.egli.training.repository.StatisticsRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
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
        List<Double> countTrainingsData = new ArrayList<>();
        List<Double> maxBelastungData = new ArrayList<>();
        List<Double> avgBelastungData = new ArrayList<>();
        List<Double> trainingszeitData = new ArrayList<>();
        List<Double> totalZuegeData = new ArrayList<>();
        List<Double> zuege12Data = new ArrayList<>();
        List<Double> zuege23Data = new ArrayList<>();
        List<Double> zuege34Data = new ArrayList<>();
        List<Double> avgSchlaf = new ArrayList<>();
        List<Double> countSchlafLessThan7Data = new ArrayList<>();
        List<Double> avgGefuehl = new ArrayList<>();
        List<Double> countGefuehlMoreThan2Data = new ArrayList<>();
        List<Double> countLeadData = new ArrayList<>();
        List<Double> countBouldernData = new ArrayList<>();
        List<Double> countCampusData = new ArrayList<>();
        List<Double> countKraftData = new ArrayList<>();
        List<Double> countDehnenData = new ArrayList<>();
        List<Double> countMentaltrainingData = new ArrayList<>();
        List<Double> coundJoggingData = new ArrayList<>();

        Map<String, List<Double>> chartData = new HashMap<>();
        for (StatsData data : statsData) {
            //labels.add("Woche " + data.getWeek());
            SimpleDateFormat format = new SimpleDateFormat("dd.MM.yy");
            String dateString = format.format(data.getWeekDate());
            labels.add(dateString);

            countTrainingsData.add(data.getCountTrainings());
            maxBelastungData.add(data.getMaxBelastung());
            avgBelastungData.add(data.getAvgBelastung());
            trainingszeitData.add(data.getAvgTrainingszeit());
            totalZuegeData.add(data.getTotalZuege());
            zuege12Data.add(data.getZuege12());
            zuege23Data.add(data.getZuege23());
            zuege34Data.add(data.getZuege34());
            avgSchlaf.add(data.getAvgSchlaf());
            countSchlafLessThan7Data.add(data.getCountSchlafLessThan7());
            avgGefuehl.add(5 - data.getAvgGefuehl()); // in der Graphik ist es logischer, wenn "gut" oben ist...
            countGefuehlMoreThan2Data.add(data.getCountGefuehlMoreThan2());
            countLeadData.add(data.getCountLead());
            countBouldernData.add(data.getCountBouldern());
            countCampusData.add(data.getCountCampus());
            countKraftData.add(data.getCountKraft());
            countDehnenData.add(data.getCountStretching());
            countMentaltrainingData.add(data.getCountMentaltraining());
            coundJoggingData.add(data.getCountJogging());
        }

        chartData.put("01 Anzahl Trainings", countTrainingsData);
        chartData.put("02 Max. Belastung", maxBelastungData);
        chartData.put("03 Belastung (Mittelwert)", avgBelastungData);
        chartData.put("04 Trainingszeit (Mittelwert)", trainingszeitData);
        chartData.put("05 Züge total", totalZuegeData);
        chartData.put("06 Züge 12", zuege12Data);
        chartData.put("07 Züge 23", zuege23Data);
        chartData.put("08 Züge 34", zuege34Data);
        chartData.put("09 Schlaf (Mittelwert)", avgSchlaf);
        chartData.put("10 Anzahl Nächte mit wenig Schlaf", countSchlafLessThan7Data);
        chartData.put("11 Gefühl (Mittelwert: 4=top, 1=flop)", avgGefuehl);
        chartData.put("12 Anzahl schlechtes Gefühl", countGefuehlMoreThan2Data);
        chartData.put("13 Anzahl Lead", countLeadData);
        chartData.put("14 Anzahl Bouldern", countBouldernData);
        chartData.put("15 Anzahl Campusboard", countCampusData);
        chartData.put("16 Anzahl Krafttrainings", countKraftData);
        chartData.put("17 Anzahl Stretching", countDehnenData);
        chartData.put("18 Anzahl Mentaltraining", countMentaltrainingData);
        chartData.put("19 Anzahl Jogging", coundJoggingData);

        ChartDataSet chartDataSet = new ChartDataSet(chartData, labels);

        return ResponseEntity.ok(chartDataSet);
    }

}

