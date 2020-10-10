package com.jwt.login.service;

import com.jwt.login.entity.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

public interface UserService {
    User loadUserByUsername(String username) throws UsernameNotFoundException;

    Optional<User> findByUsername(String username);
}
