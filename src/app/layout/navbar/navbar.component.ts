import {Component, ElementRef, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../authentication/auth.service";
import {ReviewDialogComponent} from "../../reviews/dialog/review-dialog-component";
import {ReportDialogComponent} from "../../reports/dialog/report-dialog-component";
import {MatDialog} from "@angular/material/dialog";
import {ReportService} from "../../reports/report.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  role: string = "";
  username: string = "";
  showDialog = false;

  constructor(private elementRef: ElementRef, private router: Router, private authService: AuthService,
              public dialog: MatDialog, private reportService: ReportService) { }

  ngOnInit(): void {
    this.authService.userState.subscribe((role) => {
      this.role = this.authService.getRole();
      this.username = this.authService.getUsername();
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      // Perform any additional logout tasks if needed
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  redirectToCreateAccommodation(){
    this.router.navigate(['/accommodation-creation']);
  }

  redirectToOwnersAccommodations(){
    this.router.navigate(['/owners-accommodations'])
  }
  redirectToReservations() {
    this.router.navigate(['/guest/reservations']);
  }
  redirectToFavoriteAccommodations() {
    this.router.navigate(['/guest/favorite-accommodations']);
  }
  redirectToHome() {
    this.router.navigate(['']);
  }

  isLoggedInGuest() {
    return this.authService.isLoggedIn() && this.authService.getRole() === "Guest";
  }

  isLoggedInOwner(){
    return this.authService.isLoggedIn() && this.authService.getRole() === "Owner";
  }

  isLoggedInAdmin(){
    return this.authService.isLoggedIn() && this.authService.getRole() === "Admin";
  }

  redirectToAccommodationRequests() {
    this.router.navigate(['accommodationRequests']);
  }

  redirectToOwnerReservations() {
    this.router.navigate(['owner/reservations']);
  }



  openDialog(): void {
    this.showDialog = true;
  }

  closeDialog(): void {
    this.showDialog = false;
  }

  openOwnerReportDialog(): void{
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '550px',
      data: {
        userEmail: this.authService.getUsername(),
        reportType: "Guest"
      }});
  }

  openGuestReportDialog(): void{
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '550px',
      data: {
        userEmail: this.authService.getUsername(),
        reportType: "Owner"
      }});
  }

}
