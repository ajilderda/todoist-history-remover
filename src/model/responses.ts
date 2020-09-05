export interface GetAllResponse {
  projects: Projects;
  items: Task[];
}

export interface Projects {
  [key: string]: Project;
}

export interface Project {
  id: number;
  name: string;
  color: number;
  collapsed: number;
  is_archived: number;
  is_deleted: number;
  parent_id: number;
  child_order: number;
  is_favorite: number;
  sync_id: null;
  shared: boolean;
}

export interface Task {
  id: number;
  user_id: number;
  content: string;
  completed_date: Date;
  project_id: number;
  task_id: number;
  meta_data: null;
}