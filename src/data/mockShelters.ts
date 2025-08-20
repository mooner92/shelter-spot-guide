import type { Shelter } from "@/components/Shelter/ShelterCard";

/**
 * Mock shelter data for demonstration
 * In a real application, this would come from an API
 */
export const mockShelters: Shelter[] = [
  {
    id: "1",
    name: "Community Center Shelter",
    address: "123 Elm Street, Anytown, CA 91234",
    distance: "0.3 miles",
    operatingHours: "9 AM - 5 PM",
    congestion: "low",
    waitTime: "5 minutes",
    facilities: {
      wifi: true,
      showers: true,
      beds: true,
      firstAid: true
    },
    coordinates: {
      lat: 37.7849,
      lng: -122.4094
    }
  },
  {
    id: "2",
    name: "City Hall Shelter",
    address: "456 Oak Avenue, Anytown, CA 91234",
    distance: "0.7 miles",
    operatingHours: "10 AM - 2 PM",
    congestion: "medium",
    waitTime: "15 minutes",
    facilities: {
      wifi: true,
      showers: false,
      beds: true,
      firstAid: true
    },
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    }
  },
  {
    id: "3",
    name: "Library Shelter",
    address: "789 Pine Lane, Anytown, CA 91234",
    distance: "1.2 miles",
    operatingHours: "9 AM - 5 PM",
    congestion: "low",
    waitTime: "2 minutes",
    facilities: {
      wifi: true,
      showers: false,
      beds: false,
      firstAid: false
    },
    coordinates: {
      lat: 37.7649,
      lng: -122.4294
    }
  },
  {
    id: "4",
    name: "Recreation Center Shelter",
    address: "101 Maple Drive, Anytown, CA 91234",
    distance: "0.9 miles",
    operatingHours: "10 AM - 6 PM",
    congestion: "medium",
    waitTime: "12 minutes",
    facilities: {
      wifi: false,
      showers: true,
      beds: true,
      firstAid: true
    },
    coordinates: {
      lat: 37.7949,
      lng: -122.3994
    }
  },
  {
    id: "5",
    name: "Senior Center Shelter",
    address: "222 Cedar Court, Anytown, CA 91234",
    distance: "1.5 miles",
    operatingHours: "Monday - Friday: 9 AM - 5 PM",
    congestion: "high",
    waitTime: "25 minutes",
    facilities: {
      wifi: true,
      showers: true,
      beds: false,
      firstAid: true
    },
    coordinates: {
      lat: 37.7549,
      lng: -122.4394
    }
  }
];

/**
 * Get shelter by ID
 */
export const getShelterById = (id: string): Shelter | undefined => {
  return mockShelters.find(shelter => shelter.id === id);
};

/**
 * Filter shelters by congestion level
 */
export const getSheltersByCongestion = (level: string): Shelter[] => {
  return mockShelters.filter(shelter => shelter.congestion === level);
};

/**
 * Sort shelters by distance (mock implementation)
 */
export const getSheltersByDistance = (): Shelter[] => {
  return [...mockShelters].sort((a, b) => 
    parseFloat(a.distance) - parseFloat(b.distance)
  );
};