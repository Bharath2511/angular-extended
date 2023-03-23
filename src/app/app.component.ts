import {
  AfterViewInit,
  Component,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  OnInit,
  Inject,
} from '@angular/core';

import { RoomsComponent } from './rooms/rooms.component';
import { LocalStorageToken } from '../localstorage.token';
import { InitService } from './Init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  role = 'Admin';
  title = 'Hotel Inventory';
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;
  // ngAfterViewInit() {
  //   const componentRef = this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms = 50;
  // }
  @ViewChild('name', { static: true }) name!: ElementRef;
  constructor(
    @Inject(LocalStorageToken) private localStorage: Storage,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(initService.config);
  }
  ngOnInit() {
    // this.router.events.subscribe((event) => {
    //   console.log(event);
    // });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event) => {
        console.log('Navigation Started');
      });
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        console.log('Navigation Completed');
      });

    this.name.nativeElement.innerText = 'Restaurant';
    this.localStorage.setItem('name', 'Hilton Hotel');
  }
}
