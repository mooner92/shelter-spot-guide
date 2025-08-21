import { MapPin, Shield, Users, Zap, Heart, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Layout/Header";

/**
 * 소개 페이지 컴포넌트
 * 무더위 쉼터 찾기 서비스에 대한 정보를 제공합니다
 */
const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* 히어로 섹션 */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              무더위 쉼터 찾기 소개
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 font-paperlogy-light">
              극심한 폭염 시 지역사회에 시원한 안식처를 제공합니다
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* 미션 선언문 */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">우리의 사명</h2>
                <p className="text-lg text-muted-foreground leading-relaxed font-paperlogy-light">
                  무더위 쉼터 찾기는 극심한 폭염 상황에서 냉방센터, 쉼터, 구호시설에 대한 실시간 접근을 제공하여 
                  취약한 지역사회 구성원들을 보호하는 것을 목표로 합니다. 우리 플랫폼은 현대 기술과 커뮤니티 중심 데이터를 
                  결합하여 모든 사람이 가장 필요할 때 안전하고 시원한 피난처를 찾을 수 있도록 합니다.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 기능 소개 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">우리가 돕는 방법</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">실시간 위치 정보</h3>
                <p className="text-sm text-muted-foreground font-paperlogy-light">
                  최신 위치 정보와 길찾기를 통해 가장 가까운 냉방센터와 쉼터를 찾아보세요.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">혼잡도 추적</h3>
                <p className="text-sm text-muted-foreground font-paperlogy-light">
                  실시간 혼잡도를 확인하여 대기시간이 짧고 여유 공간이 있는 쉼터를 찾으세요.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-success-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold mb-2">검증된 정보</h3>
                <p className="text-sm text-muted-foreground font-paperlogy-light">
                  모든 쉼터 정보는 지방자치단체와 지역사회 파트너에 의해 검증되고 정기적으로 업데이트됩니다.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-warning-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-warning" />
                </div>
                <h3 className="font-semibold mb-2">빠른 접근</h3>
                <p className="text-sm text-muted-foreground font-paperlogy-light">
                  응급 상황과 쉬운 접근성을 위해 설계된 빠르고 모바일 친화적인 인터페이스입니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 작동 원리 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">작동 원리</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">근처 쉼터 찾기</h3>
                <p className="text-muted-foreground font-paperlogy-light">
                  지도 또는 검색을 사용해 현재 위치 근처의 무더위 쉼터를 찾아보세요.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">이용 가능 여부 확인</h3>
                <p className="text-muted-foreground font-paperlogy-light">
                  각 위치의 실시간 혼잡도, 대기시간, 이용 가능한 시설을 확인하세요.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">길찾기</h3>
                <p className="text-muted-foreground font-paperlogy-light">
                  선택한 쉼터까지 단계별 길찾기를 제공받고 NFC 기술을 이용해 체크인하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 지역사회 영향 */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">지역사회 영향</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
                  <div className="text-muted-foreground font-paperlogy-light">도움받은 사람들</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">150+</div>
                  <div className="text-muted-foreground font-paperlogy-light">파트너 위치</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-success mb-2">24/7</div>
                  <div className="text-muted-foreground font-paperlogy-light">서비스 이용 가능</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 파트너 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">우리의 파트너</h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <p className="text-center text-muted-foreground mb-8 font-paperlogy-light">
                  정확하고 시의적절한 정보를 제공하기 위해 지방정부, 지역사회 단체, 응급 서비스와 긴밀히 협력하고 있습니다.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <Shield className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">응급 서비스</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">커뮤니티센터</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <Heart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">비영리단체</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <MapPin className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">지방정부</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 연락처 정보 */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">연락하기</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-6 font-paperlogy-light">
                    질문이나 제안이 있으시거나 저희와 파트너십을 맺고 싶으시다면 언제든지 연락해 주세요.
                  </p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">응급 핫라인</div>
                      <div className="text-sm text-muted-foreground font-paperlogy-light">1588-0119</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">지원 이메일</div>
                      <div className="text-sm text-muted-foreground font-paperlogy-light">help@shelterguide.kr</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <Button className="mr-4">
                    지원팀 문의
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    더 알아보기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;