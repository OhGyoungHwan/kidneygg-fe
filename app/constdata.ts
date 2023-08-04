export const foodHeaderToKor = {
  // foodKey 한영 변환용
  no: "번호",
  name: "이름",
  categorie: "상세 분류",
  energy: "칼로리",
  moisture: "수분",
  protein: "단백질",
  phosphorus: "인",
  potassium: "칼륨",
  natrium: "나트륨",
} as const;

// 한번에 보여지는 페이지네이션 수
export const PAGINATION_SIZE = 10;

// 한번에 보여지는 테이블Row 수 백엔드에서 세팅가능
export const TABLE_ROW_SIZE = 10;
