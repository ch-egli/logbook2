package ch.egli.training.repository;

import ch.egli.training.model.StatsData;
import ch.egli.training.model.StatsData3;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
@SpringBootTest
public class StatisticsRepositoryTest {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @Disabled
    @Test
    public void testGetStatisticsData() {
        List<StatsData> result = statisticsRepository.getStatsByUserAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

    @Disabled
    @Test
    public void testGetTrainingsortStatistics() {
        Map<String, Integer> result = statisticsRepository.getTrainingsorteByUserAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

    @Disabled
    @Test
    public void testGetDisziplinenStatistics() {
        Map<String, Integer> result = statisticsRepository.getDisziplinenByUserAndYear("zoe", 2019);
        assertThat(result).isNotNull();
    }

    @Disabled
    @Test
    public void testGetLastDaysStatistics() {
        List<StatsData3> result = statisticsRepository.getStatsByUserAndLastDays("chrigu", 22);
        assertThat(result).isNotNull();
    }

}
