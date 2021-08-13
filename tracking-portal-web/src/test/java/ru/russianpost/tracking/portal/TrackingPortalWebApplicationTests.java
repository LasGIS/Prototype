/*
 * Copyright (c) 2021. Prototype
 */

package ru.russianpost.tracking.portal;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.ActiveProfiles;
import ru.russianpost.tracking.portal.service.backend.impl.PortalBackendDictionaryActualizerImpl;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
@ActiveProfiles("test")
class TrackingPortalWebApplicationTests {
    @MockBean
    private PortalBackendDictionaryActualizerImpl portalBackendDictionaryActualizer;
    @Autowired
    private ApplicationContext context;

    @Test
    void contextLoads() {
        assertNotNull(context, "Application context should be loaded successfully!");
    }
}
