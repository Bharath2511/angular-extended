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
  constructor(@Inject(LocalStorageToken) private localStorage: Storage) {}
  ngOnInit() {
    this.name.nativeElement.innerText = 'Restaurant';
    this.localStorage.setItem('name', 'Hilton Hotel');
  }
}
