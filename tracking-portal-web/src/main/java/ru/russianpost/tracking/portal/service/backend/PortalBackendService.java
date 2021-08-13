/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend;

import ru.russianpost.tracking.portal.exceptions.PortalBackendUserAlreadyExistsException;
import ru.russianpost.tracking.portal.exceptions.PortalBackendUserNotFoundException;
import ru.russianpost.tracking.portal.exceptions.ServiceUnavailableException;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendCompany;
import ru.russianpost.tracking.portal.service.backend.model.PortalBackendUser;

/**
 * @author Amosov Maxim
 * @since 30.03.2021 : 17:44
 */
public interface PortalBackendService {
    /**
     * Retrieves user info from portal backend
     *
     * @param hid user hid
     * @return portal backend user
     * @throws PortalBackendUserNotFoundException portal backend user not found
     * @throws ServiceUnavailableException        portal backend is unavailable
     */
    PortalBackendUser getUser(String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException;

    /**
     * Creates new user on portal backend
     *
     * @param hid       user hid
     * @param unlimited user has unlimited access or not
     * @param email     user's email
     * @param company   company if present
     * @return portal backend created user
     * @throws PortalBackendUserAlreadyExistsException portal backend user already exists
     * @throws ServiceUnavailableException             portal backend is unavailable
     */
    PortalBackendUser registerUser(String hid, boolean unlimited, String email, PortalBackendCompany company)
        throws PortalBackendUserAlreadyExistsException, ServiceUnavailableException;

    /**
     * Resets password for user with specified hid
     *
     * @param hid user hid
     * @throws PortalBackendUserNotFoundException portal backend user not found
     * @throws ServiceUnavailableException        portal backend is unavailable
     */
    void resetPassword(String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException;

    /**
     * Sends information related to access settings for user with specified hid
     *
     * @param hid user hid
     * @throws PortalBackendUserNotFoundException portal backend user not found
     * @throws ServiceUnavailableException        portal backend is unavailable
     */
    void sendAccessSettingsInfo(String hid) throws PortalBackendUserNotFoundException, ServiceUnavailableException;
}
