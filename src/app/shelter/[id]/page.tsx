'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Wifi, Bath, Bed, Heart, Navigation, Phone, NfcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Layout/Header";
import { getShelterById } from "@/data/mockShelters";

/**
 * 쉼터 상세 페이지 컴포넌트
 * 특정 쉼터에 대한 종합적인 정보를 표시합니다
 * NFC 태그 등록 및 체크인 기능을 포함합니다
 */
const ShelterDetailPage = () => {
  const params = useParams();
  const id = params?.id as string;
  const shelter = id ? getShelterById(id) : null;

  if (!shelter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">쉼터를 찾을 수 없습니다</h1>
            <p className="text-muted-foreground mb-6 font-paperlogy-light">찾으시는 쉼터가 존재하지 않습니다.</p>
            <Button asChild>
              <Link href="/">지도로 돌아가기</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 프로그레스 바를 위한 혼잡도 퍼센트 계산
  const getCongestionPercentage = (level: string) => {
    switch (level) {
      case "low": return 25;
      case "medium": return 65;
      case "high": return 90;
      default: return 0;
    }
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case "low": return "bg-success";
      case "medium": return "bg-warning";
      case "high": return "bg-destructive";
      default: return "bg-primary";
    }
  };

  const getCongestionVariant = (level: string) => {
    switch (level) {
      case "low": return "success" as const;
      case "medium": return "warning" as const;
      case "high": return "destructive" as const;
      default: return "default" as const;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* 경로 표시 */}
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>지도로 돌아가기</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 쉼터 헤더 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{shelter.name}</CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="font-paperlogy-light">{shelter.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Navigation className="w-4 h-4 mr-1" />
                        <span className="font-paperlogy-light">{shelter.distance} 거리</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="font-paperlogy-light">{shelter.operatingHours}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getCongestionVariant(shelter.congestion)} className="text-sm">
                    {shelter.congestion === "low" ? "여유" : shelter.congestion === "medium" ? "보통" : "혼잡"}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* 운영 시간 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>운영 시간</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">오늘</span>
                    <span className="text-muted-foreground font-paperlogy-light">{shelter.operatingHours}</span>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>월요일</span>
                        <span className="text-muted-foreground font-paperlogy-light">오전 9시 - 오후 5시</span>
                      </div>
                      <div className="flex justify-between">
                        <span>화요일</span>
                        <span className="text-muted-foreground font-paperlogy-light">오전 9시 - 오후 5시</span>
                      </div>
                      <div className="flex justify-between">
                        <span>수요일</span>
                        <span className="text-muted-foreground font-paperlogy-light">오전 9시 - 오후 5시</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>목요일</span>
                        <span className="text-muted-foreground font-paperlogy-light">오전 9시 - 오후 5시</span>
                      </div>
                      <div className="flex justify-between">
                        <span>금요일</span>
                        <span className="text-muted-foreground font-paperlogy-light">오전 9시 - 오후 5시</span>
                      </div>
                      <div className="flex justify-between">
                        <span>토요일</span>
                        <span className="text-muted-foreground font-paperlogy-light">오전 10시 - 오후 2시</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 시설 */}
            <Card>
              <CardHeader>
                <CardTitle>이용 가능한 시설</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.wifi ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Wifi className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.wifi ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">Wi-Fi</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.showers ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Bath className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.showers ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">샤워실</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.beds ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Bed className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.beds ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">침대</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.firstAid ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Heart className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.firstAid ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">응급처치</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 혼잡도 */}
            <Card>
              <CardHeader>
                <CardTitle>현재 혼잡도</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {shelter.congestion === "low" ? "여유" : shelter.congestion === "medium" ? "보통" : "혼잡"}
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 font-paperlogy-light">
                    예상 대기시간: {shelter.waitTime}
                  </div>
                </div>
                <Progress 
                  value={getCongestionPercentage(shelter.congestion)} 
                  className="h-3"
                />
                <div className="text-xs text-muted-foreground text-center font-paperlogy-light">
                  5분 전 업데이트됨
                </div>
              </CardContent>
            </Card>

            {/* NFC 태그 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <NfcIcon className="w-5 h-5 text-primary" />
                  <span>NFC 체크인</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground font-paperlogy-light">
                  NFC를 사용하여 빠르게 체크인하고 실시간 혼잡도 업데이트에 도움을 주세요.
                </p>
                <div className="space-y-2">
                  <Button className="w-full">
                    NFC 태그 등록
                  </Button>
                  <Button variant="outline" className="w-full">
                    지금 체크인
                  </Button>
                </div>
                <div className="text-xs text-center text-muted-foreground font-paperlogy-light">
                  쉼터 입구의 NFC 태그에 휴대폰을 가까이 대주세요
                </div>
              </CardContent>
            </Card>

            {/* 빠른 작업 */}
            <Card>
              <CardHeader>
                <CardTitle>빠른 작업</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  길찾기
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  쉼터 전화
                </Button>
                <Button variant="outline" className="w-full">
                  위치 공유
                </Button>
              </CardContent>
            </Card>

            {/* 추가 정보 */}
            <Card>
              <CardHeader>
                <CardTitle>추가 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">접근성:</span>
                  <span className="text-muted-foreground ml-2 font-paperlogy-light">휠체어 접근 가능</span>
                </div>
                <div>
                  <span className="font-medium">주차:</span>
                  <span className="text-muted-foreground ml-2 font-paperlogy-light">길가 주차 가능</span>
                </div>
                <div>
                  <span className="font-medium">연락처:</span>
                  <span className="text-muted-foreground ml-2 font-paperlogy-light">02-1234-5678</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDetailPage;
