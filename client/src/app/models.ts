export interface Recipe {
  _id?: string;
  name: string;
  description: string;
  portions: string;
  steps: string[];
  verbs: string[];
  ingredients: string[];
  type: string[];
  connected_recipes: string[];
  comments: string[];
  images: string[];
  featured_meal_count: number;
  book: string[];
}

export interface User {
  _id?: string;
  first_name: string;
  last_name: string;
  username:string;
  email: string;
  password: string;
  comments: string[];
  images: string[];
  recipes: string[];
  tssci: boolean;
}

export interface Comment {
  _id?: string;
  user_id: string;
  text: string;
  upvotes: number;
  replies: Comment[];
  parent_id: string,
  parent_type: string,
  update_arr: Comment[];
  // location: string;
}


export interface Image {
  _id?: string;
  url: string;
  user_id:string;
  upvotes: number;
  // report: string;
  comments: string[];
}
