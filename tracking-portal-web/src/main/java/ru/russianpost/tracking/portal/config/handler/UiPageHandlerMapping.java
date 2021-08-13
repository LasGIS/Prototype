/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.config.handler;

import lombok.NoArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractUrlHandlerMapping;
import org.springframework.web.servlet.mvc.AbstractController;
import org.springframework.web.servlet.mvc.ParameterizableViewController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.regex.Pattern;

import static java.util.Arrays.asList;

/**
 * @author Amosov Maxim
 * @since 23.06.2021 : 19:17
 */
@Component
public class UiPageHandlerMapping extends AbstractUrlHandlerMapping {
    private final List<String> urls;
    private final List<String> preRenderUrls;
    private final PreRenderController preRenderController = new PreRenderController();
    private final ParameterizableViewController forwardController = new ParameterizableViewController();

    /**
     * Constructs handler
     */
    public UiPageHandlerMapping() {
        urls = asList("/incomplete-profile", "/404", "/503");
        preRenderUrls = asList("/support.*", "/statistics", "/access-settings", "/specification");

        forwardController.setViewName("forward:/");
        setOrder(Ordered.HIGHEST_PRECEDENCE);
    }

    @Override
    protected Object getHandlerInternal(final @NotNull HttpServletRequest request) {
        if (Pattern.matches(".*\\.html|/static/.*|.*\\.png|.*\\.zip|.*\\.ico|.*\\.json", request.getRequestURI())) {
            return null;
        }
        for (final String preRenderUrl : preRenderUrls) {
            if (Pattern.matches(preRenderUrl, request.getRequestURI())) {
                return preRenderController;
            }
        }
        for (final String url : urls) {
            if (Pattern.matches(url, request.getRequestURI())) {
                return forwardController;
            }
        }
        return null;
    }

    /**
     * PreRender controller that adds suffix to Uri
     */
    @NoArgsConstructor
    private static class PreRenderController extends AbstractController {
        @Override
        protected ModelAndView handleRequestInternal(
            @NotNull final HttpServletRequest request,
            @NotNull final HttpServletResponse response
        ) {
            return new ModelAndView(request.getRequestURI() + "/index.html");
        }
    }
}
