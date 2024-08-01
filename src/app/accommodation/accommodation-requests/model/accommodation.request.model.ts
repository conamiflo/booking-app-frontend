import {PriceType} from "../../accommodation-creation/model/price-type.model";

export interface AccommodationRequest {
    id: number,
    ownerEmail : string,
    name : string,
    description : string,
    location : string,
    defaultPrice : number,
    photos : string[],
    minGuests : number,
    maxGuests : number,
    created : number,
    type : string,
    priceType: PriceType,
    editedAccommondation : number,
    creationType : string
}

