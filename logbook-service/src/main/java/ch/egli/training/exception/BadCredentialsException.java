package ch.egli.training.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Christian Egli
 * @since 28.05.2019
 */
@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class BadCredentialsException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public BadCredentialsException() {}

    public BadCredentialsException(String message) {
        super(message);
    }

    public BadCredentialsException(String message, Throwable cause) {
        super(message, cause);
    }
}
