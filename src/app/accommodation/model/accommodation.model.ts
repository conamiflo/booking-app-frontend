export interface Accommodation {
  id: number;
  name: string;
  description: string;
  location: string;
  defaultPrice: number;
  photos: string[];
  minGuests: number;
  maxGuests: number;
}
