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
