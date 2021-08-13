/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend;

import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.OperTypeWithAttributeDto;

import java.util.List;

/**
 * @author Amosov Maxim
 * @since 26.04.2021 : 11:06
 */
public interface PortalBackendOperAttributesBuilder {
    /**
     * @param langCode lang code
     * @return oper types with oper attributes list
     */
    List<OperTypeWithAttributeDto> build(final String langCode);
}
