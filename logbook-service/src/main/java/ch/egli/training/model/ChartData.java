package ch.egli.training.model;

import java.util.List;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/9/19.
 */
public class ChartData {
    private List<Double> data;
    private String label;
    private String yAxisID;

    public ChartData(List<Double> data, String label, String yAxisID) {
        this.data = data;
        this.label = label;
        this.yAxisID = yAxisID;
    }

    public List<Double> getData() {
        return data;
    }

    public String getLabel() {
        return label;
    }

    public String getyAxisID() {
        return yAxisID;
    }
}
