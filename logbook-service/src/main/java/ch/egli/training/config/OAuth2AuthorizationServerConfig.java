package ch.egli.training.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.web.bind.annotation.CrossOrigin;

// TODO: add JWT support as defined in https://www.tutorialspoint.com/spring_boot/spring_boot_oauth2_with_jwt.htm
// or https://pattern-match.com/blog/2019/02/12/springboot2-and-oauth2-authorization-and-revocation/

@Configuration
@EnableAuthorizationServer
@CrossOrigin
public class OAuth2AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

	@Autowired
    private AuthenticationManager authenticationManager;
	
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.authenticationManager(this.authenticationManager);
	}
	
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients
			.inMemory()
				.withClient("logbookAngularClient")
				.accessTokenValiditySeconds(3600)     // seconds! -> default is: 44'000 seconds = 12.222 hours !!
				.secret("myAbcdghij9876Secret")
				.authorizedGrantTypes("password")
				.scopes("read", "write")
				.resourceIds("Logbook_Resources");
	}

}
