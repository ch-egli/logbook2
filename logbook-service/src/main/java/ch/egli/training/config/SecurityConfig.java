package ch.egli.training.config;

import ch.egli.training.security.JwtConfigurer;
import ch.egli.training.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * JWT token based authentication.
 *
 * Adapted from example https://www.codementor.io/hantsy/protect-rest-apis-with-spring-security-and-jwt-ms5uu3zd6
 * Github: https://github.com/hantsy/springboot-jwt-sample
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        //@formatter:off
        http
            .httpBasic().disable()
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .headers()
                .frameOptions()  // Set X-Frame-Options in order to open iFrame to download an Excel file...
                .disable()
                .and()
                .requestMatchers()
                .antMatchers("/v1/**")
                .and()
                .authorizeRequests()
                .antMatchers("/v1/public/lastworkouts").permitAll()
                .antMatchers("/v1/**").authenticated()
            .and()
            .apply(new JwtConfigurer(jwtTokenProvider));
        //@formatter:on
    }


    // Passwords in database are "bcrypted"...
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

