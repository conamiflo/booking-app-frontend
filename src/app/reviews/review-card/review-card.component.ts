import {Component, EventEmitter, Input, Output} from '@angular/core';

import {environment} from "../../../env/env";
import {Router} from "@angular/router";
import {Review} from "../review";
import {AuthService} from "../../authentication/auth.service";


@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input()
  review: Review;
  @Input()
  ownerOfAccommodation: string;

  showReportIcon: boolean = false;
  showDeleteIcon: boolean = false;
  creationDate: string;
  constructor(private router:Router, private authService : AuthService) {}
  ngOnInit() {
    if(this.authService.getUsername() === this.ownerOfAccommodation){
      this.showReportIcon = true;
    }
    if(this.authService.getUsername() === this.review.guestEmail){
      this.showDeleteIcon = true;
    }
    this.creationDate = new Date(this.review.date * 1000).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  protected readonly environment = environment;
}

