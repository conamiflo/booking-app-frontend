export interface Accommodation {
  id: number;
  name: string;
  description: string;
  location: string;
  price: number;
  photos: string[];
  minGuests: number;
  maxGuests: number;
}
