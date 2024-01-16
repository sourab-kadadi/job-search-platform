import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../service/auth-service.service';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styleUrls: ['./header-client.component.scss']
})
export class HeaderClientComponent implements OnInit {
  @ViewChild('appNav')
  navMain!: ElementRef;
  constructor(@Inject(DOCUMENT) private document: Document, private authService: AuthServiceService, public router: Router) { }

  ngOnInit(): void {
  }

  @HostListener("window:scroll", [])onWindowScroll() {
    if (this.document.documentElement.scrollTop > 60) {
      this.navMain.nativeElement.classList.remove('is-transparent');
      this.navMain.nativeElement.classList.add('navbar-faded');
    } else {
      this.navMain.nativeElement.classList.add('is-transparent');
      this.navMain.nativeElement.classList.remove('navbar-faded');
    }
 }

 logout() {
   this.authService.logout();
   this.router.navigate(['/client-login']);
 }

 routeToMyProfile() {
  this.router.navigate(['/client/profile']);
 }

}
