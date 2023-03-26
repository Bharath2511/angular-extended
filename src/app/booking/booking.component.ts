import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import { BookingService } from './booking.service';
import { CustomValidator } from './validators/custom-validator';

@Component({
  selector: 'hinv-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  get guests() {
    return this.bookingForm.get('guests') as FormArray;
  }
  constructor(
    private configService: ConfigService,
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group(
      {
        roomId: new FormControl(
          { value: '2', disabled: true },
          { validators: [Validators.required] }
        ),
        guestEmail: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required, Validators.email],
          },
        ],
        checkinDate: [''],
        checkoutDate: [''],
        bookingStatus: [''],
        bookingAmount: [''],
        bookingDate: [''],
        mobileNumber: [
          '',
          {
            updateOn: 'blur',
            validators: [Validators.required],
          },
        ],
        guestName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            CustomValidator.ValidateName,
            CustomValidator.ValidateSpecialChar('*'),
          ],
        ],
        guestAddress: [''],
        address: this.fb.group({
          addressLine1: ['', { validators: [Validators.required] }],
          addressLine2: [''],
          city: ['', { validators: [Validators.required] }],
          state: ['', { validators: [Validators.required] }],
          country: [''],
          zipcode: [''],
        }),
        guests: this.fb.array([this.addGuestControl()]),
        // guestCount: [''],
        // guestList: [],
        tnc: new FormControl(false, { validators: [Validators.requiredTrue] }),
      },
      { updateOn: 'blur', validators: [CustomValidator.validateDate] }
    );
  }

  ngOnInit(): void {
    this.getBookingData();
    // this.bookingForm.valueChanges.subscribe((data) => {
    //   this.bookingService.bookRoom(data).subscribe(data=>{});
    // });
    this.bookingForm.valueChanges
      .pipe(mergeMap((data) => this.bookingService.bookRoom(data)))
      .subscribe((data) => console.log(data));
    //mergemap does not care about sequence whether it is completed or not
    //switchmap cancels previous api calls or data operation when new value is provided
    //sequential order unless previous operation is completed new operation is not considered
  }
  addBooking() {
    console.log(this.bookingForm.value);
    //rawvalue gives disabled values as well
    console.log(this.bookingForm.getRawValue());
    // this.bookingService
    //   .bookRoom(this.bookingForm.getRawValue())
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    this.bookingForm.reset({
      roomId: '2',
      guestEmail: '',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guestAddress: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
      },
      guests: [],
      // guestCount: [''],
      // guestList: [],
      tnc: false,
    });
    this.bookingForm.reset();
  }
  addGuestControl() {
    return this.fb.group({
      guestName: ['', { validators: [Validators.required] }],
      age: new FormControl('', { validators: [Validators.required] }),
    });
  }
  getBookingData() {
    // this.bookingForm.setValue({
    //   roomId: '2',
    //   guestEmail: 'test@gmail.com',
    //   checkinDate: new Date('10-Feb-2020'),
    //   checkoutDate: '',
    //   bookingStatus: '',
    //   bookingAmount: '',
    //   bookingDate: '',
    //   mobileNumber: '',
    //   guestName: '',
    //   guestAddress: '',
    //   address: {
    //     addressLine1: '',
    //     addressLine2: '',
    //     city: '',
    //     state: '',
    //     country: '',
    //     zipcode: '',
    //   },
    //   guests: [],
    //   // guestCount: [''],
    //   // guestList: [],
    //   tnc: false,
    // });
    this.bookingForm.patchValue({
      roomId: '2',
      guestEmail: 'test@gmail.com',
      checkinDate: '',
      checkoutDate: '',
      bookingStatus: '',
      bookingAmount: '',
      bookingDate: '',
      mobileNumber: '',
      guestName: '',
      guestAddress: '',
      address: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
      },
      guests: [],
      // guestCount: [''],
      // guestList: [],
      tnc: false,
    });
    this.bookingForm.valueChanges.subscribe((data) => console.log(data));
  }
  addGuest() {
    this.guests.push(this.addGuestControl());
  }
  removeGuest(i: number) {
    this.guests.removeAt(i);
  }
  addPassport() {
    this.bookingForm.addControl('passport', new FormControl(''));
  }
  deletePassport() {
    if (this.bookingForm.get('passport')) {
      this.bookingForm.removeControl('passport');
    }
  }
}
