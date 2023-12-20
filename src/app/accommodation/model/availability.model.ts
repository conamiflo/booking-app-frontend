export interface Availability {
  id: number;
  timeSlot: TimeSlot;
}

export interface TimeSlot {
  startDate: string; // Format this according to your backend's date representation
  endDate: string;   // Format this according to your backend's date representation
  // Add other properties if present in your backend TimeSlot entity
}
