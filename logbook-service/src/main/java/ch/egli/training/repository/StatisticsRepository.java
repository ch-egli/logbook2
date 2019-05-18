package ch.egli.training.repository;

import ch.egli.training.model.StatsData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/17/19.
 */
@Repository
@Transactional
public class StatisticsRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<StatsData> getStatsByUserAndYear(String user, int year) {
        List<StatsData> result;
        result = jdbcTemplate.query("SELECT date_part('year', datum::date) AS year,\n" +
                "date_part('week', datum::date) AS week,\n" +
                "to_date(concat(date_part('year', datum::date), date_part('week', datum::date)), 'iyyyiw') + 3 AS weekDate,\n" +
                "COUNT(benutzername) AS countTrainings,\n" +
                "ROUND(AVG(belastung), 1) as avgBelastung,\n" +
                "MAX(belastung) as maxBelastung,\n" +
                "ROUND(AVG(trainingszeit), 1) as avgTrainingszeit,\n" +
                "SUM(zuege12) + SUM(zuege23) + SUM(zuege34) AS totalZuege,\n" +
                "SUM(zuege12) as zuege12,\n" +
                "SUM(zuege23) as zuege23,\n" +
                "SUM(zuege34) as zuege34,\n" +
                "ROUND(AVG(schlaf),1) AS avgSchlaf,\n" +
                "SUM(CASE WHEN schlaf < 7 THEN 1 ELSE 0 END) as countSchlafLessThan7,\n" +
                "ROUND(AVG(gefuehl), 1) as avgGefuehl,\n" +
                "SUM(CASE WHEN gefuehl > 2 THEN 1 ELSE 0 END) as countGefuehlMoreThan2,\n" +
                "COUNT(lead) as countLead,\n" +
                "COUNT(bouldern) as countBouldern,\n" +
                "COUNT(campus) as countCampus,\n" +
                "COUNT(kraftraum) as countKraft,\n" +
                "COUNT(dehnen) as countStretching,\n" +
                "COUNT(mentaltraining) as countMentaltraining,\n" +
                "COUNT(jogging) as countJogging\n" +
                "FROM workout w where benutzername = ? and date_part('year', datum::date) = ? \n" +
                "GROUP BY year, week\n" +
                "ORDER BY year, week", new Object[]{user, year}, new StatisticsRowMapper());
        return result;
    }

}
