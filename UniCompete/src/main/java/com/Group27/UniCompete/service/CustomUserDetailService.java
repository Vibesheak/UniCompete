package com.Group27.UniCompete.service;

import com.Group27.UniCompete.models.Role;
import com.Group27.UniCompete.models.User;
import com.Group27.UniCompete.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class CustomUserDetailService implements UserDetailsService {
    private final UserRepository userRepository;
    public CustomUserDetailService(UserRepository userRepository){
        this.userRepository=userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{

        User user = userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"+username));

        return new org.springframework.security.core.userdetails.User(user.getusername(),user.getpassword(),user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getname())).collect(Collectors.toList()));
    }
}
