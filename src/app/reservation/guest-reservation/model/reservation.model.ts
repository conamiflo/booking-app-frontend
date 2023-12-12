export interface GuestReservation {
  id: number;
  accommodation: string;
  startDate: string;
  endDate: string;
  numberOfGuests: number;
  status: string;
  price: number;
  photos: string[];
}
