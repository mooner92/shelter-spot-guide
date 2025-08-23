import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate'); // YYYY-MM-DD 형식
  const endDate = searchParams.get('endDate'); // YYYY-MM-DD 형식

  const apiKey = process.env.SRT_API_KEY;
  const baseUrl = process.env.SRT_API_ENDPOINT || 'https://apis.data.go.kr/B553912';

  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: 'startDate and endDate parameters are required' },
      { status: 400 }
    );
  }

  // 날짜 형식 변환 (YYYY-MM-DD -> YYYYMMDD)
  const startDateFormatted = startDate.replace(/-/g, '');
  const endDateFormatted = endDate.replace(/-/g, '');

  console.log('Date Range:', `${startDate} ~ ${endDate}`);

  try {
    const allData: any[] = [];
    let page = 1;
    let hasMoreData = true;
    const maxPages = 50; // 최대 50페이지까지만 요청 (안전장치)

    while (hasMoreData && page <= maxPages) {
      // API 호출 URL 구성 - 페이지네이션 포함
      const decodedKey = decodeURIComponent(apiKey);
      const url = `${baseUrl}/v1/srt_station_sales?serviceKey=${encodeURIComponent(decodedKey)}&page=${page}&perPage=1000&cond[RUN_YMD::GTE]=${startDateFormatted}&cond[RUN_YMD::LTE]=${endDateFormatted}`;

      console.log(`Fetching page ${page}...`);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json, text/xml',
          'User-Agent': 'Mozilla/5.0 (compatible; SRT-API-Client)',
        },
        signal: AbortSignal.timeout(30000),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', response.status, errorText);
        return NextResponse.json(
          { error: `API request failed: ${response.status} - ${errorText}` },
          { status: response.status }
        );
      }

      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        allData.push(...data.data);
        console.log(`Page ${page}: ${data.data.length} records, Total: ${allData.length}`);
        
        // 더 이상 데이터가 없거나 페이지네이션 한계에 도달했는지 확인
        if (data.data.length < 1000 || page >= data.totalCount / 1000) {
          hasMoreData = false;
        }
      } else {
        hasMoreData = false;
      }
      
      page++;
      
      // API 서버 부하 방지를 위한 짧은 대기
      if (hasMoreData) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    console.log(`Total records fetched: ${allData.length}`);
    
    return NextResponse.json({
      data: allData,
      totalCount: allData.length,
      pageCount: page - 1
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from API' },
      { status: 500 }
    );
  }
}
