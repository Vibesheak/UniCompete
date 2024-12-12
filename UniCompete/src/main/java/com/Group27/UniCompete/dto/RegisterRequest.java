package com.Group27.UniCompete.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

import java.util.Set;

public class RegisterRequest {
    private String username;
    private String password;

    private String Email;
    private Set<String> roles;



    public String getEmail(){
        return Email;
    }
    public void setEmail(String Email){
        this.Email=Email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
