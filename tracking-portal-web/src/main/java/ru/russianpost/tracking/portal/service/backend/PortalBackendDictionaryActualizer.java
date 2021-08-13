/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend;

/**
 * @author Amosov Maxim
 * @since 19.04.2021 : 15:28
 */
public interface PortalBackendDictionaryActualizer {
    /**
     * Actualize cache of backend service dictionaries, if the version of backend service has been changed.
     */
    void actualizePortalBackendDictionaries();
}
