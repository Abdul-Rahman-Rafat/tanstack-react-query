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
export interface topRatePost{
  post_id: number;
  rateValue: boolean;
  pageNumber:number;
}
export interface PaginatedResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: DataItem[];
}
export type postStatusType = "published" | "draft" | "block" | "all";
