/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.utils;

import lombok.experimental.UtilityClass;

import java.util.regex.Pattern;

/**
 * @author Amosov Maxim
 * @since 30.04.2021 : 12:27
 */
@UtilityClass
public class CyrillicUtils {
    /**
     * @param text text to check
     * @return true if text not contains only cyrillic symbols, false otherwise
     */
    public Boolean isNotCyrillic(final String text) {
        return !Pattern.matches("^[\\p{InCyrillic}.,!-\" \\d:;'()]*$", text);
    }
}
