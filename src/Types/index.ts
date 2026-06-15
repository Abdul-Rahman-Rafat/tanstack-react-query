export interface DataItem {
  id: number;
  title: string;
  body: string;
  status: "published" | "draft" | "block";
  topRate: boolean;
  data?: DataItem;
}

export type postStatusType = "published" | "draft" | "block" | "all";
