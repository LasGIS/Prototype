/*
 * Copyright (c) 2020. Prototype
 */

package com.lasgis.kotlin.web.dto.table

/**
 * The Class DataTableRequest
 *
 *    var
 *       settings   = this.context[0],
 *       start      = settings._iDisplayStart,
 *       len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
 *       visRecords = settings.fnRecordsDisplay(),
 *       all        = len === -1;
 *
 *    return {
 *       "page":           all ? 0 : Math.floor( start / len ),
 *       "pages":          all ? 1 : Math.ceil( visRecords / len ),
 *       "start":          start,
 *       "end":            settings.fnDisplayEnd(),
 *       "length":         len,
 *       "recordsTotal":   settings.fnRecordsTotal(),
 *       "recordsDisplay": visRecords,
 *       "serverSide":     _fnDataSource( settings ) === 'ssp'
 *    };
 *
 * @author VLaskin
 * @since 10.06.2020
 */
data class DataTableRequest<Criteria>(
    /** количество запросов от сервера (внутренняя переменная) */
    var draw: Int = 0,
    /** номер первой записи, начиная с <0> */
    val start: Int = 0,
    /** солько строк размещается на странице */
    val length: Int = 0,
    /** описание колонок */
    val columns: List<DataTableColumn>? = null,
    /** порядок сортировки колонок */
    val order: List<DataTableOrder>? = null,
    /** порядок сортировки колонок */
    val search: DataTableSearch? = null,
    val criteria: Criteria? = null
)