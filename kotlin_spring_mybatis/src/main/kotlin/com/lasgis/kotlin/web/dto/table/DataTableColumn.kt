/*
 * Copyright (c) 2020. Prototype
 */
package com.lasgis.kotlin.web.dto.table

/**
 * The Class DataTableColumn.
 *
 * @author Vladimir Laskin
 * @version 1.0
 */
data class DataTableColumn (
    var data: String? = null,
    var name: String? = null,
    var searchable: Boolean? = null,
    var orderable: Boolean? = null,
    var search: DataTableSearch? = null
)