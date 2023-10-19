package com.websocket.demo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;


@Controller
public class GreetingController {

    @MessageMapping("/chat")
    @SendTo("/topic/chat")
    public String sendMessage(String message) {
//        String ms = "Hello";

        return message;
    }



}
