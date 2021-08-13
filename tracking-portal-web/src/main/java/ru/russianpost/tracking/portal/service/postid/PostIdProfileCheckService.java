/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.postid;

import ru.russianpost.tracking.portal.exceptions.PostIdIncompleteUserProfileException;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 18:17
 */
public interface PostIdProfileCheckService {
    /**
     * Checking postId user profile
     *
     * @param personHid postId person identifier
     * @throws PostIdIncompleteUserProfileException when incomplete PostId profile detected
     */
    void checkProfile(String personHid) throws PostIdIncompleteUserProfileException;
}
