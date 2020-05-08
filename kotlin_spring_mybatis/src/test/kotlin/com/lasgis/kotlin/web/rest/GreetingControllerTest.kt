/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.rest

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.client.getForEntity
import org.springframework.http.HttpStatus

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>10.01.2020</pre>
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GreetingControllerTest(@Autowired val restTemplate: TestRestTemplate) {

    @BeforeEach
    fun setUp() {
    }

    @AfterEach
    fun tearDown() {
    }

    @Test
    fun greeting() {
        val entity = restTemplate.getForEntity<String>("/greeting?name=Name")
        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(entity.body).contains("Hello, Name")
    }

    @Test
    fun applicationName() {
        val entity = restTemplate.getForEntity<String>("/app/name")
        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(entity.body).contains("Kotlin Spring Boot MyBatis")
    }
    @Test
    fun applicationVersion() {
        val entity = restTemplate.getForEntity<String>("/app/version")
        assertThat(entity.statusCode).isEqualTo(HttpStatus.OK)
        assertThat(entity.body).contains("0.1.1-SNAPSHOT")
    }

}