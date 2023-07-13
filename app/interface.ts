export interface Nutrition {
  energy: number;
  moisture: number;
  protein: number;
  phosphorus: number;
  potassium: number;
  natrium: number;
}

export interface Food extends Nutrition {
  foodid: number;
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
  yymmdd: string;
  threemeals: "breakfast" | "lunch" | "dinner";
  foodList: { id: number; weight: number }[];
  dishList: { id: number; weight: number }[];
}

export interface PostDish {
  userid: number;
  name: string;
  detaile: string;
  foodList: { id: number; weight: number }[];
}
