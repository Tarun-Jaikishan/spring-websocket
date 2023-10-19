package com.websocket.demo;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class NewController {
    private final SimpMessagingTemplate messagingTemplate;
//    @PostMapping("/send-message")
//    public void sendMessage(@RequestBody String message) {
//        messagingTemplate.convertAndSend("/topic/chat", message);
//    }

    @GetMapping("/send-message")
    public String getMessage() {
        messagingTemplate.convertAndSend("/topic/chat", "Tarun");
        return "Called";
    }

//    Rooms
    @PostMapping("/setRoom")
    public String setRoom(@RequestBody RequestUserId userid) {
        String newId = userid.getUserid();
    System.out.println(newId);
        messagingTemplate.convertAndSend("/topic/room/"+newId, "Tarun");
        return newId;
    }


    @Scheduled(fixedRate = 2000)
    public void printHelloWorld() {
//        System.out.println("Hello, World!");
        messagingTemplate.convertAndSend("/topic/chat", "Tarun");
    }

}
