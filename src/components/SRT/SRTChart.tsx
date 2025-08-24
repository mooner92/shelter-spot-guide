'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SRTStationData {
  RUN_YMD: string;
  SELLNG_STN_NM: string;
  SELLNG_STN_CD: string;
  ROUTE_NM: string;
  SELLNG_QNTY: number;
  PRT_CMPTN_QNTY: number;
  RFND_QNTY: number;
}

interface ChartData {
  date: string;
  [key: string]: string | number;
}

export function SRTChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [startYear, setStartYear] = useState('2024');
  const [startMonth, setStartMonth] = useState('06');
  const [startDay, setStartDay] = useState('01');
  const [endYear, setEndYear] = useState('2024');
  const [endMonth, setEndMonth] = useState('08');
  const [endDay, setEndDay] = useState('31');
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [availableStations, setAvailableStations] = useState<string[]>([]);
  const [availableRoutes, setAvailableRoutes] = useState<string[]>([]);

  const fetchSRTData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 시작일과 종료일을 YYYY-MM-DD 형식으로 구성
      const startDate = `${startYear}-${startMonth}-${startDay}`;
      const endDate = `${endYear}-${endMonth}-${endDay}`;
      
      // 날짜 범위로 한 번에 데이터 가져오기
      const response = await fetch(`/api/srt?startDate=${startDate}&endDate=${endDate}`);
      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error);
      }

      if (result.data && Array.isArray(result.data)) {
        // 날짜별로 데이터 그룹화
        const dateGroups: Record<string, SRTStationData[]> = {};
        const stationSet = new Set<string>();
        const routeSet = new Set<string>();
        
        result.data.forEach((item: SRTStationData) => {
          const stationName = item.SELLNG_STN_NM;
          const routeName = item.ROUTE_NM;
          
          if (stationName) {
            stationSet.add(stationName);
          }
          if (routeName) {
            routeSet.add(routeName);
          }
          
          // RUN_YMD를 YYYY-MM-DD 형식으로 변환
          const runDate = item.RUN_YMD;
          const formattedDate = `${runDate.substring(0, 4)}-${runDate.substring(4, 6)}-${runDate.substring(6, 8)}`;
          
          if (!dateGroups[formattedDate]) {
            dateGroups[formattedDate] = [];
          }
          dateGroups[formattedDate].push(item);
        });
        
        // 차트 데이터로 변환
        const chartData: ChartData[] = Object.keys(dateGroups)
          .sort()
          .map(dateStr => {
            const dateData: ChartData = { 
              date: dateStr,
              year: dateStr.split('-')[0],
              month: dateStr.split('-')[1],
              day: dateStr.split('-')[2]
            };
            
            // 해당 날짜의 모든 데이터를 합치기
            dateGroups[dateStr].forEach((item: SRTStationData) => {
              const stationName = item.SELLNG_STN_NM;
              const routeName = item.ROUTE_NM;
              
              if (stationName && routeName) {
                const combination = `${stationName}-${routeName}`;
                dateData[combination] = (dateData[combination] as number || 0) + item.SELLNG_QNTY;
              }
            });
            
            return dateData;
          });
        
        // 사용 가능한 역과 노선 목록 업데이트
        const stations = Array.from(stationSet).sort();
        const routes = Array.from(routeSet).sort();
        setAvailableStations(stations);
        setAvailableRoutes(routes);
        
        // 선택된 항목이 없으면 기본값 설정
        if (selectedStations.length === 0) {
          setSelectedStations(stations.slice(0, 3));
        }
        if (selectedRoutes.length === 0) {
          setSelectedRoutes(routes.slice(0, 3));
        }
        
        setData(chartData);
      } else {
        setData([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSRTData();
  }, [startYear, startMonth, startDay, endYear, endMonth, endDay]);

  // 선택된 역과 노선 조합으로 필터링된 데이터 생성
  const filteredData = data.map(item => {
    const filteredItem: ChartData = { date: item.date };
    
    selectedStations.forEach(station => {
      selectedRoutes.forEach(route => {
        const combination = `${station}-${route}`;
        if (typeof item[combination] === 'number') {
          filteredItem[combination] = item[combination];
        }
      });
    });
    
    return filteredItem;
  });

  // 선택된 조합별 총 발매량 계산
  const totalSalesByCombination = filteredData.reduce((acc, item) => {
    selectedStations.forEach(station => {
      selectedRoutes.forEach(route => {
        const combination = `${station}-${route}`;
        if (typeof item[combination] === 'number') {
          acc[combination] = (acc[combination] || 0) + item[combination];
        }
      });
    });
    return acc;
  }, {} as Record<string, number>);

  const totalSales = Object.values(totalSalesByCombination).reduce((sum, value) => sum + value, 0);
  const avgSales = Object.keys(totalSalesByCombination).length > 0 ? totalSales / Object.keys(totalSalesByCombination).length : 0;

  // 역-노선 조합별 색상 정의
  const combinationColors = {
    "수서-경부선": "#8884d8",
    "수서-호남선": "#82ca9d",
    "수서-경전선": "#ffc658",
    "수서-동해선": "#ff7300",
    "수서-전라선": "#8dd1e1",
    "동탄-경부선": "#ff6b6b",
    "동탄-호남선": "#4ecdc4",
    "동탄-경전선": "#45b7d1",
    "동탄-동해선": "#96ceb4",
    "동탄-전라선": "#feca57",
    "지제-경부선": "#ff9ff3",
    "지제-호남선": "#54a0ff",
    "지제-경전선": "#5f27cd",
    "지제-동해선": "#00d2d3",
    "지제-전라선": "#ff6b6b",
  };

  // 커스텀 툴팁 컴포넌트
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-sm" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600">{entry.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {entry.value?.toLocaleString()}장
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // 선택된 조합들 생성
  const selectedCombinations = selectedStations.flatMap(station => 
    selectedRoutes.map(route => `${station}-${route}`)
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>SRT 운영역-노선별 승차권 발매 현황</CardTitle>
            <CardDescription>
              운영역과 노선 조합별 승차권 발매 통계
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">시작:</span>
              <Select value={startYear} onValueChange={setStartYear}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['2022', '2023', '2024', '2025'].map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={startMonth} onValueChange={setStartMonth}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = String(i + 1).padStart(2, '0');
                    return (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Select value={startDay} onValueChange={setStartDay}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = String(i + 1).padStart(2, '0');
                    return (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
            <span className="text-sm text-muted-foreground">~</span>
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">끝:</span>
              <Select value={endYear} onValueChange={setEndYear}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['2022', '2023', '2024', '2025'].map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={endMonth} onValueChange={setEndMonth}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = String(i + 1).padStart(2, '0');
                    return (
                      <SelectItem key={month} value={month}>{month}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <Select value={endDay} onValueChange={setEndDay}>
                <SelectTrigger className="w-16">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = String(i + 1).padStart(2, '0');
                    return (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* 역과 노선 선택 */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">운영역 선택:</span>
            <Select 
              value={selectedStations.length > 0 ? selectedStations.join(',') : "none"} 
              onValueChange={(value) => {
                if (value === 'all') {
                  setSelectedStations(availableStations);
                } else if (value === 'none') {
                  setSelectedStations([]);
                } else if (value) {
                  setSelectedStations(value.split(','));
                } else {
                  setSelectedStations([]);
                }
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="운영역을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안함</SelectItem>
                <SelectItem value="all">모든 역</SelectItem>
                {availableStations.map((station) => (
                  <SelectItem key={station} value={station}>{station}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">노선 선택:</span>
            <Select 
              value={selectedRoutes.length > 0 ? selectedRoutes.join(',') : "none"} 
              onValueChange={(value) => {
                if (value === 'all') {
                  setSelectedRoutes(availableRoutes);
                } else if (value === 'none') {
                  setSelectedRoutes([]);
                } else if (value) {
                  setSelectedRoutes(value.split(','));
                } else {
                  setSelectedRoutes([]);
                }
              }}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="노선을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">선택 안함</SelectItem>
                <SelectItem value="all">모든 노선</SelectItem>
                {availableRoutes.map((route) => (
                  <SelectItem key={route} value={route}>{route}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">데이터를 불러오는 중...</div>
          </div>
        )}
        
        {error && (
          <div className="flex items-center justify-center h-64">
            <div className="text-destructive">{error}</div>
          </div>
        )}
        
        {!loading && !error && filteredData.length > 0 && selectedCombinations.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">총 발매량:</span>
                <Badge variant="secondary">{totalSales.toLocaleString()}장</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">평균:</span>
                <Badge variant="outline">{avgSales.toLocaleString()}장</Badge>
              </div>
              {selectedCombinations.map((combination) => (
                <div key={combination} className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{combination}:</span>
                  <Badge variant="outline">{totalSalesByCombination[combination]?.toLocaleString()}장</Badge>
                </div>
              ))}
            </div>
            
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={filteredData}>
                <defs>
                  {selectedCombinations.map((combination) => {
                    const color = combinationColors[combination as keyof typeof combinationColors] || "#8884d8";
                    return (
                      <linearGradient key={combination} id={`color${combination}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={color} stopOpacity={0}/>
                      </linearGradient>
                    );
                  })}
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => {
                    const [year, month, day] = value.split('-');
                    return `${month}/${day}`;
                  }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(1)}천`}
                />
                <Tooltip content={<CustomTooltip />} />
                {selectedCombinations.map((combination) => {
                  const color = combinationColors[combination as keyof typeof combinationColors] || "#8884d8";
                  return (
                    <Area
                      key={combination}
                      type="monotone"
                      dataKey={combination}
                      name={combination}
                      stroke={color}
                      fillOpacity={0.6}
                      fill={`url(#color${combination})`}
                      stackId="1"
                    />
                  );
                })}
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
        
        {!loading && !error && (filteredData.length === 0 || selectedCombinations.length === 0) && (
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">
              {selectedCombinations.length === 0 ? '운영역과 노선을 선택해주세요.' : '해당 기간의 데이터가 없습니다.'}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              SRT 역-노선별 승차권 발매 현황 <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              {startYear}년 {startMonth}월 {startDay}일 ~ {endYear}년 {endMonth}월 {endDay}일
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
