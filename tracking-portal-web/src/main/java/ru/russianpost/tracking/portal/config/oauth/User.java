/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.oauth;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendUser;

/**
 * Custom OAuth2User with postId Person2 and PortalBackendUser
 *
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:34
 */
@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class User extends DefaultOAuth2User {
    private final Person2 person;
    private PortalBackendUser backendUser;

    /**
     * User constructor
     *
     * @param auth2User        basic OAuth2User
     * @param nameAttributeKey attribute key to extract user name
     * @param postIdPerson     postId user
     * @param backendUser      portal backend user, can be null
     */
    public User(
        final OAuth2User auth2User,
        final String nameAttributeKey,
        final Person2 postIdPerson,
        final PortalBackendUser backendUser
    ) {
        super(auth2User.getAuthorities(), auth2User.getAttributes(), nameAttributeKey);
        this.person = postIdPerson;
        this.backendUser = backendUser;
    }
}
