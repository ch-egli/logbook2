package ch.egli.training.model;

import java.util.List;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/9/19.
 */
public class ChartDataSet {
    private List<ChartData> chartData;
    private List<String> labels;

    public ChartDataSet(List<ChartData> chartData, List<String> labels) {
        this.chartData = chartData;
        this.labels = labels;
    }

    public List<ChartData> getChartData() {
        return chartData;
    }

    public List<String> getLabels() {
        return labels;
    }
}
