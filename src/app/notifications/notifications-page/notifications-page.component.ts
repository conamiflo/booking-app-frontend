import {Component} from "@angular/core";
import {NotificationService} from "../notification.service";
import {AuthService} from "../../authentication/auth.service";
import {Notification} from "../notification";
import {environment} from "../../../env/env";
import { Client, Message } from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-notifications-page',
  templateUrl: './notifications-page.component.html',
  styleUrls: ['./notifications-page.component.css'],
})
export class NotificationsPageComponent {

  notifications: Notification[] = [];

  private servarUrl = "http://localhost:8080/"+'socket'
  private stompClient: Client;


  constructor(private notificationService: NotificationService, private authService: AuthService) {
  }

  ngOnInit(): void {
      this.notificationService.getUsersNotifications(this.authService.getUsername()).subscribe({
        next: (data: Notification[]) =>{
          if (data && data.length > 0) {
            this.notifications = data;
          } else {
            console.log("Error.");
          }
        },
        error: (error: any) => {
          console.log("Error:", error);
        }
      });

    this.stompClient.subscribe("/socket-publisher/" + this.authService.getUsername(), (message: { body: string; }) => {
      this.handleResult(message);
    });
    }
  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: Notification = JSON.parse(message.body);
      this.notifications.push(messageResult);
    }
  }
}
