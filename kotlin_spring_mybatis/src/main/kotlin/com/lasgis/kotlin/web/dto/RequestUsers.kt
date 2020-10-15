/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.dto

import com.lasgis.kotlin.web.dto.table.Pagination

/**
 * <description>
 *
 * @author VLaskin
 * @since <pre>26.05.2020</pre>
 */
data class RequestUsers(
    var pagination: Pagination? = null
)