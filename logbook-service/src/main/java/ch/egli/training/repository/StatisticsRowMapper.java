package ch.egli.training.repository;

import ch.egli.training.model.StatsData;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
public class StatisticsRowMapper implements RowMapper<StatsData> {

    @Override
    public StatsData mapRow(ResultSet rs, int i) throws SQLException {
        StatsData data = new StatsData(
                rs.getInt("year"),
                rs.getInt("week"),
                rs.getDate("weekDate"),
                rs.getDouble("countTrainings"),
                rs.getDouble("avgTrainingszeit"),
                rs.getDouble("avgSchlaf"),
                rs.getDouble("countSchlafLessThan7"),
                rs.getDouble("avgGefuehl"),
                rs.getDouble("countGefuehlMoreThan2"),
                rs.getDouble("avgGefuehlK"),
                rs.getDouble("avgGefuehlM"),
                rs.getDouble("avgBelastung"),
                rs.getDouble("maxBelastung"),
                rs.getDouble("zuege12"),
                rs.getDouble("zuege23"),
                rs.getDouble("zuege34"),
                rs.getDouble("totalZuege"),
                rs.getDouble("countLead"),
                rs.getDouble("countBouldern"),
                rs.getDouble("countSpeed"),
                rs.getDouble("countCampus"),
                rs.getDouble("countKraft"),
                rs.getDouble("countStretching"),
                rs.getDouble("countMentaltraining"),
                rs.getDouble("countJogging"),
                rs.getDouble("countPhysio")
        );
        return data;
    }
}
