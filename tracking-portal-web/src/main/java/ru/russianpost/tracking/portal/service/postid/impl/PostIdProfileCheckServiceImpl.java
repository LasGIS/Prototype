/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.postid.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.russianpost.pochtaid.sso.vo2.Person2;
import ru.russianpost.tracking.portal.exceptions.PostIdIncompleteUserProfileException;
import ru.russianpost.tracking.portal.service.postid.PostIdProfileCheckService;
import ru.russianpost.tracking.portal.service.postid.PostIdService;
import ru.russianpost.tracking.portal.service.postid.model.PostIdProfile;

import static java.text.MessageFormat.format;
import static org.apache.commons.lang3.StringUtils.isBlank;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:18
 */
@Service
@RequiredArgsConstructor
public class PostIdProfileCheckServiceImpl implements PostIdProfileCheckService {
    private static final String INCOMPLETE_PROFILE_MSG = "Incomplete User Profile detected! email = [{0}], firstName = [{1}],lastName = [{2}]";
    private static final String EMPTY_PROFILE_MSG = "Got Info Profile without persons from PostId service";
    private final PostIdService postIdService;

    @Override
    public void checkProfile(final String personHid) throws PostIdIncompleteUserProfileException {
        final PostIdProfile profile = postIdService.getUserProfile(personHid);
        if (profile.getPersons().isEmpty()) {
            throw new PostIdIncompleteUserProfileException(EMPTY_PROFILE_MSG);
        }
        final Person2 person = profile.getPersons().get(0);
        if (isBlank(person.getEmail()) || isBlank(person.getFirstName()) || isBlank(person.getLastName())) {
            final String filledMsg = format(INCOMPLETE_PROFILE_MSG, person.getEmail(), person.getFirstName(), person.getLastName());
            throw new PostIdIncompleteUserProfileException(filledMsg);
        }
    }
}
