export interface Comment {
    id: number;
    postId: number; 
    postedBy: string; 
    content: string; 
    date?: Date; 
}
