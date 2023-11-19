import { Component, OnInit, ViewChild, HostListener  } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  isScreenSmall: boolean = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private location: Location,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.showHeader =
        this.router.url.includes('/home') ||
        this.router.url.includes('/series') ||
        this.router.url.includes('/register') ||
        this.router.url.includes('/manage');

      this.breakpointObserver
        .observe([Breakpoints.XSmall, Breakpoints.Small])
        .subscribe((result) => {
          this.isScreenSmall = result.matches;
          if (!this.isScreenSmall) {
            this.drawer.close();
          }
        });
    });
  }

  goBack(): void {
    this.location.back();
  }

  logOff(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  closeDrawer(): void {
    if (this.isScreenSmall) {
      this.drawer.close();
    }
  }
}
