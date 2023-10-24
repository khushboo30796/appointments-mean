import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';
import { AppointmentStatus } from '../appointment-status';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  status: string;
  bookingByStatus: Booking[] = [];
  monthNames: string[] = ["January", "February", "March", "April", "May",
   "June", "July", "August", "September", "October", "November", "December"];
  bookingByMonths: any[] = [];
  dayNames: string[] = ["Sun", "Mon", "Tue", "Wed" , "Thu", "Fri", "Sat"];
  navigationOptions: string[] = [AppointmentStatus.Upcoming, AppointmentStatus.Pending, AppointmentStatus.Recurring
    , AppointmentStatus.Past, AppointmentStatus.Cancelled];
  currentMonth: string = "";
  constructor(private bookingService: BookingService)
  {
    this.status = AppointmentStatus.Upcoming;    
  }

  ngOnInit(): void {
    this.status = AppointmentStatus.Upcoming;
    this.getBookingsByStatus(AppointmentStatus.Upcoming);
    this.currentMonth = this.monthNames[(new Date()).getMonth()];

  }
  getBookingsByStatus(status: string): void
  {
      this.status = status;
      this.bookingByStatus =  this.bookingService.getBookings().filter(booking => booking.status.toString() == this.status).sort(function(a,b)
      {
        if(a.datetime.getTime() < b.datetime.getTime())
          return -1;
        else return 1;
      });
      let bookingMonths: number[] = [];
      this.bookingByStatus.forEach(element => {
        if(!bookingMonths.includes(element.datetime.getMonth()))
        bookingMonths.push(element.datetime.getMonth());        
      });
      this.bookingByMonths = [];
      bookingMonths.forEach(month => {
        let monthString = this.monthNames[month];
        let bookings = this.bookingByStatus.filter(booking=>booking.datetime.getMonth() == month);
        let formattedBookings: any[] = [];
        bookings.forEach(booking=> 
          {
            let finishtime = booking.datetime.getTime()+booking.duration.hours*60*60*1000+booking.duration.minutes*60*1000;
            let finishDate = new Date(finishtime);
            let day = this.dayNames[booking.datetime.getDay()];
            let date = booking.datetime.getDate();
            let startHours = booking.datetime.getHours() < 10 ? "0" + booking.datetime.getHours() : booking.datetime.getHours();
            let endHours = finishDate.getHours() < 10 ? "0" + finishDate.getHours(): finishDate.getHours();
            let startMinutes = booking.datetime.getMinutes() < 10 ? "0" + booking.datetime.getMinutes(): booking.datetime.getMinutes();
            let endMinutes = finishDate.getMinutes() < 10 ? "0" + finishDate.getMinutes(): finishDate.getMinutes();
            let duration = startHours + ":" +  startMinutes
            + " - " + endHours + ":" + endMinutes;
            let reschedulingRequests: string[] = [];
            booking.reschedulingRequests.forEach(request=>
              {
                let finishtime = request.getTime()+booking.duration.hours*60*60*1000+booking.duration.minutes*60*1000;
                let finishDate = new Date(finishtime);
                let startHours = request.getHours() < 10 ? "0" + request.getHours() : request.getHours();
                let endHours = finishDate.getHours() < 10 ? "0" + finishDate.getHours(): finishDate.getHours();
                let startMinutes = request.getMinutes() < 10 ? "0" + request.getMinutes(): request.getMinutes();
                let endMinutes = finishDate.getMinutes() < 10 ? "0" + finishDate.getMinutes(): finishDate.getMinutes();
                let duration = startHours + ":" +  startMinutes
                + " - " + endHours + ":" + endMinutes;
                reschedulingRequests.push(duration);
              });
            formattedBookings.push({
              day: day,
              date: date,
              duration: duration,
              description: booking.description,
              location: booking.location,
              people: booking.people,
              isRescheduleRequested: reschedulingRequests.length>0,
              reschedulingRequests: reschedulingRequests
            });
          });
        this.bookingByMonths.push(
          {
            month: monthString,
            bookings: formattedBookings
          }
        );

      });
  }




}
