import {PriceType} from "./price-type.model";

export interface AccommodationDetails{
  id: number;
  ownerEmail: string;
  name: string;
  description: string;
  location: string;
  defaultPrice: number;
  photos: string[];
  minGuests: number;
  maxGuests: number;
  created: Date;
  type: string;
  priceType: PriceType;
}
