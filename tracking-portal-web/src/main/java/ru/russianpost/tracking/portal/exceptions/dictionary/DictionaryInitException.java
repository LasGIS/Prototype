/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions.dictionary;

/**
 * @author Amosov Maxim
 * @since 12.05.2021 : 10:35
 */
public class DictionaryInitException extends RuntimeException {
    /**
     * @param cause cause of this exception
     */
    public DictionaryInitException(final Throwable cause) {
        super("Fail to initialize Portal Backend service dictionaries!", cause);
    }
}
