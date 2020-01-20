/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web

import org.springframework.boot.Banner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class Application

fun main(args: Array<String>) {
	runApplication<Application>(*args) {
		setBannerMode(Banner.Mode.OFF)
	}
}
