import { Injectable } from '@angular/core';
import { Booking } from './booking';
import { AppointmentStatus } from './appointment-status';
import { Person } from './person';
import { Duration } from './duration';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookings: Booking[] = [];
  getBookings() {
    return this.bookings;
  }

  constructor() {

    let id: number = 1;
    let status: AppointmentStatus = AppointmentStatus.Upcoming;
    let date: Date = new Date(2023, 9, 28, 9, 0);
    let location: string = "Online";
    let description: string = "30 min call meeting Peer <> Leslie";
    let people: Person[] = [{ name: "Peer", photo: "./assets/profile1.jpg" }, 
    { name: "Leslie", photo: "./assets/profile2.jpg" }];
    let rescheduleRequest: Date[] = [];
    let duration: Duration = { hours: 0, minutes: 30 };
    let meeting: Booking = {
      id: id, status: status, datetime: date, duration: duration, location: location, description: description,
      people: people, reschedulingRequests: rescheduleRequest
    };
    this.bookings.push(meeting);

    id = 2;
    status = AppointmentStatus.Upcoming;
    date = new Date(2023, 9, 29, 15, 20);
    location = "Online";
    description = "Live Product Demo";
    people = [{ name: "Peer", photo: "./assets/profile1.jpg" },
    { name: "Leslie", photo: "./assets/profile2.jpg" },
    { name: "Olivia", photo: "./assets/profile3.jpg" },
    { name: "Liam", photo: "./assets/profile4.jpg" }];
    rescheduleRequest = [];
    duration = { hours: 1, minutes: 0 };
    meeting = {
      id: id, status: status, datetime: date, duration: duration, location: location,
      description: description, people: people, reschedulingRequests: rescheduleRequest
    };
    this.bookings.push(meeting);

    id = 3;
    status = AppointmentStatus.Upcoming;
    date = new Date(2023, 9, 30, 11, 15);
    location = "Wework, Paris";
    description = "30 min call meeting Olivia, Liam <> Alban";
    people = [{ name: "Olivia", photo: "./assets/profile3.jpg" },
    { name: "Liam", photo: "./assets/profile4.jpg" },
    { name: "Alban", photo: "./assets/profile5.jpg" }];
    rescheduleRequest = [];
    duration = { hours: 0, minutes: 30 };
    meeting = {
      id: id, status: status, datetime: date, duration: duration, location: location, description: description,
      people: people, reschedulingRequests: rescheduleRequest
    };
    this.bookings.push(meeting);

    id = 4;
    status = AppointmentStatus.Upcoming;
    date = new Date(2023, 10, 2, 11, 15);
    location = "Online";
    description = "30 min call meeting with Yulia, Alvin <> Irina, Mae";
    people = [{ name: "Yulia", photo: "./assets/profile5.jpg" },
    { name: "Alvin", photo: "./assets/profile2.jpg" },
    { name: "Irina", photo: "./assets/profile6.jpg" },
    { name: "Mae", photo: "./assets/profile7.jpg" }];
    rescheduleRequest = [new Date(2023, 10, 2, 15, 30)];
    duration = { hours: 0, minutes: 30 };
    meeting = {
      id: id, status: status, datetime: date, duration: duration, location: location, description: description,
      people: people, reschedulingRequests: rescheduleRequest
    };
    this.bookings.push(meeting);

    id = 5;
    status = AppointmentStatus.Upcoming;
    date = new Date(2023, 10, 3, 10, 45);
    location = "Online";
    description = "Live Product Demo";
    people = [{ name: "Yulia", photo: "./assets/profile5.jpg" },
    { name: "Alvin", photo: "./assets/profile6.jpg" }];
    rescheduleRequest = [];
    duration = { hours: 1, minutes: 0 };
    meeting = {
      id: id, status: status, datetime: date, duration: duration, location: location, description: description,
      people: people, reschedulingRequests: rescheduleRequest
    };
    this.bookings.push(meeting);

    id = 6;
    status = AppointmentStatus.Upcoming;
    date = new Date(2023, 10, 4, 17, 30);
    location = "Wework, Paris";
    description = "Product Meeting Review";
    people = [{ name: "Irina", photo: "./assets/profile4.jpg" },
    { name: "Yulia", photo: "./assets/profile6.jpg" },
    { name: "Peer", photo: "./assets/profile5.jpg" },
    { name: "Mae", photo: "./assets/profile7.jpg" }];   
    rescheduleRequest = [];
    duration = { hours: 0, minutes: 30 };
    meeting = {
      id: id, status: status, datetime: date, duration: duration, location: location, description: description,
      people: people, reschedulingRequests: rescheduleRequest
    };
    this.bookings.push(meeting);

    id = 7;
    status = AppointmentStatus.Upcoming;
    date = new Date(2023, 10, 28, 9, 0);
    location = "Online";
    description = "30 min call meeting Peer <> Leslie";
    people = [{ name: "Peer", photo: "./assets/profile1.jpg" }];
    rescheduleRequest = [];
    duration = { hours: 0, minutes: 30 };
    meeting = {
      id: id, status: status, datetime: date, duration: duration, location: location, description: description,
      people: people, reschedulingRequests: rescheduleRequest
    };
    this.bookings.push(meeting);

    for (let i = 7; i < 14; i++) {
      let id: number = i+1;
      let status: AppointmentStatus = AppointmentStatus.Pending;
      let date: Date = this.bookings[i%7].datetime;
      let location: string = this.bookings[i%7].location;
      let description: string = "Pending " + this.bookings[i%7].description;
      let people: Person[] = this.bookings[i%7].people;
      let rescheduleRequest: Date[] = this.bookings[i%7].reschedulingRequests;
      let duration: Duration = this.bookings[i%7].duration;
      let meeting: Booking = {
        id: id, status: status, datetime: date, duration: duration, location: location, description: description,
        people: people, reschedulingRequests: rescheduleRequest
      };
      this.bookings.push(meeting);
    }
    for (let i = 14; i < 21; i++) {
      let id: number = i+1;
      let status: AppointmentStatus = AppointmentStatus.Recurring;
      let date: Date = this.bookings[i%7].datetime;
      let location: string = this.bookings[i%7].location;
      let description: string = "Recurring " + this.bookings[i%7].description;
      let people: Person[] = this.bookings[i%7].people;
      let rescheduleRequest: Date[] = this.bookings[i%7].reschedulingRequests;
      let duration: Duration = this.bookings[i%7].duration;
      let meeting: Booking = {
        id: id, status: status, datetime: date, duration: duration, location: location, description: description,
        people: people, reschedulingRequests: rescheduleRequest
      };
      this.bookings.push(meeting);
    }
    for (let i = 21; i < 28; i++) {
      let id: number = i+1;
      let status: AppointmentStatus = AppointmentStatus.Past;
      let date: Date = this.bookings[i%7].datetime;
      let location: string = this.bookings[i%7].location;
      let description: string = "Past " + this.bookings[i%7].description;
      let people: Person[] = this.bookings[i%7].people;
      let rescheduleRequest: Date[] = this.bookings[i%7].reschedulingRequests;
      let duration: Duration = this.bookings[i%7].duration;
      let meeting: Booking = {
        id: id, status: status, datetime: date, duration: duration, location: location, description: description,
        people: people, reschedulingRequests: rescheduleRequest
      };
      this.bookings.push(meeting);
    }
    for (let i = 28; i < 35; i++) {
      let id: number = i+1;
      let status: AppointmentStatus = AppointmentStatus.Cancelled;
      let date: Date = this.bookings[i%7].datetime;
      let location: string = this.bookings[i%7].location;
      let description: string = "Cancelled " + this.bookings[i%7].description;
      let people: Person[] = this.bookings[i%7].people;
      let rescheduleRequest: Date[] = this.bookings[i%7].reschedulingRequests;
      let duration: Duration = this.bookings[i%7].duration;
      let meeting: Booking = {
        id: id, status: status, datetime: date, duration: duration, location: location, description: description,
        people: people, reschedulingRequests: rescheduleRequest
      };
      this.bookings.push(meeting);
    }
    

  }
}
