package ch.egli.training.repository;

import ch.egli.training.model.StatsData;
import ch.egli.training.model.StatsData3;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/17/19.
 */
@Slf4j
@Repository
@Transactional
public class StatisticsRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<StatsData> getStatsByUserAndYear(String user, int year) {
        List<StatsData> result;
        result = jdbcTemplate.query("SELECT \n" +
                "  date_part('year', datum::date) AS year,\n" +
                "  date_part('week', datum::date) AS week,\n" +
                "  to_date(concat(date_part('year', datum::date), date_part('week', datum::date)), 'iyyyiw') + 3 AS weekDate,\n" +
                "  COUNT(benutzername) AS countTrainings,\n" +
                "  ROUND(AVG(belastung), 1) as avgBelastung,\n" +
                "  MAX(belastung) as maxBelastung,\n" +
                "  ROUND(AVG(trainingszeit), 1) as avgTrainingszeit,\n" +
                "  SUM(zuege12) + SUM(zuege23) + SUM(zuege34) AS totalZuege,\n" +
                "  SUM(zuege12) as zuege12,\n" +
                "  SUM(zuege23) as zuege23,\n" +
                "  SUM(zuege34) as zuege34,\n" +
                "  ROUND(AVG(schlaf),1) AS avgSchlaf,\n" +
                "  SUM(CASE WHEN schlaf < 7 THEN 1 ELSE 0 END) as countSchlafLessThan7,\n" +
                "  ROUND(AVG(gefuehl), 1) as avgGefuehl,\n" +
                "  SUM(CASE WHEN gefuehl > 2 THEN 1 ELSE 0 END) as countGefuehlMoreThan2,\n" +
                "  ROUND(AVG(gefuehl_k), 1) as avgGefuehlK,\n" +
                "  ROUND(AVG(gefuehl_m), 1) as avgGefuehlM,\n" +
                "  SUM(lead) as countLead,\n" +
                "  SUM(bouldern) as countBouldern,\n" +
                "  SUM(speed) as countSpeed,\n" +
                "  SUM(campus) as countCampus,\n" +
                "  SUM(kraftraum) as countKraft,\n" +
                "  SUM(dehnen) as countStretching,\n" +
                "  SUM(mentaltraining) as countMentaltraining,\n" +
                "  SUM(CASE WHEN sonstiges like '%ogg%' THEN 1 ELSE 0 END) as countJogging,\n" +
                "  SUM(CASE WHEN sonstiges like '%ysio%' THEN 1 ELSE 0 END) as countPhysio\n" +
                "FROM workout w \n" +
                "  WHERE benutzername = ? AND date_part('year', datum::date) = ? \n" +
                "GROUP BY year, week\n" +
                "ORDER BY year, week", new Object[]{user, year}, new StatisticsRowMapper());
        return result;
    }

    public List<StatsData3> getStatsByUserAndLastDays(String user, int numberOfDays) {
        List<StatsData3> result;
        result = jdbcTemplate.query("SELECT \n" +
                "  w.datum AS w_datum, \n" +
                "  COUNT(w.benutzername) AS countTrainings, \n" +
                "  SUM(w.trainingszeit) as w_trainingszeit, \n" +
                "  MAX(w.belastung) as maxBelastung,\n" +
                "  SUM(w.zuege12) + SUM(zuege23) + SUM(zuege34) AS totalZuege,\n" +
                "  SUM(w.zuege12) as zuege12,\n" +
                "  SUM(w.zuege23) as zuege23,\n" +
                "  SUM(w.zuege34) as zuege34,\n" +
                "  SUM(w.lead) as countLead,\n" +
                "  SUM(w.bouldern) as countBouldern,\n" +
                "  SUM(w.speed) as countSpeed,\n" +
                "  SUM(w.campus) as countCampus,\n" +
                "  SUM(w.kraftraum) as countKraft,\n" +
                "  SUM(w.dehnen) as countStretching,\n" +
                "  SUM(w.mentaltraining) as countMentaltraining,\n" +
                "  SUM(CASE WHEN w.sonstiges like '%ogg%' THEN 1 ELSE 0 END) as countJogging,\n" +
                "  SUM(CASE WHEN w.sonstiges like '%ysio%' THEN 1 ELSE 0 END) as countPhysio\n" +
                "  s.datum AS s_datum, \n" +
                "  ROUND(AVG(s.schlaf),1) AS s_schlaf, \n" +
                "  ROUND(AVG(s.gefuehl_k),0) AS s_gefuehlK, \n" +
                "  ROUND(AVG(s.gefuehl_m),0) AS s_gefuehlM\n" +
                "FROM workout w\n" +
                "  FULL OUTER JOIN status s\n" +
                "  ON s.datum = w.datum AND s.benutzername = w.benutzername\n" +
                "WHERE (s.benutzername = ?) AND s.datum > current_date - ? \n" +
                "  GROUP BY w.datum, s.datum\n" +
                "  ORDER BY s.datum DESC", new Object[]{user, numberOfDays}, new StatisticsRowMapper3());
        return result;
    }

    public Map<String, Integer> getTrainingsorteByUserAndYear(String user, int year) {
        List<Pair<String, Integer>> result;
        result = jdbcTemplate.query("SELECT COUNT(ort) as count, ort as ort\n" +
                        "FROM workout where benutzername = ? and date_part('year', datum::date) = ?\n" +
                        "GROUP BY ort\n" +
                        "ORDER BY COUNT(ort) desc", new Object[]{user, year},
                (ResultSet rs, int i) -> {
                    return Pair.of(rs.getString("ort") != null ? rs.getString("ort") : "", rs.getInt("count"));
                });

        Map<String, Integer> completeResult = result.stream()
                .filter(n -> n.getFirst().length() > 0)
                .collect(Collectors.toMap(Pair::getFirst, Pair::getSecond));
        Map<String, Integer> filteredResult = completeResult.entrySet().stream()
                .filter(n -> n.getValue() > 3)
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
        filteredResult.put("Diverse", completeResult.size() - filteredResult.size());

        log.info(filteredResult.toString());
        return filteredResult;
    }

    public Map<String, Integer> getDisziplinenByUserAndYear(String user, int year) {
        List<Pair<String, Integer>> queryResultSonstiges = jdbcTemplate.query("SELECT COUNT(sonstiges) as count, " +
                        "sonstiges as sonstiges\n" +
                        "FROM workout where benutzername = ? and date_part('year', datum::date) = ?\n" +
                        "GROUP BY sonstiges \n" +
                        "ORDER BY COUNT(sonstiges) desc", new Object[]{user, year},
                (ResultSet rs, int i) -> {
                    return Pair.of(rs.getString("sonstiges") != null ? rs.getString("sonstiges") : "", rs.getInt("count"));
                });
        Map<String, Integer> resultSonstiges = queryResultSonstiges.stream()
                .filter(n -> n.getFirst().length() > 0)
                .collect(Collectors.toMap(Pair::getFirst, Pair::getSecond));

        List<Map<String, Integer>> queryResultDisziplinen = jdbcTemplate.query("SELECT SUM(lead) as lead, " +
                        "SUM(bouldern) as bouldern, " +
                        "SUM(speed) as speed, " +
                        "SUM(campus) as campusboard, " +
                        "SUM(kraftraum) as krafttraining, " +
                        "SUM(dehnen) as stretching, " +
                        "SUM(mentaltraining) as mentaltraining, " +
                        "SUM(jogging) as jogging\n" +
                        "FROM workout where benutzername = ? and date_part('year', datum::date) = ?", new Object[]{user, year},
                (ResultSet rs, int i) -> {
                    Map<String, Integer> disziplinenMap = new LinkedHashMap<>();
                    disziplinenMap.put("Lead", rs.getInt("lead"));
                    disziplinenMap.put("Bouldern", rs.getInt("bouldern"));
                    disziplinenMap.put("Speed", rs.getInt("speed"));
                    disziplinenMap.put("Campusboard", rs.getInt("campusboard"));
                    disziplinenMap.put("Krafttraining", rs.getInt("krafttraining"));
                    disziplinenMap.put("Stretching", rs.getInt("stretching"));
                    disziplinenMap.put("Mentaltraining", rs.getInt("mentaltraining"));
                    disziplinenMap.put("Jogging", rs.getInt("jogging"));
                    return disziplinenMap;
                });
        Map<String, Integer> resultDisziplinen = queryResultDisziplinen.get(0); // query return just one row...

        Map<String, Integer> completeResult = new LinkedHashMap<>();
        completeResult.putAll(resultDisziplinen);
        completeResult.putAll(resultSonstiges);

        Map<String, Integer> intermediate1 = assembleSimilarResults(completeResult, "Jogging",
                map -> map.getKey().toLowerCase().contains("jogg") || map.getKey().toLowerCase().contains("laufen"));
        Map<String, Integer> intermediate2 = assembleSimilarResults(intermediate1, "Ski/Snowboard",
                map -> map.getKey().toLowerCase().contains("ski") || map.getKey().toLowerCase().contains("snowboard"));
        Map<String, Integer> intermediate3 = assembleSimilarResults(intermediate2, "Velo/Bike",
                map -> map.getKey().toLowerCase().contains("velo") || map.getKey().toLowerCase().contains("bike"));
        Map<String, Integer> intermediate4 = assembleSimilarResults(intermediate3, "Speed",
                map -> map.getKey().toLowerCase().contains("speed"));
        Map<String, Integer> intermediate5 = assembleSimilarResults(intermediate4, "Langlauf",
                map -> map.getKey().toLowerCase().contains("langlauf"));

        Map<String, Integer> filteredResult = intermediate5.entrySet().stream()
                .filter(n -> n.getValue() > 1)
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1, e2) -> e1, LinkedHashMap::new));
        filteredResult.put("Diverse", intermediate5.size() - filteredResult.size());

        log.info(filteredResult.toString());
        return filteredResult;
    }

    Map<String, Integer> assembleSimilarResults(Map<String, Integer> origMap,
                                                String label,
                                                Predicate<Map.Entry<String, Integer>> predicate) {
        Map.Entry<String, Integer> assembledJoggingEntry = origMap.entrySet().stream()
                .filter(predicate)
                .reduce(new AbstractMap.SimpleEntry(label, 0), (a, b) -> new AbstractMap.SimpleEntry(label, a.getValue() + b.getValue()));
        Map<String, Integer> filteredMap = origMap.entrySet().stream()
                .filter(predicate.negate())
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
        filteredMap.put(assembledJoggingEntry.getKey(), assembledJoggingEntry.getValue());
        return filteredMap;
    }
}
