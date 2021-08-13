/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import ru.russianpost.tracking.portal.config.oauth.OAuthFailureHandler;
import ru.russianpost.tracking.portal.config.oauth.OAuthRequestResolver;
import ru.russianpost.tracking.portal.config.oauth.OAuthSuccessHandler;
import ru.russianpost.tracking.portal.config.oauth.OAuthUserService;

/**
 * Web security config
 *
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:29
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final OAuthUserService authUserService;
    private final OAuthRequestResolver authRequestResolver;
    private final OAuthFailureHandler authFailureHandler;
    private final OAuthSuccessHandler authSuccessHandler;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/api/**",
                "/statistics/**",
                "/access-settings/**"
                ).authenticated()
            .anyRequest().permitAll()
            .and()
                .exceptionHandling()
                .defaultAuthenticationEntryPointFor(authenticationEntryPoint, new AntPathRequestMatcher("/api**"))
            .and()
                .oauth2Login()
                .loginProcessingUrl("/c/login/post_id_callback")
                .failureHandler(authFailureHandler)
                .successHandler(authSuccessHandler)
                .authorizationEndpoint()
                .authorizationRequestResolver(authRequestResolver)
            .and()
                .userInfoEndpoint()
                .userService(authUserService).and()
            .and().logout().invalidateHttpSession(true).logoutSuccessUrl("/");
    }
}
