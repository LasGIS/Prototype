/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.config
/*
import com.fasterxml.jackson.databind.ObjectMapper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.builders.WebSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint
import org.springframework.security.web.authentication.preauth.AbstractPreAuthenticatedProcessingFilter
import org.springframework.security.web.util.matcher.AntPathRequestMatcher
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
/**
 * @author Andrey Semochkin
 * @version 1.0
 * @since <pre>14.09.17</pre>
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
class WebSecurityConfig(
    @Autowired val objectMapper: ObjectMapper
) : WebSecurityConfigurerAdapter() {

    @Value("\${oauth.application.storage.pass}")
    private val oauthStoragePass: String? = null
    @Value("\${oauth.application.ext.url}")
    private val appExtUrl: String? = null
    @Value("\${oauth.application.cookie.lifetime.seconds}")
    private val cookieLifeTime = 0
//    @Autowired
//    private val objectMapper: ObjectMapper? = null

    companion object {
        private const val INJECTION_ATTR_NAME = "OAuth-Context"
        private const val AUTH_TOKEN = "auth-Token"
    }

    //    private final OAuthClient authRestClient;
//    private final UserEmsService userEmsService;
    @Throws(Exception::class)
    override fun configure(web: WebSecurity) {
        web.ignoring()
            .antMatchers("/static/**")
            .antMatchers("/webjars/**")
            .antMatchers("/**/version/**")
            .antMatchers("/**/emulationError/**")
            .antMatchers("/**/swagger-ui.html/**")
            .antMatchers("/*.css**")
            .antMatchers("*.js**")
            .antMatchers("/fonts/**")
            .antMatchers("*.png**")
            .antMatchers("/**/v1.0/pokd/**")
            .antMatchers("/**/v1.0/system-info/**")
            .antMatchers("/**/monitoring/**")
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/resources/**", "/login", "/logout").permitAll()
            .and()
            .logout().logoutUrl("/logout").permitAll()
            .invalidateHttpSession(true)
            .logoutSuccessHandler {httpServletRequest, httpServletResponse, authentication ->
                httpServletResponse.status = HttpServletResponse.SC_OK
                httpServletResponse.setHeader(AUTH_TOKEN, null)
            }
            .and()
            .exceptionHandling()
            .defaultAuthenticationEntryPointFor(Http403ForbiddenEntryPoint(), AntPathRequestMatcher("/**"))
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
//            .authenticationProvider(preAuth())
//            .addFilterBefore(oauthFilter(), AbstractPreAuthenticatedProcessingFilter.class)
            .addFilterBefore(
                object : AbstractPreAuthenticatedProcessingFilter() {
                    override fun getPreAuthenticatedPrincipal(request: HttpServletRequest): Any {
                        return request.getAttribute(INJECTION_ATTR_NAME)
                    }

                    override fun getPreAuthenticatedCredentials(request: HttpServletRequest): Any {
                        return "N/A"
                    }

                    init {
                        setAuthenticationManager(authenticationManagerBean())
                    }
                },
                AbstractPreAuthenticatedProcessingFilter::class.java
            )
    }

    /**
     * @return pre authenticate authentication provider bean
     * @Bean
     * public PreAuthenticatedAuthenticationProvider preAuth() {
     * PreAuthenticatedAuthenticationProvider pA = new PreAuthenticatedAuthenticationProvider();
     * pA.setPreAuthenticatedUserDetailsService(token -> {
     * UkdAuthToken ukdAuthToken = (UkdAuthToken) token.getPrincipal();
     * return UkdAuthUser.create(ukdAuthToken.getAuthToken(), USEREMS_DTO_2_ENTITY.apply(ukdAuthToken.getUser()));
     * });
     * return pA;
     * }
     */
    /**
     * Creation and initialization oauth filter
     *
     * @return OAuthFilter
     * private UkdAuthFilterWrapper oauthFilter() {
     * return new UkdAuthFilterWrapper(
     * INJECTION_ATTR_NAME,
     * authRestClient,
     * appExtUrl,
     * call -> call.getPath().startsWith("/monitoring")
     * || call.getPath().startsWith("/actuator")
     * || call.getPath().startsWith("/version")
     * || call.getPath().startsWith("/css")
     * || call.getPath().startsWith("/js")
     * || call.getPath().startsWith("/swagger-ui.html")
     * || call.getPath().startsWith("/swagger-resources")
     * || call.getPath().startsWith("/v2")
     * || call.getPath().startsWith("/v1.0/pokd")
     * || call.getPath().equals("/")
     * || call.getPath().startsWith("/error")
     * || call.getPath().startsWith("/img")
     * || call.getPath().startsWith("/sounds")
     * || call.getPath().startsWith("/favicon.ico"),
     * "/auth",
     * userEmsService,
     * new UkdAuthUtil(objectMapper, new AesCryptoProvider(oauthStoragePass))
     * );
     * }
     */
}*/