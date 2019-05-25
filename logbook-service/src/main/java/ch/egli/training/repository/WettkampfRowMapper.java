package ch.egli.training.repository;

import ch.egli.training.model.Wettkampf;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
public class WettkampfRowMapper implements RowMapper<Wettkampf> {

    @Override
    public Wettkampf mapRow(ResultSet rs, int i) throws SQLException {
        Wettkampf result = new Wettkampf();
        result.setId(rs.getLong("id"));
        SimpleDateFormat format = new SimpleDateFormat("dd.MM.yy");
        String dateString = format.format(rs.getDate("datum"));
        result.setDatum(dateString);
        result.setBeschreibung(rs.getString("beschreibung"));
        result.setAbkuerzung(rs.getString("abkuerzung"));
        result.setDisziplin(rs.getString("disziplin"));
        result.setKategorie(rs.getString("kategorie"));
        result.setBenutzer(rs.getString("benutzer"));
        return result;
    }
}
