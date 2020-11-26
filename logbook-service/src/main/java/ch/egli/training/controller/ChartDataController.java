package ch.egli.training.controller;

import ch.egli.training.model.*;
import ch.egli.training.repository.StatisticsRepository;
import ch.egli.training.repository.WettkampfRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.sql.Date;
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

    public ChartDataController(StatisticsRepository statisticsRepository, WettkampfRepository wettkampfRepository) {
        this.statisticsRepository = statisticsRepository;
        this.wettkampfRepository = wettkampfRepository;
    }

    private StatisticsRepository statisticsRepository;
    private WettkampfRepository wettkampfRepository;

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
        List<Double> avgGefuehlK = new ArrayList<>();
        List<Double> avgGefuehlM = new ArrayList<>();
        List<Double> countLeadData = new ArrayList<>();
        List<Double> countBouldernData = new ArrayList<>();
        List<Double> countSpeedData = new ArrayList<>();
        List<Double> countCampusData = new ArrayList<>();
        List<Double> countKraftData = new ArrayList<>();
        List<Double> countDehnenData = new ArrayList<>();
        List<Double> countMentaltrainingData = new ArrayList<>();
        List<Double> countJoggingData = new ArrayList<>();
        List<Double> countPhysioData = new ArrayList<>();

        Map<String, List<Double>> chartData = new HashMap<>();
        for (StatsData data : statsData) {
            //labels.add("Woche " + data.getWeek());
            SimpleDateFormat format = new SimpleDateFormat("dd.MM.yy");
            String dateString = format.format(data.getWeekDate());
            labels.add(dateString);

            Double countTrainings = data.getCountTrainings();
            countTrainingsData.add(countTrainings);
            maxBelastungData.add(data.getMaxBelastung());
            avgBelastungData.add(data.getAvgBelastung());
            trainingszeitData.add(data.getAvgTrainingszeit());

            totalZuegeData.add(normalizeZuege(data.getTotalZuege(), countTrainings));
            zuege12Data.add(normalizeZuege(data.getZuege12(), countTrainings));
            zuege23Data.add(normalizeZuege(data.getZuege23(), countTrainings));
            zuege34Data.add(normalizeZuege(data.getZuege34(), countTrainings));

            avgSchlaf.add(data.getAvgSchlaf());
            countSchlafLessThan7Data.add(data.getCountSchlafLessThan7());
            avgGefuehlK.add(data.getAvgGefuehlK());
            avgGefuehlM.add(data.getAvgGefuehlM());
            countLeadData.add(data.getCountLead());
            countBouldernData.add(data.getCountBouldern());
            countSpeedData.add(data.getCountSpeed());
            countCampusData.add(data.getCountCampus());
            countKraftData.add(data.getCountKraft());
            countDehnenData.add(data.getCountStretching());
            countMentaltrainingData.add(data.getCountMentaltraining());
            countJoggingData.add(data.getCountJogging());
            countPhysioData.add(data.getCountPhysio());
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
        chartData.put("11 Gefühl (körperlich)", avgGefuehlK);
        chartData.put("12 Gefühl (mental)", avgGefuehlM);
        chartData.put("13 Anzahl Lead", countLeadData);
        chartData.put("14 Anzahl Bouldern", countBouldernData);
        chartData.put("15 Anzahl Speed", countSpeedData);
        chartData.put("16 Anzahl Campusboard", countCampusData);
        chartData.put("17 Anzahl Krafttrainings", countKraftData);
        chartData.put("18 Anzahl Stretching", countDehnenData);
        chartData.put("19 Anzahl Mentaltraining", countMentaltrainingData);
        chartData.put("20 Anzahl Jogging", countJoggingData);
        chartData.put("21 Anzahl Physio", countPhysioData);

        List<Wettkampf> wettkaempfe = wettkampfRepository.findByBenutzerAndYear(benutzername, year);

        ChartDataSet chartDataSet = new ChartDataSet(chartData, labels, wettkaempfe);

        return ResponseEntity.ok(chartDataSet);
    }

    @GetMapping(value = "/charts3/{benutzername}/{days}")
    public ResponseEntity<ChartDataSet> getChartDataLastDays(@PathVariable String benutzername, @PathVariable Integer days) {

        final List<StatsData3> statsData = statisticsRepository.getStatsByUserAndLastDays(benutzername, days);

        List<String> labels = new ArrayList<>();
        List<Double> countTrainingsData = new ArrayList<>();
        List<Double> trainingszeitData = new ArrayList<>();
        List<Double> maxBelastungData = new ArrayList<>();
        List<Double> zuege12Data = new ArrayList<>();
        List<Double> zuege23Data = new ArrayList<>();
        List<Double> zuege34Data = new ArrayList<>();
        List<Double> totalZuegeData = new ArrayList<>();
        List<Double> countLeadData = new ArrayList<>();
        List<Double> countBouldernData = new ArrayList<>();
        List<Double> countSpeedData = new ArrayList<>();
        List<Double> countCampusData = new ArrayList<>();
        List<Double> countKraftData = new ArrayList<>();
        List<Double> countDehnenData = new ArrayList<>();
        List<Double> countMentaltrainingData = new ArrayList<>();
        List<Double> countJoggingData = new ArrayList<>();
        List<Double> countPhysioData = new ArrayList<>();
        List<Double> schlafData = new ArrayList<>();
        List<Double> gefuehlKData = new ArrayList<>();
        List<Double> gefuehlMData = new ArrayList<>();

        Map<String, List<Double>> chartData = new HashMap<>();
        for (StatsData3 data : statsData) {
            //labels.add("Woche " + data.getWeek());
            SimpleDateFormat format = new SimpleDateFormat("dd.MM.yy");
            String dateString = format.format(data.getStatusDate());
            labels.add(dateString);

            Double countTrainings = data.getCountTrainings();
            countTrainingsData.add(countTrainings);
            maxBelastungData.add(data.getMaxBelastung());
            trainingszeitData.add(data.getTrainingszeit());

            totalZuegeData.add(data.getTotalZuege());
            zuege12Data.add(data.getZuege12());
            zuege23Data.add(data.getZuege23());
            zuege34Data.add(data.getZuege34());

            countLeadData.add(data.getCountLead());
            countBouldernData.add(data.getCountBouldern());
            countSpeedData.add(data.getCountSpeed());
            countCampusData.add(data.getCountCampus());
            countKraftData.add(data.getCountKraft());
            countDehnenData.add(data.getCountStretching());
            countMentaltrainingData.add(data.getCountMentaltraining());
            countJoggingData.add(data.getCountJogging());
            countPhysioData.add(data.getCountPhysio());

            schlafData.add(data.getSchlaf());
            gefuehlKData.add(data.getGefuehlK());
            gefuehlMData.add(data.getGefuehlM());
        }

        chartData.put("01 Anzahl Trainings", countTrainingsData);
        chartData.put("02 Max. Belastung", maxBelastungData);
        chartData.put("04 Trainingszeit", trainingszeitData);
        chartData.put("10 Züge total", totalZuegeData);
        chartData.put("11 Züge 12", zuege12Data);
        chartData.put("12 Züge 23", zuege23Data);
        chartData.put("13 Züge 34", zuege34Data);
        chartData.put("13 Anzahl Lead", countLeadData);
        chartData.put("21 Anzahl Bouldern", countBouldernData);
        chartData.put("22 Anzahl Speed", countSpeedData);
        chartData.put("23 Anzahl Campusboard", countCampusData);
        chartData.put("24 Anzahl Krafttrainings", countKraftData);
        chartData.put("25 Anzahl Stretching", countDehnenData);
        chartData.put("26 Anzahl Mentaltraining", countMentaltrainingData);
        chartData.put("27 Anzahl Jogging", countJoggingData);
        chartData.put("28 Anzahl Physio", countPhysioData);
        chartData.put("30 Schlaf", schlafData);
        chartData.put("31 Gefühl (körperlich)", gefuehlKData);
        chartData.put("32 Gefühl (mental)", gefuehlMData);

        ChartDataSet chartDataSet = new ChartDataSet(chartData, labels, null);

        return ResponseEntity.ok(chartDataSet);
    }

    @GetMapping(value = "/charts2/{benutzername}/{year}")
    public ResponseEntity<Map<String, BarChartData>> getBarChartData(@PathVariable String benutzername, @PathVariable Integer year) {

        final Map<String, Integer> disziplinen = statisticsRepository.getDisziplinenByUserAndYear(benutzername, year);
        final BarChartData disziplinenData = new BarChartData(disziplinen.values(), disziplinen.keySet());

        final Map<String, Integer> trainingsorte = statisticsRepository.getTrainingsorteByUserAndYear(benutzername, year);
        final BarChartData trainingsorteData = new BarChartData(trainingsorte.values(), trainingsorte.keySet());

        Map<String, BarChartData> result = new HashMap<>();
        result.put("disziplinen", disziplinenData);
        result.put("trainingsorte", trainingsorteData);

        return ResponseEntity.ok(result);
    }

    private Double normalizeZuege(Double totalZuege, Double countTrainings) {
        if (totalZuege == null || totalZuege == 0) {
            return 0.0;
        } else if (countTrainings == null || countTrainings == 0) {
            return 0.0;
        } else {
            return (Long.valueOf(Math.round(totalZuege / countTrainings))).doubleValue();
        }
    }
}

