package ch.egli.training.model;

import lombok.Data;

import java.util.List;
import java.util.Map;

/**
 * @author Christian Egli
 * @since 5/9/19.
 */
@Data
public class ChartDataSet {
    private Map<String, List<Double>> chartData;
    private List<String> labels;

    private List<Wettkampf> wettkaempfe;

    public ChartDataSet(Map<String, List<Double>> chartData, List<String> labels, List<Wettkampf> wettkaempfe) {
        this.chartData = chartData;
        this.labels = labels;
        this.wettkaempfe = wettkaempfe;
    }

}
