package ch.egli.training.model;

import java.util.Collection;
import java.util.Set;

/**
 * @author Christian Egli
 * @since 5/9/19.
 */
public class BarChartData {
    private Collection<Integer> data;
    private Set<String> labels;

    public BarChartData(Collection<Integer> data, Set<String> labels) {
        this.data = data;
        this.labels = labels;
    }

    public Collection<Integer> getData() {
        return data;
    }

    public void setData(Collection<Integer> data) {
        this.data = data;
    }

    public Set<String> getLabels() {
        return labels;
    }

    public void setLabels(Set<String> labels) {
        this.labels = labels;
    }
}
