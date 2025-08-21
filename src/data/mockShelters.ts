import type { Shelter } from "@/components/Shelter/ShelterCard";

/**
 * 데모용 쉼터 모크 데이터
 * 실제 애플리케이션에서는 API에서 데이터를 가져옵니다
 */
export const mockShelters: Shelter[] = [
  {
    id: "1",
    name: "커뮤니티센터 쉼터",
    address: "서울시 강남구 테헤란로 123",
    distance: "0.5 km",
    operatingHours: "오전 9시 - 오후 5시",
    congestion: "low",
    waitTime: "5분",
    facilities: {
      wifi: true,
      showers: true,
      beds: true,
      firstAid: true
    },
    coordinates: {
      lat: 37.5009,
      lng: 127.0396
    }
  },
  {
    id: "2",
    name: "시청 무더위쉼터",
    address: "서울시 중구 세종대로 110",
    distance: "1.1 km",
    operatingHours: "오전 10시 - 오후 2시",
    congestion: "medium",
    waitTime: "15분",
    facilities: {
      wifi: true,
      showers: false,
      beds: true,
      firstAid: true
    },
    coordinates: {
      lat: 37.5635,
      lng: 126.9970
    }
  },
  {
    id: "3",
    name: "중앙도서관 쉼터",
    address: "서울시 서초구 반포대로 201",
    distance: "1.9 km",
    operatingHours: "오전 9시 - 오후 5시",
    congestion: "low",
    waitTime: "2분",
    facilities: {
      wifi: true,
      showers: false,
      beds: false,
      firstAid: false
    },
    coordinates: {
      lat: 37.5033,
      lng: 127.0041
    }
  },
  {
    id: "4",
    name: "생활체육센터 쉼터",
    address: "서울시 송파구 올림픽로 300",
    distance: "1.4 km",
    operatingHours: "오전 10시 - 오후 6시",
    congestion: "medium",
    waitTime: "12분",
    facilities: {
      wifi: false,
      showers: true,
      beds: true,
      firstAid: true
    },
    coordinates: {
      lat: 37.5145,
      lng: 127.1066
    }
  },
  {
    id: "5",
    name: "경로당 쉼터",
    address: "서울시 마포구 월드컵로 222",
    distance: "2.4 km",
    operatingHours: "월-금: 오전 9시 - 오후 5시",
    congestion: "high",
    waitTime: "25분",
    facilities: {
      wifi: true,
      showers: true,
      beds: false,
      firstAid: true
    },
    coordinates: {
      lat: 37.5565,
      lng: 126.9195
    }
  }
];

/**
 * ID로 쉼터 찾기
 */
export const getShelterById = (id: string): Shelter | undefined => {
  return mockShelters.find(shelter => shelter.id === id);
};

/**
 * 혼잡도 레벨별 쉼터 필터링
 */
export const getSheltersByCongestion = (level: string): Shelter[] => {
  return mockShelters.filter(shelter => shelter.congestion === level);
};

/**
 * 거리순으로 쉼터 정렬 (모크 구현)
 */
export const getSheltersByDistance = (): Shelter[] => {
  return [...mockShelters].sort((a, b) => 
    parseFloat(a.distance) - parseFloat(b.distance)
  );
};