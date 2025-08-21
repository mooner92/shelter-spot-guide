import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 에러: 사용자가 존재하지 않는 경로에 접근했습니다:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4 font-paperlogy-light">죄송합니다! 페이지를 찾을 수 없습니다</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline font-paperlogy-light">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFound;
