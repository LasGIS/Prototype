/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.exceptions.dictionary;

import static java.text.MessageFormat.format;

/**
 * @author Amosov Maxim
 * @since 12.05.2021 : 10:35
 */
public class DictionaryLoadException extends RuntimeException {
    /**
     * @param dictionaryUrl dictionary url
     * @param cause         cause of this exception
     */
    public DictionaryLoadException(final String dictionaryUrl, final Throwable cause) {
        super(format("Fail to load dictionary = {0}", dictionaryUrl), cause);
    }
}
