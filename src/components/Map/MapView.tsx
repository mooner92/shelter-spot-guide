import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

// T-map API 타입 선언
declare global {
  interface Window {
    Tmapv3: any;
  }
}

const MapView = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!window.Tmapv3) {
      setError("Tmapv3가 준비되지 않았습니다. (스크립트가 layout.tsx에서 head에 동기적으로 삽입되어야 합니다)");
      return;
    }
    if (!mapRef.current) {
      setError("지도 컨테이너가 준비되지 않았습니다.");
      return;
    }
    // 기존 map 인스턴스가 있으면 정리
    if (mapInstanceRef.current) {
      mapInstanceRef.current.destroy && mapInstanceRef.current.destroy();
      mapInstanceRef.current = null;
      mapRef.current.innerHTML = '';
    }
    try {
      mapInstanceRef.current = new window.Tmapv3.Map(mapRef.current, {
        center: new window.Tmapv3.LatLng(37.56520450, 126.98702028),
        width: "100%",
        height: "490px",
        zoom: 16
      });
      setIsLoaded(true);
    } catch (e) {
      setError("지도 초기화 실패: " + (e instanceof Error ? e.message : String(e)));
    }
    // 언마운트 시 map 정리
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy && mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      if (mapRef.current) mapRef.current.innerHTML = '';
    };
  }, []);

  return (
    <Card className="w-full h-[490px] flex items-center justify-center relative">
      {error && (
        <span className="text-destructive text-sm">{error}</span>
      )}
      <div ref={mapRef} className="absolute inset-0 w-full h-full" style={{ minHeight: 490, zIndex: 0 }} />
      {!error && !isLoaded && (
        <span className="text-muted-foreground">지도를 불러오는 중...</span>
      )}
    </Card>
  );
};

export default MapView;
