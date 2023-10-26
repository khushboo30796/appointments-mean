import { Injectable } from '@angular/core';
import { Person } from './person';
import { Duration } from './duration';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  doctors: Doctor[] = [];

  constructor() { 
    // let id = 1;
    // let name = "Doctor Who";
    // let bookings = [];
    // let regularSchedule = [];



    // this.doctors.push({id: id, name: name, bookings: bookings, regularSchedule: regularSchedule});
  }

  //GET
  getAvailableTimeSlots(id: number , date: Date)
  {
    //return type
      let answer: [{startTime: Duration, endTime: Duration}];
      let person = this.doctors.find(person => 
        {
          person.id == id;
        });
        if(person != null)
        {
          let bookings = person.bookings;
        let daySchedule = person.regularSchedule.find(schedule=> {
          schedule.day == date.getDay();
        });
        daySchedule?.availability.forEach(av => answer.push(av));

        bookings.forEach(booking=>
          {
              let startTime: Duration = {hours: booking.datetime.getHours(), minutes: booking.datetime.getMinutes()}; //booking start time
              let finishtime = booking.datetime.getTime()+booking.duration.hours*60*60*1000+booking.duration.minutes*60*1000;
              let finishDate = new Date(finishtime);
              let endTime : Duration = {hours: finishDate.getHours(), minutes: finishDate.getMinutes()}; //booking finsh time
              let i = answer.findIndex(a =>
                {
                    this.compareDurations(a.startTime, startTime) <= 0 && this.compareDurations(a.endTime, startTime) >= 0;
                });

              answer.push(
                {
                  startTime: answer[i].startTime, endTime: startTime 
                }
              );
              answer.push(
                {
                  startTime: endTime, endTime: answer[i].endTime 
                }
              );
              answer.splice(i, 1);
              console.log(answer);
              return answer;


              
          });

        }
  }

  //UPDATE
  addOpenTimeSlot(id: number, day: number, slot: {startTime: Duration, endTime: Duration})
  {
    let i = this.doctors.findIndex(doctor => 
      {
        doctor.id == id;
      });
      if(i>=0)
      {
        let j = this.doctors[i].regularSchedule.findIndex(slot=> slot.day == day);
        let k = this.doctors[i].regularSchedule[j].availability.findIndex(av=> 
          {
            this.compareDurations(av.startTime, slot.startTime) <= 0 && this.compareDurations(av.endTime, slot.startTime)>=0;
          });
        if(k>0)
        {
          this.doctors[i].regularSchedule[j].availability[k].endTime = slot.endTime;
          return;
        }
        let l = this.doctors[i].regularSchedule[j].availability.findIndex(av=> 
          {
            this.compareDurations(av.startTime, slot.endTime) <= 0 && this.compareDurations(av.endTime, slot.endTime)>=0;
          });
        if(l>0)
        {
          this.doctors[i].regularSchedule[j].availability[k].startTime = slot.startTime;
          return;
        }
        this.doctors[i].regularSchedule[j].availability.push(slot);


      }

      

      


  }
  compareDurations(a: Duration , b: Duration)
  {
    if(a.hours != b.hours)
      return a.hours-b.hours;
    return a.minutes-b.minutes;
  }
}
