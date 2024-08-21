import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // 用于处理和访问 URL 查询参数（即 URL 中 ? 后的部分
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}

