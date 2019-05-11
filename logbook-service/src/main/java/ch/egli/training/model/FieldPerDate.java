package ch.egli.training.model;

import java.util.List;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/8/19.
 */
public class FieldPerDate {
    private String name;
    private List<NameValue> series;

    public FieldPerDate(String name, List<NameValue> series) {
        this.name = name;
        this.series = series;
    }

    public String getName() {
        return name;
    }

    public List<NameValue> getSeries() {
        return series;
    }
}
