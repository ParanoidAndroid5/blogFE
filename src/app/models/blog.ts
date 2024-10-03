export interface Blog
{ 
  id: number;
  username: string;
  name: string; //title a referans ediyor.
  content: string;
  imgUrl: string;
  
  date: string;
  likeCount: number;
}