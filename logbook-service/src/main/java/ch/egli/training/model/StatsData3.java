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
public class StatsData3 {
    private Date workoutDate;
    private Double countTrainings;
    private Double trainingszeit;
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
    private Double countPhysio;
    private Date statusDate;
    private Double schlaf;
    private Double gefuehlK;
    private Double gefuehlM;
}
