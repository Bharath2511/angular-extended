import {
  AfterContentInit,
  Component,
  ContentChild,
  Host,
  OnInit,
  ViewChild,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [RoomsService],
})
export class ContainerComponent implements AfterContentInit, OnInit {
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  empName: string = 'John';

  // constructor(@Host() private roomsService: RoomsService) {}
  // constructor(@Host() private roomsService: RoomsService) {}

  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'Michael';
  }

  ngOnInit(): void {}
}
