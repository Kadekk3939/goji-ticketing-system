package pl.polsl.tab.goji.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.annotation.Resource;


@Configuration
@EnableWebSecurity
@CrossOrigin(origins = "http://localhost:4200")
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Resource
    private UserDetailsService userDetailsService;

    @Autowired
    private PasswordEncoderBean encoder;

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(encoder.passwordEncoder());
        return authProvider;
    }

    @Override
    public void configure(final HttpSecurity http)
            throws Exception {
        http
                .httpBasic().and().csrf().disable()
                .formLogin()
                .defaultSuccessUrl("/welcome", true)
                .and()
                .logout()
                .deleteCookies("JSESSIONID")
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/login");
//            .and()
//            .authorizeRequests()
//            .antMatchers("/welcome").permitAll()
////                .antMatchers("/forum/**")
////                    .hasAnyAuthority(roles.getAuthoritiesOnLevel(4).toArray(new String[0]))
////                .antMatchers("/users")
////                    .hasAnyAuthority(roles.getAuthoritiesOnLevel(3).toArray(new String[0]))
//////                .antMatchers( "/create", "/update/*", "/password/*")
//////                    .hasAnyAuthority(roles.getAuthoritiesOnLevel(2).toArray(new String[0]))
////                .antMatchers( "/delete/*")
////                    .hasAnyAuthority(roles.getAuthoritiesOnLevel(1).toArray(new String[0]))
//        .anyRequest().authenticated();
    }
}
