import { Booking } from "./booking"
import { Duration } from "./duration"

export interface Doctor {

    id: number,
    name: string,
    bookings: Booking[],
    regularSchedule : [ {
        day: number,
        availability: [{startTime: Duration, endTime: Duration}]
    }]
}
