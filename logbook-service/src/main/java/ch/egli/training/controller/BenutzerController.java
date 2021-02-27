package ch.egli.training.controller;

import ch.egli.training.exception.BadCredentialsException;
import ch.egli.training.exception.BadRequestException;
import ch.egli.training.model.Benutzer;
import ch.egli.training.repository.BenutzerRepository;
import ch.egli.training.util.ResourceValidator;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * REST controller for accessing users.
 *
 * @author Christian Egli
 * @since 2/1/16.
 */
@Slf4j
@CrossOrigin // allow cross-origin requests for angular frontends...
@RestController
@RequestMapping({"/v1/"})
public class BenutzerController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BenutzerController.class.getName());

    private final static String HIDDEN_PASSWORD = "*****";

    private final static String ROLE_ATHLETE = "athlet";

    @Autowired
    private BenutzerRepository benutzerRepository;

    @Autowired
    private ResourceValidator resourceValidator;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Benutzer>> getAllUsers() {
        final Iterable<Benutzer> allUsers = benutzerRepository.findAllByOrderByIdAsc();
        return new ResponseEntity<Iterable<Benutzer>>(allUsers, HttpStatus.OK);
    }

    @RequestMapping(value = "/athletes", method = RequestMethod.GET)
    public ResponseEntity<Iterable<String>> getUserNames() {
        final Iterable<Benutzer> allUsers = benutzerRepository.findAllByOrderByIdAsc();
        final List<String> allAthletes = new ArrayList<>();
        for (Benutzer benutzer : allUsers) {
            if (benutzer.getRollen().contains(ROLE_ATHLETE)) {
                allAthletes.add(benutzer.getBenutzername());
            }
        }
        LOGGER.info("All athlete's names: {}", Arrays.toString(allAthletes.stream().toArray(String[]::new)));
        return new ResponseEntity<Iterable<String>>(allAthletes, HttpStatus.OK);
    }

    @RequestMapping(value = "/users/{benutzername}", method = RequestMethod.GET)
    public ResponseEntity<?> getUser(@PathVariable String benutzername) {
        resourceValidator.validateUser(benutzername);
        final Benutzer benutzer = benutzerRepository.findByBenutzername(benutzername);
        return new ResponseEntity<>(benutzer, HttpStatus.OK);
    }

    /**
     * Auxiliary method to get user information without showing the password.
     */
    @RequestMapping(value = "/usrs/{benutzername}", method = RequestMethod.GET)
    public ResponseEntity<?> getUserInfo(@PathVariable String benutzername) {
        resourceValidator.validateUser(benutzername);
        final Benutzer benutzer = benutzerRepository.findByBenutzername(benutzername);
        benutzer.setPasswort(HIDDEN_PASSWORD);
        return new ResponseEntity<>(benutzer, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@Valid @RequestBody Benutzer benutzer) {
        final HttpHeaders responseHeaders = new HttpHeaders();
        try {
            // save the new workout...
            benutzer = benutzerRepository.save(benutzer);

            // Set the location header for the newly created resource
            final URI newUserUri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(benutzer.getId()).toUri();
            responseHeaders.setLocation(newUserUri);
        } catch (Exception e) {
            throw new BadRequestException("User could not be saved in the database: " + e.getMessage());
        }

        return new ResponseEntity<>(null, responseHeaders, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/users/{benutzername}", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@Valid @RequestBody Benutzer benutzer, @PathVariable String benutzername) {
        resourceValidator.validateUser(benutzername);

        // only allow updating a user with an benutzername that corresponds to the given benutzername!
        // otherwise we allow insert operations with PUT...
        benutzer.setBenutzername(benutzername);

        benutzerRepository.save(benutzer);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PreAuthorize("hasAuthority('admin')")
    @RequestMapping(value = "/users/{benutzername}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable String benutzername) {
        resourceValidator.validateUser(benutzername);
        benutzerRepository.deleteByBenutzername(benutzername);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/users/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest data) {
        final String username = SecurityContextHolder.getContext().getAuthentication().getName();
        log.info("User {} requests to update his password...", username);

        final Benutzer benutzer = benutzerRepository.findByBenutzername(username);
        if (benutzer == null) {
            log.error("user {} does not exist...", username);
            throw new UsernameNotFoundException(String.format("User with the username %s doesn't exist", username));
        }

        checkOldPasswordIsValid(benutzer, data.getOldPassword());

        benutzer.setPasswort(passwordEncoder.encode(data.getNewPassword()));
        benutzerRepository.save(benutzer);
        log.info("User {} has successfully changed his password...", username);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private void checkOldPasswordIsValid(Benutzer benutzer, String providedPassword) {
        if (!passwordEncoder.matches(providedPassword, benutzer.getPasswort())) {
            log.error("Provided old password for user {} is invalid", benutzer.getBenutzername());
            throw new BadCredentialsException("provided password is not valid");
        }
    }

}
