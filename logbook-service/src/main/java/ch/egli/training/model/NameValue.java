package ch.egli.training.model;

/**
 * TODO: Describe
 *
 * @author Christian Egli
 * @since 5/8/19.
 */
public class NameValue {

    private String name;
    private Double value;

    public NameValue(String name, Double value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public Double getValue() {
        return value;
    }
}
