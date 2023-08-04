export interface Nutrition {
  energy: number;
  moisture: number;
  protein: number;
  phosphorus: number;
  potassium: number;
  natrium: number;
}

export interface Food extends Nutrition {
  no: number;
  name: string;
  categorie: string;
}

export interface Diet {
  userid: number;
  yymmdd: string;
  threemeals: "breakfast" | "lunch" | "dinner";
}

export interface PostDiet {
  userid: number;
  created: string;
  threemeals: "breakfast" | "lunch" | "dinner";
  foodList: { id: number; weight: number }[];
  dishList: { id: number; weight: number }[];
}

export interface PostDish {
  userid: number;
  title: string;
  detail: string;
  foodList: { id: number; weight: number }[];
}

export interface DishDetail {
  dishid: number;
  userid: number;
  title: string;
  hits: number;
  detail: string;
  foodlist: {
    dishid: number;
    foodid: Food;
    weight: number;
  }[];
}

export interface ResponseFood {
  count: number;
  next: string;
  previous: string;
  results: Food[];
}

export interface queryFood {
  page: number;
  search: string;
  ordering: string;
}
