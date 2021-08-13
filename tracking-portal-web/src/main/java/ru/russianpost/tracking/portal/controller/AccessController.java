/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.config.oauth.User;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserAlreadyExistsException;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserNotFoundException;
import ru.russianpost.tracking.portal.exceptions.PostIdIncompleteUserProfileException;
import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.exceptions.UserNotAuthorizedException;
import ru.russianpost.tracking.portal.service.backend.PortalBackendService;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendUser;
import ru.russianpost.tracking.portal.service.postid.PostIdProfileCheckService;
import ru.russianpost.tracking.portal.utils.UserUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * @author Amosov Maxim
 * @since 21.05.2021 : 17:55
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0/access")
public class AccessController extends BaseController {
    private final PortalBackendService portalBackendService;
    private final PostIdProfileCheckService profileCheckService;

    /**
     * @param request instance of {@link HttpServletRequest}
     * @throws PostIdIncompleteUserProfileException incomplete user profile detected
     * @throws PortalBackendUserNotFoundException   portal backend user not found
     * @throws ServiceUnavailableException          portal backend is unavailable
     * @throws UserNotAuthorizedException           user not authorized
     */
    @PostMapping(value = "get-access")
    public void getAccess(final HttpServletRequest request) {
        final Person2 person = UserUtils.getPerson(request);
        profileCheckService.checkProfile(person.getPersonHid());

        // Register a portal backend user and save it in our User
        final User user = UserUtils.getUser(request);
        user.setBackendUser(registerUserInPortalBackend(person));
    }

    private PortalBackendUser registerUserInPortalBackend(final Person2 person) {
        try {
            return portalBackendService.registerUser(person.getPersonHid(), false, person.getEmail(), null);
        } catch (final PortalBackendUserAlreadyExistsException ex) {
            log.warn("User already exists in portal backend! hid = {}", person.getPersonHid(), ex);
            return portalBackendService.getUser(person.getPersonHid());
        }
    }
}
