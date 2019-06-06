package ch.egli.training.repository;

import ch.egli.training.model.Benutzer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Repository for entity Benutzer.
 *
 * @author Christian Egli
 * @since 2/1/16.
 */
public interface BenutzerRepository extends CrudRepository<Benutzer, Long> {

    Benutzer findByBenutzername(String benutzername);

    List<Benutzer> findAllByOrderByIdAsc();

    @Modifying
    @Transactional
    public void deleteByBenutzername(String benutzername);
}
