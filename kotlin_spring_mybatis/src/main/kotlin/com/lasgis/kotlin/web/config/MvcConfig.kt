/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.config

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.MapperFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.SerializationFeature
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

/**
 * @version 1.0
 * @since <pre>30.08.17</pre>
 */
@Configuration
class MvcConfig {
    /**
     * Object mapper with additional modules registered in.
     *
     * @return Object mapper.
     */
    @Bean
    fun objectMapper(): ObjectMapper {
//        SimpleModule emptyJsonStringToNull = new SimpleModule();
//        emptyJsonStringToNull.addDeserializer(String.class, new EmptyStringToNullDeserializer());
        val objectMapper = ObjectMapper()
        objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
        objectMapper.registerModules(Jdk8Module())
        objectMapper.enable(MapperFeature.SORT_PROPERTIES_ALPHABETICALLY)
        objectMapper.enable(SerializationFeature.WRITE_ENUMS_USING_TO_STRING)
//        objectMapper.registerModules(getJavaTimeModule(), emptyJsonStringToNull);
//        objectMapper.setDateFormat(new SimpleDateFormat(DateUtil.FORMAT_DATE));
        return objectMapper
    }

/*
    private JavaTimeModule getJavaTimeModule() {
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        javaTimeModule.addSerializer(LocalDateTime.class, new JsonSerializer<LocalDateTime>() {
            @Override
            public void serialize(LocalDateTime value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
                jgen.writeString(DateUtil.localDateTime2string(value));
            }
        });
        javaTimeModule.addDeserializer(LocalDateTime.class, new JsonDeserializer<LocalDateTime>() {
            @Override
            public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
                return DateUtil.string2localDateTime(jsonParser.getText());
            }
        });
        javaTimeModule.addSerializer(LocalDate.class, new JsonSerializer<LocalDate>() {
            @Override
            public void serialize(LocalDate value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
                jgen.writeString(DateUtil.localDate2string(value));
            }
        });
        javaTimeModule.addDeserializer(LocalDate.class, new JsonDeserializer<LocalDate>() {
            @Override
            public LocalDate deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
                return DateUtil.string2localDate(jsonParser.getText());
            }
        });
        return javaTimeModule;
    }
*/
}