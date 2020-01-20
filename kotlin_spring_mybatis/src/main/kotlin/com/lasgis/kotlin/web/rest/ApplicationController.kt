/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.rest

import com.lasgis.kotlin.web.dao.Greeting
import com.lasgis.kotlin.web.dao.User
import com.lasgis.kotlin.web.dao.UserRole
import org.springframework.beans.factory.annotation.Value
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.atomic.AtomicLong

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>04.01.2020</pre>
 */
@RestController
class ApplicationController {

    @Value("\${app.name}")
    private lateinit var applicationName: String

    @Value("\${app.version}")
    private lateinit var applicationVersion: String

    val counter = AtomicLong()

    @GetMapping("/greeting")
    fun getreeting(@RequestParam(value = "name", defaultValue = "World") name: String) =
        Greeting(counter.incrementAndGet(), "Hello, $name")

    @GetMapping("/app/name")
    fun applicationName() = applicationName

    @GetMapping("/app/version")
    fun applicationVersion() = applicationVersion

/*
    @RequestMapping(value = ["/login"], method = [RequestMethod.POST],
        produces = ["application/x-www-form-urlencoded; charset=UTF-8"],
        consumes = ["application/json; charset=UTF-8"]
    )
*/
    @PostMapping("/login")
    fun login(
        @RequestParam("j_username") username:String,
        @RequestParam("password") password:String
    ): User {
        return User(userId = null, login = username, name = "Пупкин Василий", password = null, roles = UserRole.values().asList(), archived = false)
    }
}
//Accept: application/json, text/javascript, */*; q=0.01
//Content-Type: application/x-www-form-urlencoded; charset=UTF-8
