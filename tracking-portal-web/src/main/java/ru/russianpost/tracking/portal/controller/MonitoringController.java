/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.info.BuildProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import ru.russianpost.tracking.diagnostic.checker.Checker;
import ru.russianpost.tracking.diagnostic.model.Report;
import ru.russianpost.tracking.diagnostic.model.SelfTestResponse;
import ru.russianpost.tracking.diagnostic.util.SelftestResponseUtils;

import java.util.List;
import java.util.concurrent.ForkJoinPool;

import static java.util.stream.Collectors.toList;

/**
 * @author Amosov Maxim
 * @since 04.05.2021 : 14:55
 */
@Slf4j
@RestController
@RequestMapping("monitoring")
public class MonitoringController extends BaseController {
    private final List<Checker> checkers;
    private final ForkJoinPool forkJoinPool;
    private final ResponseEntity<String> versionResponse;

    /**
     * @param checkers        checkers list
     * @param buildProperties build properties
     * @param forkJoinPool    instance of {@link ForkJoinPool}
     */
    public MonitoringController(
        final List<Checker> checkers,
        final BuildProperties buildProperties,
        @Qualifier("selftestForkJoinPool") final ForkJoinPool forkJoinPool
    ) {
        this.checkers = checkers;
        this.forkJoinPool = forkJoinPool;
        this.versionResponse = ResponseEntity.ok("Version is " + buildProperties.getVersion());
    }

    /**
     * @return version of application in plain text
     */
    @GetMapping("version")
    public ResponseEntity<String> version() {
        return versionResponse;
    }

    /**
     * Ping method
     */
    @GetMapping("ping")
    @ResponseStatus(HttpStatus.OK)
    public void ping() {
        // NOP
    }

    /**
     * @return self-health information
     */
    @GetMapping("selftest")
    public SelfTestResponse getSelftest() {
        return SelftestResponseUtils.makeSelftestResponse(buildReports());
    }

    /**
     * @return all self-health information, including passed tests
     */
    @GetMapping("selftest/all")
    public SelfTestResponse getSelftestAll() {
        return SelftestResponseUtils.makeSelftestResponseAll(buildReports());
    }

    private List<Report> buildReports() {
        return forkJoinPool.submit(() -> checkers.parallelStream().map(Checker::diagnose).collect(toList())).join();
    }
}
