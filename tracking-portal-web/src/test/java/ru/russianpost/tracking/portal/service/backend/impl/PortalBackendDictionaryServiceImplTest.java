/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.service.backend.impl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestTemplate;
import ru.russianpost.tracking.portal.config.backend.PortalBackendDictionaryOperationsProperties;
import ru.russianpost.tracking.portal.service.backend.impl.holders.file.model.TechnicalTerm;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.EventTypeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.OperTypeWithAttributeDto;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.SimpleKeyValue;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.BigIntLocalizedResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.CountryResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.DictionaryResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.LocalizedResponse;
import ru.russianpost.tracking.portal.service.backend.impl.holders.rest.model.response.OperationAttributeResponse;
import ru.russianpost.tracking.web.model.info.BigIntegerLocalizedKey;
import ru.russianpost.tracking.web.model.info.CountryInfo;
import ru.russianpost.tracking.web.model.info.LocalizedKey;
import ru.russianpost.tracking.web.model.info.LocalizedOperationKey;

import java.math.BigInteger;
import java.util.List;

import static java.util.Collections.singletonList;
import static org.apache.commons.lang3.StringUtils.EMPTY;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doReturn;

/**
 * @author Amosov Maxim
 * @since 21.04.2021 : 12:16
 */
@ActiveProfiles("test")
@ConfigurationPropertiesScan
@SpringBootTest(classes = {
    PortalBackendDictionaryServiceImpl.class, PortalBackendDictionaryTestConfig.class,
    PortalBackendDictionaryOperationsProperties.class, PortalBackendOperAttributesBuilderImpl.class
})
public class PortalBackendDictionaryServiceImplTest {
    private static final String LANG_RU_CODE = "ru";
    private static final String LANG_EN_CODE = "en";

    @MockBean
    @Qualifier("portalBackendRestTemplate")
    private RestTemplate restTemplate;
    @Value("${portal.backend.dictionary-url}")
    private String dictionaryUrl;

    @Autowired
    private PortalBackendDictionaryServiceImpl backendDictionaryService;

    @BeforeEach
    void setUp() {
        doReturn(new DictionaryResponse<>()).when(restTemplate).getForObject(anyString(), any());
    }

    @Test
    void getSendCategoriesShouldReturnCorrectValue() {
        final String testValue = "Тест";
        prepareRestTemplate("sendCategories", testValue);

        backendDictionaryService.reloadDictionaryHolders();
        assertEquals(testValue, backendDictionaryService.getSendCategories(LANG_RU_CODE).get(0).getName());
    }

    @Test
    void getMailTypesShouldReturnCorrectValue() {
        final String testValue = "тест";
        prepareRestTemplate("mailTypes", testValue);

        backendDictionaryService.reloadDictionaryHolders();
        assertEquals(testValue, backendDictionaryService.getMailTypes(LANG_RU_CODE).get(0).getName());
    }

    @Test
    void getMailCategoriesShouldReturnCorrectValue() {
        final String testValue = "тест";
        prepareRestTemplate("mailCategories", testValue);

        backendDictionaryService.reloadDictionaryHolders();
        assertEquals(testValue, backendDictionaryService.getMailCategories(LANG_RU_CODE).get(0).getName());
    }

    @Test
    void getMailRanksShouldReturnCorrectValue() {
        final String testValue = "тест";
        prepareRestTemplate("mailRanks", testValue);

        backendDictionaryService.reloadDictionaryHolders();
        assertEquals(testValue, backendDictionaryService.getMailRanks(LANG_RU_CODE).get(0).getName());
    }

    @Test
    void getPostalOrderEventTypesShouldReturnCorrectValueAndDescription() {
        final String testValue = "тест";
        final String testDescription = "Тестовое описание";
        prepareRestTemplate("postalOrderEventTypes", testValue);

        backendDictionaryService.reloadDictionaryHolders();
        final EventTypeDto eventTypeDto = backendDictionaryService.getPostalOrderEventTypes(LANG_RU_CODE).get(0);
        assertEquals(testValue, eventTypeDto.getName());
        assertEquals(testDescription, eventTypeDto.getDescription());
    }

    @Test
    void getOperAttrsShouldReturnCorrectValue() {
        final String testValue = "тест";
        final OperationAttributeResponse response = new OperationAttributeResponse();
        response.setItems(singletonList(createKeyValue(new LocalizedOperationKey("RUS", 1, 1), testValue)));
        doReturn(response).when(restTemplate).getForObject(dictionaryUrl + "operAttributes", OperationAttributeResponse.class);
        prepareRestTemplate("operTypes", testValue);

        backendDictionaryService.reloadDictionaryHolders();
        final OperTypeWithAttributeDto attrTypeDto = backendDictionaryService.getOperTypeWithAttributes(LANG_RU_CODE).get(0);
        assertEquals(testValue, attrTypeDto.getName());
        assertTrue(attrTypeDto.getAttributes().get(0).isTerminal());
    }

    @Test
    void getPostMarksShouldReturnCorrectValue() {
        final String testValue = "тест";
        final BigIntLocalizedResponse response = new BigIntLocalizedResponse();
        response.setItems(singletonList(createKeyValue(new BigIntegerLocalizedKey("RUS", BigInteger.ONE), testValue)));
        doReturn(response).when(restTemplate).getForObject(dictionaryUrl + "postMarks", BigIntLocalizedResponse.class);

        backendDictionaryService.reloadDictionaryHolders();
        assertEquals(testValue, backendDictionaryService.getPostMarks(LANG_RU_CODE).get(0).getName());
    }

    @Test
    void getCountriesShouldReturnCorrectValue() {
        final String testCodeA2 = "testCodeA2";
        final CountryResponse response = new CountryResponse();
        response.setItems(singletonList(new CountryInfo(1, testCodeA2, EMPTY, EMPTY, EMPTY, EMPTY)));
        doReturn(response).when(restTemplate).getForObject(dictionaryUrl + "countries", CountryResponse.class);

        backendDictionaryService.reloadDictionaryHolders();
        assertEquals(testCodeA2, backendDictionaryService.getCountries(LANG_RU_CODE).get(0).getCodeA2());
    }

    @Test
    void getTechnicalTermsShouldReturnCorrectRuName() {
        final List<TechnicalTerm> ruTechnicalTerms = backendDictionaryService.getTechnicalTerms(LANG_RU_CODE);
        assertEquals("Тест", ruTechnicalTerms.get(0).getName());
    }

    @Test
    void getTechnicalTermsShouldReturnCorrectEnName() {
        final List<TechnicalTerm> enTechnicalTerms = backendDictionaryService.getTechnicalTerms(LANG_EN_CODE);
        assertEquals("Test", enTechnicalTerms.get(0).getName());
    }

    private void prepareRestTemplate(final String dictionary, final String testValue) {
        final LocalizedResponse response = new LocalizedResponse();
        response.setItems(singletonList(createKeyValue(new LocalizedKey("RUS", 1), testValue)));
        doReturn(response).when(restTemplate).getForObject(dictionaryUrl + dictionary, LocalizedResponse.class);
    }

    private <K, V> SimpleKeyValue<K, V> createKeyValue(final K key, final V value) {
        final SimpleKeyValue<K, V> simpleKeyValue = new SimpleKeyValue<>();
        simpleKeyValue.setKey(key);
        simpleKeyValue.setValue(value);
        return simpleKeyValue;
    }
}
