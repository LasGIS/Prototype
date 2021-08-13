/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.controller.dto.UserInfo;
import ru.russianpost.tracking.portal.exceptions.UserNotAuthorizedException;
import ru.russianpost.tracking.portal.utils.UserUtils;

import javax.servlet.http.HttpServletRequest;

import static java.util.Objects.nonNull;
import static org.apache.commons.lang3.StringUtils.isNotEmpty;

/**
 * @author Amosov Maxim
 * @since 23.05.2021 : 16:38
 */
@RestController
@RequestMapping("/api/v1.0/user")
public class UserController extends BaseController {

    /**
     * @param request request instance of {@link HttpServletRequest}
     * @return user info
     * @throws UserNotAuthorizedException user not authorized
     */
    @GetMapping("info")
    public UserInfo getUserInfo(final HttpServletRequest request) {
        final Person2 person = UserUtils.getPerson(request);
        return UserInfo.builder()
            .hid(person.getPersonHid())
            .name(getPersonNameForView(person))
            .isServiceTrackingUser(UserUtils.isAuthorizedInBackend(request))
            .isAuthorized(true)
            .build();
    }

    private String getPersonNameForView(final Person2 person) {
        if (isNotEmpty(person.getFullNameRawSource())) {
            return person.getFullNameRawSource();
        } else if (isNotEmpty(person.getPhone())) {
            return "+" + person.getPhone();
        } else if (nonNull(person.getPrimaryPhone())) {
            return "+" + person.getPrimaryPhone().getTelephone();
        } else {
            return "Профиль";
        }
    }
}
