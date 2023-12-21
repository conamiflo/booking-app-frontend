import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountActivationService} from "./account.activation.service";
import {Registration} from "../registration/model/registration.model";
@Component({
  selector: 'app-account-activation',
  templateUrl: './account.activation.html',
  styleUrls: ['./account.activation.css']
})
export class AccountActivationComponent implements OnInit {
  email: string = '';
  constructor(private route: ActivatedRoute,private activationService: AccountActivationService,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.email = params['email'] || 'noemail';
    });
  }

  activateAccount(): void {
    this.activationService.activateAccount(this.email).subscribe({
      next: (response) =>{
        this.router.navigate(['login'])
      },
      error: (error: any) => {
        alert("Activation link isn't valid! ")
      }
    })
  }

}
