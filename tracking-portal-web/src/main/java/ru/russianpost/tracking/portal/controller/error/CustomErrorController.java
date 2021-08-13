/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.russianpost.tracking.portal.controller.BaseController;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

import static java.util.Objects.isNull;

/**
 * @author Amosov Maxim
 * @since 05.04.2021 : 17:49
 */
@Slf4j
@Controller
@RequestMapping("/error")
public class CustomErrorController extends BaseController implements ErrorController {
    /** @deprecated  */
    @Override
    @Deprecated
    public String getErrorPath() {
        return null;
    }

    /**
     * @param request  instance of {@link HttpServletRequest}
     * @param response instance of {@link HttpServletResponse}
     * @return forward html errors to the SPA 200 main page
     */
    @RequestMapping(produces = MediaType.TEXT_HTML_VALUE)
    public String handleHtmlError(final HttpServletRequest request, final HttpServletResponse response) {
        final HttpStatus status = getStatus(request);
        response.setStatus(status.value());
        return "forward:/";
    }

    /**
     * @param request instance of {@link HttpServletRequest}
     * @return ResponseEntity for other non 'text/html' requests
     */
    @RequestMapping
    public ResponseEntity<Map<String, Object>> handleError(final HttpServletRequest request) {
        return new ResponseEntity<>(getStatus(request));
    }

    private HttpStatus getStatus(final HttpServletRequest request) {
        final Integer statusCode = (Integer) request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        return isNull(statusCode) ? HttpStatus.SERVICE_UNAVAILABLE : HttpStatus.valueOf(statusCode);
    }
}
