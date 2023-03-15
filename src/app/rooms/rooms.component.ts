import { HttpEventType } from '@angular/common/http';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnDestroy,
  QueryList,
  SkipSelf,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { OnInit } from '@angular/core';
import {
  catchError,
  Observable,
  Subject,
  Subscribable,
  Subscription,
} from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent
  implements OnInit, DoCheck, AfterViewInit, AfterViewChecked, OnDestroy
{
  hotelName: string = 'Hilton Hotel';
  numberOfRooms: number = 10;
  hideRooms: boolean = false;
  selectedRoom!: RoomList;
  rooms: Room = {
    availableRooms: 10,
    bookedRooms: 5,
    totalRooms: 20,
  };
  roomList: RoomList[] = [];
  title = 'Room Booking List';
  stream = new Observable((observer) => {
    observer.next('user 1');
    observer.next('user 2');
    observer.next('user 3');
    observer.next('user 4');
    observer.complete();
    observer.error('error');
  });
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'RoomsList';
  }
  selectRoom(room: RoomList) {
    console.log(room);
    this.selectedRoom = room;
  }
  addRoom() {
    const room: RoomList = {
      roomNumber: (this.roomList.length + 1).toString(),
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner,Free Wi-Fi,TV,Bathroom,Kithcen',
      price: 500,
      photos: 'https://unsplash.com/photos/Id2IIl1jOB0',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.2,
    };
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => (this.roomList = data));
  }
  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Premium Deluxe  Room',
      amenities: 'Kithcen',
      price: 0,
      photos: 'https://unsplash.com/photos/Id2IIl1jOB0',
      checkinTime: new Date('11-Nov-2021'),
      checkoutTime: new Date('12-Nov-2021'),
      rating: 4.2,
    };
    this.roomsService
      .editRoom(room)
      .subscribe((data) => (this.roomList = data));
  }
  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => (this.roomList = data));
  }
  constructor(@SkipSelf() private roomsService: RoomsService) {}

  @ViewChild(HeaderComponent)
  headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  ngDoCheck(): void {
    console.log('on check is called');
  }
  ngAfterViewInit(): void {
    console.log(this.headerComponent);
    console.log(this.headerChildrenComponent);
    this.headerChildrenComponent.last.title = 'last title';
    this.headerComponent.title = 'RoomsView';
  }
  totalBytes: number = 0;
  subscription!: Subscription;
  error$ = new Subject<string>();
  getError$ = this.error$?.asObservable();
  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      console.log(err);
      this.error$.next(err.message);
      return [];
    })
  );

  ngAfterViewChecked() {}
  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request Success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });
    // console.log(this.headerComponent);
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('completed'),
      error: (err) => console.log(err),
    });
    // this.subscription = this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
  }
  ngOnDestroy() {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }
}
