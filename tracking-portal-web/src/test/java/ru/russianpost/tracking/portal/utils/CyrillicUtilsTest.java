/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.utils;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

/**
 * @author Amosov Maxim
 * @since 04.05.2021 : 10:22
 */
public class CyrillicUtilsTest {
    @Test
    void isNotCyrillicOnRusTextShouldReturnFalse() {
        assertFalse(CyrillicUtils.isNotCyrillic("Тест"));
    }

    @Test
    void isNotCyrillicOnEngTextShouldReturnTrue() {
        assertTrue(CyrillicUtils.isNotCyrillic("Test"));
    }

    @Test
    void isNotCyrillicOnEngWithRusTextShouldReturnTrue() {
        assertTrue(CyrillicUtils.isNotCyrillic("Test Тест"));
    }

    @Test
    void isNotCyrillicOnRusWithSpecialsTextShouldReturnFalse() {
        assertFalse(CyrillicUtils.isNotCyrillic("Тест!,. ;:"));
    }
}
