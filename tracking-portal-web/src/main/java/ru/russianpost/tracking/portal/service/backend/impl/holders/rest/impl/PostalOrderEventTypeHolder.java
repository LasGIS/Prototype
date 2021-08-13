/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl;

import org.springframework.stereotype.Component;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.LocalizedHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.RestHolderConfig;

/**
 * @author Amosov Maxim
 * @since 21.04.2021 : 17:02
 */
@Component
public class PostalOrderEventTypeHolder extends LocalizedHolder {
    /**
     * @param holderConfig rest holder config
     */
    public PostalOrderEventTypeHolder(final RestHolderConfig holderConfig) {
        super(buildDictionaryUri(holderConfig.getDictionaryUrl(), "postalOrderEventTypes"), holderConfig.getRestTemplate());
    }
}
