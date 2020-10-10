package com.jwt.login.service;

import com.jwt.login.entity.User;
import com.jwt.login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
               .orElseThrow(() -> new UsernameNotFoundException("[" + username + "] User is Not Found"));
    }

    @Override
    public Optional<User> findByUsername(String username) {return userRepository.findByUsername(username);}


}
