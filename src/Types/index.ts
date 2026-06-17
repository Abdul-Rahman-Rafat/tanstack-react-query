export interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
  data?: DataItem;
}
export interface CommentPost{
  post_id: number;
  comment: string;
}
export interface CommentResponse{
  id: number;
  comment: string;
  post_id: number;
}

export type postStatusType = "published" | "draft" | "block" | "all";
