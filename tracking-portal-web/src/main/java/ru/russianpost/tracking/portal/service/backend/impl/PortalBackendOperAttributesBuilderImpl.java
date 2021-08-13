/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.russianpost.tracking.portal.config.backend.PortalBackendDictionaryOperationsProperties;
import ru.russianpost.tracking.portal.service.backend.PortalBackendOperAttributesBuilder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl.OperAttributeHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.impl.OperTypeHolder;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.OperAttributeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.OperTypeWithAttributeDto;
import ru.russianpost.tracking.portal.utils.CyrillicUtils;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.Collections.emptyMap;

/**
 * @author Amosov Maxim
 * @since 26.04.2021 : 11:08
 */
@Component
@RequiredArgsConstructor
public class PortalBackendOperAttributesBuilderImpl implements PortalBackendOperAttributesBuilder {
    private final OperTypeHolder operTypeHolder;
    private final OperAttributeHolder operAttributeHolder;
    private final PortalBackendDictionaryOperationsProperties operationProperties;

    @Override
    public List<OperTypeWithAttributeDto> build(final String langCode) {
        final Map<Integer, String> operTypes = operTypeHolder.getMapByLocaleCode(langCode);
        final Map<Integer, Map<Integer, String>> operAttributesMap = operAttributeHolder.getMapByLocale(langCode);
        return operTypes.entrySet().stream()
            .filter(oper -> !operationProperties.isHiddenOperation(oper.getKey()))
            .filter(oper -> "RUS".equals(langCode) || CyrillicUtils.isNotCyrillic(oper.getValue()))
            .map(oper -> new OperTypeWithAttributeDto(
                oper.getKey(),
                oper.getValue(),
                operationProperties.isTerminalOperation(oper.getKey()),
                getOperAttributesDtos(oper.getKey(), operAttributesMap, langCode)
            ))
            .sorted(Comparator.comparing(OperTypeWithAttributeDto::getCode))
            .collect(Collectors.toList());
    }

    private List<OperAttributeDto> getOperAttributesDtos(
        final Integer operTypeId,
        final Map<Integer, Map<Integer, String>> operAttributesMap,
        final String langCode
    ) {
        return operAttributesMap.getOrDefault(operTypeId, emptyMap())
            .entrySet().stream()
            .filter(attr -> !operationProperties.isHiddenAttribute(operTypeId, attr.getKey()))
            .filter(attr -> "RUS".equals(langCode) || CyrillicUtils.isNotCyrillic(attr.getValue()))
            .map(attr -> new OperAttributeDto(
                attr.getKey(),
                attr.getValue(),
                operationProperties.isTerminalAttribute(operTypeId, attr.getKey())
            ))
            .sorted(Comparator.comparing(OperAttributeDto::getCode))
            .collect(Collectors.toList());
    }
}
