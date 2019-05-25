package ch.egli.training.repository;

import ch.egli.training.model.StatsData;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class StatisticsRepositoryTest {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Ignore
    @Test
    public void testGetStatisticsData() {
        List<StatsData> result = statisticsRepository.getStatsByUserAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

    @Ignore
    @Test
    public void testGetTrainingsortStatistics() {
        Map<String, Integer> result = statisticsRepository.getTrainingsorteByUserAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

    @Ignore
    @Test
    public void testGetDisziplinenStatistics() {
        Map<String, Integer> result = statisticsRepository.getDisziplinenByUserAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

}
