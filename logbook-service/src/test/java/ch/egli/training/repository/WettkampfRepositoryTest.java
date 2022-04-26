package ch.egli.training.repository;

import ch.egli.training.model.Wettkampf;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
@SpringBootTest
public class WettkampfRepositoryTest {

    @Autowired
    private WettkampfRepository wettkampfRepository;

    @Disabled
    @Test
    public void testGetWettkaempfeByBenutzer() {
        List<Wettkampf> result = wettkampfRepository.findByBenutzer("zoe");
        assertThat(result).isNotNull();
    }

    @Disabled
    @Test
    public void testGetWettkaempfeByBenutzerAndYear() {
        List<Wettkampf> result = wettkampfRepository.findByBenutzerAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

}
