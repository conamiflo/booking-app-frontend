import {Component, Inject, Injectable, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as Stomp from '@stomp/stompjs';
import * as SockJS from "sockjs-client"
import {environment} from "../../env/env";
import {Message} from "./message";
import {SocketService} from "./socket.service";
import {AuthService} from "../authentication/auth.service";
import {Notification} from "./notification";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService{

  private serverUrl = environment.apiHost + 'socket'
  private stompClient: any;


  isLoaded: boolean = false;
  isCustomSocketOpened = false;
  messages: Notification[] = [];

  constructor(private socketService: SocketService, private authService: AuthService) { }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });

  }

  sendMessageUsingSocket(notification: Notification) {
      this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(notification));
  }

  sendMessageUsingRest(message: Message) {
      this.socketService.postRest(message).subscribe((res: any) => {
        console.log(res);
      })
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  openSocket(email: string) {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + email, (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: Notification = JSON.parse(message.body);
      this.messages.push(messageResult);
      alert(messageResult.message);
    }
  }

}
