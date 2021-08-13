/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.postid;

import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.service.postid.model.PostIdProfile;

/**
 * @author Amosov Maxim
 * @since 31.03.2021 : 10:27
 */
public interface PostIdService {
    /**
     * @return postId logout url
     */
    String getLogoutUrl();

    /**
     * @return postId user account url
     */
    String getUserAccountUrl();

    /**
     * Return user profile from postId
     *
     * @param hid hid of profile owner
     * @return postId profile
     * @throws ServiceUnavailableException then service unavailable
     */
    PostIdProfile getUserProfile(String hid) throws ServiceUnavailableException;
}
