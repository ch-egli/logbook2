package ch.egli.training.repository;

import ch.egli.training.model.Wettkampf;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Repository for entity Wettkampf.
 *
 * @author Christian Egli
 * @since 23.05.2019
 */
@Repository
@Transactional
public class WettkampfRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Wettkampf> findByBenutzer(String benutzer) {
        List<Wettkampf> result;
        result = jdbcTemplate.query("SELECT * FROM wettkampf WHERE benutzer = ? ORDER BY datum DESC",
                new Object[]{benutzer}, new WettkampfRowMapper());
        return result;
    }

    public List<Wettkampf> findByBenutzerAndYear(String benutzer, int year) {
        List<Wettkampf> result;
        result = jdbcTemplate.query("SELECT * FROM wettkampf WHERE benutzer = ? " +
                        "AND date_part('year', datum::date) = ? ORDER BY datum DESC",
                new Object[]{benutzer, year}, new WettkampfRowMapper());
        return result;
    }
}
