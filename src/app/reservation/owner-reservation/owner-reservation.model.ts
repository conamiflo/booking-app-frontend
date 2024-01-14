import {ReservationStatus} from "../reservation.status";

export interface OwnerReservationModel {
  id : number,
  accommodation : number,
  guest : string,
  startDate : string,
  endDate : string,
  numberOfGuests : number,
  status: string,
  price : number,
  cancelledReservations : number
}
