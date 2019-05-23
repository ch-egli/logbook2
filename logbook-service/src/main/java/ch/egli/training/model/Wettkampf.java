package ch.egli.training.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

/**
 * Entity containing a Wettkampf unit.
 *
 * @author Christian Egli
 * @since 23.05.2019.
 */
@Entity
@Table(name = "wettkampf")
public class Wettkampf {

    @Id
    @SequenceGenerator(name = "wettkampf_id_seq", sequenceName = "wettkampf_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wettkampf_id_seq")
    private Long id;

    @Column
    @NotNull
    private Date datum;

    @Column
    @NotNull
    private String beschreibung;

    @Column
    @NotNull
    private String abkuerzung;

    @Column
    @NotNull
    private String disziplin;

    @Column
    private String kategorie;

    @Column
    private String benutzer;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public void setBeschreibung(String beschreibung) {
        this.beschreibung = beschreibung;
    }

    public String getAbkuerzung() {
        return abkuerzung;
    }

    public void setAbkuerzung(String abkuerzung) {
        this.abkuerzung = abkuerzung;
    }

    public String getDisziplin() {
        return disziplin;
    }

    public void setDisziplin(String disziplin) {
        this.disziplin = disziplin;
    }

    public String getKategorie() {
        return kategorie;
    }

    public void setKategorie(String kategorie) {
        this.kategorie = kategorie;
    }

    public String getBenutzer() {
        return benutzer;
    }

    public void setBenutzer(String benutzer) {
        this.benutzer = benutzer;
    }
}
