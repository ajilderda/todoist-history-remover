export interface GetAllCompletedResponse {
  projects: Projects;
  items: CompletedTask[];
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

export interface CompletedTask {
  id: number;
  user_id: number;
  content: string;
  completed_date: Date;
  project_id: number;
  task_id: number;
  meta_data: null;
}

export interface Task {
  id: number;
  content: string;
  checked: number;
  project_id: number;
  user_id: number;
  in_history: number;
  priority: number;
  collapsed: number;
  date_added: Date;
  date_completed: null;
  assigned_by_uid: null;
  responsible_uid: null;
  added_by_uid: null;
  is_deleted: number;
  sync_id: null;
  parent_id: null;
  child_order: number;
  section_id: null;
  labels: number[];
  day_order: number;
  due: Due;
}

export interface Due {
  date: Date;
  timezone: null;
  string: string;
  lang: string;
  is_recurring: boolean;
}
