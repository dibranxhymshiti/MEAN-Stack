import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: object) {
  }

  ngOnInit(): void {
    // Angular SSR localstorage is in browser side
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoAuth();
    }
  }
}
