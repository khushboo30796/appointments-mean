import { AppointmentStatus } from "./appointment-status";
import { Duration } from "./duration";
import { Person } from "./person";

export interface Booking {
    id:number,
    status: AppointmentStatus,
    datetime: Date,
    duration: Duration,
    location: string,
    description: string,
    people: Person[],
    reschedulingRequests: Date[]
}
