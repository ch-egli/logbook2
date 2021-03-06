package ch.egli.training.repository;

import ch.egli.training.model.StatsData3;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
public class StatisticsRowMapper3 implements RowMapper<StatsData3> {

    @Override
    public StatsData3 mapRow(ResultSet rs, int i) throws SQLException {
        StatsData3 data = new StatsData3(
                rs.getDate("w_datum"),
                rs.getDouble("countTrainings"),
                rs.getDouble("w_trainingszeit"),
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
                rs.getDouble("countPhysio"),
                rs.getDate("s_datum"),
                rs.getDouble("s_schlaf"),
                rs.getDouble("s_gefuehlK"),
                rs.getDouble("s_gefuehlM")
        );
        return data;
    }
}
