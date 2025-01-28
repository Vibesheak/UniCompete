package com.Group27.UniCompete.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Applications")
public class Application {
    @Id
    private String id;
    private String competitionId;
    private String username;
    private String email;
    private String status; // Pending, Confirmed, Rejected
    private int phonenumber;



    // Getters and


    public int getPhonenumber() {
        return phonenumber;
    }

    public void setPhonenumber(int Phonenumber) {
        this.phonenumber = Phonenumber;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCompetitionId() {
        return competitionId;
    }

    public void setCompetitionId(String competitionId) {
        this.competitionId = competitionId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
