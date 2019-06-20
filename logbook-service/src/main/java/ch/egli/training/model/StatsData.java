package ch.egli.training.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.sql.Date;

/**
 * @author Christian Egli
 * @since 5/17/19.
 */
@Data
@AllArgsConstructor
public class StatsData {
    private Integer year;
    private Integer week;
    private Date weekDate;
    private Double countTrainings;
    private Double avgTrainingszeit;
    private Double avgSchlaf;
    private Double countSchlafLessThan7;
    private Double avgGefuehl;
    private Double countGefuehlMoreThan2;
    private Double avgBelastung;
    private Double maxBelastung;
    private Double zuege12;
    private Double zuege23;
    private Double zuege34;
    private Double totalZuege;
    private Double countLead;
    private Double countBouldern;
    private Double countSpeed;
    private Double countCampus;
    private Double countKraft;
    private Double countStretching;
    private Double countMentaltraining;
    private Double countJogging;
}
