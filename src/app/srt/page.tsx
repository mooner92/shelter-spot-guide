import { SRTChart } from '@/components/SRT/SRTChart';

export default function SRTPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SRT 승차권 발매 현황</h1>
        <p className="text-muted-foreground">
          공공데이터포털의 SRT 승차권 발매 현황 데이터를 기반으로 한 차트입니다.
        </p>
      </div>
      
      <div className="grid gap-6">
        <SRTChart />
        
        <div className="bg-muted/50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">데이터 출처</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>API명:</strong> (주)에스알_SRT 승차권 발권</p>
            <p>• <strong>제공기관:</strong> (주)에스알</p>
            <p>• <strong>데이터포맷:</strong> JSON</p>
            <p>• <strong>출처:</strong> <a href="https://www.data.go.kr/data/15108354/openapi.do" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">공공데이터포털</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
