/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.controller.dto.AccessSettingsDto;
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
 * @since 02.04.2021 : 9:31
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1.0/access-settings")
public class AccessSettingsController extends BaseController {
    private final PortalBackendService portalBackendService;
    private final PostIdProfileCheckService profileCheckService;

    /**
     * @param request instance of {@link HttpServletRequest}
     * @return instance of {@link AccessSettingsDto}
     * @throws PortalBackendUserNotFoundException portal backend user not found
     * @throws ServiceUnavailableException        portal backend is unavailable
     * @throws UserNotAuthorizedException         user not authorized
     */
    @GetMapping
    public AccessSettingsDto accessSettings(final HttpServletRequest request) {
        final Person2 person = UserUtils.getPerson(request);
        final PortalBackendUser backendUser = portalBackendService.getUser(person.getPersonHid());
        return AccessSettingsDto.builder()
            .userEmail(person.getEmail())
            .backendUserLogin(backendUser.getLogin())
            .isBatchAccessAllowed(backendUser.isUnlimited())
            .build();
    }

    /**
     * @param request instance of {@link HttpServletRequest}
     * @throws PostIdIncompleteUserProfileException incomplete user profile detected
     * @throws PortalBackendUserNotFoundException   portal backend user not found
     * @throws ServiceUnavailableException          portal backend is unavailable
     * @throws UserNotAuthorizedException           user not authorized
     */
    @PostMapping(value = "resetPassword")
    public void resetPassword(final HttpServletRequest request) {
        final Person2 person = UserUtils.getPerson(request);
        profileCheckService.checkProfile(person.getPersonHid());
        portalBackendService.resetPassword(person.getPersonHid());
    }

    /**
     * @param request instance of {@link HttpServletRequest}
     * @throws PostIdIncompleteUserProfileException incomplete user profile detected
     * @throws PortalBackendUserNotFoundException   portal backend user not found
     * @throws ServiceUnavailableException          portal backend is unavailable
     * @throws UserNotAuthorizedException           user not authorized
     */
    @PostMapping(value = "sendInfo")
    public void sendInfo(final HttpServletRequest request) {
        final Person2 person = UserUtils.getPerson(request);
        profileCheckService.checkProfile(person.getPersonHid());
        portalBackendService.sendAccessSettingsInfo(person.getPersonHid());
    }
}
