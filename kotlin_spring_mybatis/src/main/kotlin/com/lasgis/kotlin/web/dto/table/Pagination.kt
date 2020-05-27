/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.dto.table

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>27.05.2020</pre>
 */
data class Pagination(
    var page: Int? = null,
    var pages: Int? = null
) {
    init {
//        this.page = 1
//        this.pages = 33
    }
}