package com.jwt.login.controller.restcontroller;

import com.jwt.login.entity.User;
import com.jwt.login.repository.UserRepository;
import com.jwt.login.security.JwtTokenProvider;
import com.jwt.login.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SessionController {

    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping("/join")
    public Long join(User user) {
        return userRepository.save(User.builder()
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .roles(Collections.singletonList("ROLE_USER"))
                .build()).getId();
    }

    @PostMapping("/login")
    public String login(User user) {

//        User member = userRepository.findByUsername(user.getUsername())
//                        .orElseThrow(() -> new IllegalArgumentException("없는 id입니다."));
//
//        if(!passwordEncoder.matches(user.getPassword(), member.getPassword())) {
//            throw new IllegalArgumentException("비밀번호가 잘못되었습니다.");
//        }

        List<String> roles = new ArrayList<>();
        roles.add("ADMIN");

        String token = jwtTokenProvider.createToken(user.getUsername(), roles);
        String id = jwtTokenProvider.getUserPk(token);

        return token;
    }

}
