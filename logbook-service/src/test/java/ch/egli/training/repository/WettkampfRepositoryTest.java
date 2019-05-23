package ch.egli.training.repository;

import ch.egli.training.model.Wettkampf;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class WettkampfRepositoryTest {

    @Autowired
    private WettkampfRepository wettkampfRepository;

    @Ignore
    @Test
    public void testGetWettkaempfeByBenutzer() {
        List<Wettkampf> result = wettkampfRepository.findByBenutzer("zoe");
        assertThat(result).isNotNull();
    }

    @Ignore
    @Test
    public void testGetWettkaempfeByBenutzerAndYear() {
        List<Wettkampf> result = wettkampfRepository.findByBenutzerAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

}
