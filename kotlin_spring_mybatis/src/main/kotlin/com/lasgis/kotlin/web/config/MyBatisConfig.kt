/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.config

import org.apache.ibatis.annotations.Mapper
import org.mybatis.spring.annotation.MapperScan
import org.springframework.context.annotation.Configuration

/**
 * Настройки MyBatis
 *
 * @author VLaskin
 * @since <pre>27.12.2019</pre>
 */
@Configuration
@MapperScan(value = ["com.lasgis.kotlin.web.mybatis.mapper"], annotationClass = Mapper::class)
class MyBatisConfig