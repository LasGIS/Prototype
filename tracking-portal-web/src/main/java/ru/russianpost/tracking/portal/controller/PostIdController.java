/*
 * Copyright (c) 2021. Prototype
 */
package ru.russianpost.tracking.portal.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;
import ru.russianpost.tracking.portal.service.postid.PostIdService;

/**
 * @author Vladimir Laskin
 * @since 20.05.2021 : 0:01
 */
@Slf4j
@Controller
@RequestMapping("postId")
@RequiredArgsConstructor
public class PostIdController extends BaseController {
    private final PostIdService postIdService;

    /**
     * @return redirect to post-id logout url
     */
    @GetMapping("logout")
    public RedirectView logout() {
        return new RedirectView(postIdService.getLogoutUrl());
    }

    /**
     * @return redirect to post-id account url
     */
    @GetMapping("account")
    public RedirectView account() {
        return new RedirectView(postIdService.getUserAccountUrl());
    }
}
