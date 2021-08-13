/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.file;

import org.springframework.core.io.ClassPathResource;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

/**
 * @author Amosov Maxim
 * @since 29.04.2021 : 14:07
 */
public abstract class FileHolder {
    /**
     * @param filePath path to file
     * @return file directly from 'filePath', and if it doesn't exist, loads it from classpath
     * @throws IOException if file not found
     */
    protected File getFile(final String filePath) throws IOException {
        final File file = new File(Paths.get(filePath).toUri());
        return file.exists() ? file : new ClassPathResource(filePath).getFile();
    }
}
