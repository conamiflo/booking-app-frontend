export interface Availability {
  id: number;
  timeSlot: TimeSlot;
}

export interface TimeSlot {
  startEpochTime: number; // Format this according to your backend's date representation
  endEpochTime: number;   // Format this according to your backend's date representation
  // Add other properties if present in your backend TimeSlot entity
}
