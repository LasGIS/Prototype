/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.backend;

import lombok.Data;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

import static java.util.Collections.emptyList;
import static java.util.stream.Collectors.toMap;

/**
 * @author Amosov Maxim
 * @since 23.04.2021 : 16:55
 */
@Setter
@ConfigurationProperties(prefix = "portal.backend.dictionary.operations")
public class PortalBackendDictionaryOperationsProperties {
    private List<Operation> hidden;
    private List<Operation> terminal;
    private Map<Integer, List<Integer>> hiddenOperationsMap;
    private Map<Integer, List<Integer>> terminalOperationsMap;

    @PostConstruct
    public void init() {
        hiddenOperationsMap = hidden.stream().collect(toMap(Operation::getId, Operation::getAttributes));
        terminalOperationsMap = terminal.stream().collect(toMap(Operation::getId, Operation::getAttributes));
    }

    /**
     * @param operTypeId operation type  id
     * @return 'true' if operation is hidden, 'false' otherwise
     */
    public Boolean isHiddenOperation(final Integer operTypeId) {
        return hiddenOperationsMap.containsKey(operTypeId) && hiddenOperationsMap.get(operTypeId).isEmpty();
    }

    /**
     * @param operTypeId operation type  id
     * @param operAttrId operation attribute id
     * @return 'true' if operation attribute is hidden, 'false' otherwise
     */
    public Boolean isHiddenAttribute(final Integer operTypeId, final Integer operAttrId) {
        return hiddenOperationsMap.getOrDefault(operTypeId, emptyList()).contains(operAttrId);
    }

    /**
     * @param operTypeId operation type id
     * @return 'true' if operation type is terminal, 'false' otherwise
     */
    public Boolean isTerminalOperation(final Integer operTypeId) {
        return terminalOperationsMap.containsKey(operTypeId) && terminalOperationsMap.get(operTypeId).isEmpty();
    }

    /**
     * @param operTypeId operation type id
     * @param operAttrId operation attribute id
     * @return 'true' if operation attribute is terminal, 'false' otherwise
     */
    public Boolean isTerminalAttribute(final Integer operTypeId, final Integer operAttrId) {
        return terminalOperationsMap.getOrDefault(operTypeId, emptyList()).contains(operAttrId);
    }

    /**
     * Nested class for storing terminal and hidden operations
     */
    @Data
    private static class Operation {
        private Integer id;
        private List<Integer> attributes;
    }
}
