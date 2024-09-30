export interface Blog
{ 
  id: number;
  author: string;
  userName: string;
  name: string; //title a ref.
  content: string;
  imgUrl: string;
  
  date: string;
  likeCount: number;
}