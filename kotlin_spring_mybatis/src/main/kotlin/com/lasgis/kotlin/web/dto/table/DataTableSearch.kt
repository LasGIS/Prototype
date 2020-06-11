/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.dto.table

/**
 * The Class DataTableSearch.
 * @author Vladimir Laskin
 * @version 1.0
 */
data class DataTableSearch (
    var value: String? = null,
    var regex: Boolean? = false
)