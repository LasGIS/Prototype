/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.dto

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>26.05.2020</pre>
 */
data class UsersData(
    var content: List<User>,
    var pageCurrent: Int,
    var pagesCount: Int
) {}