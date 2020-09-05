import { token } from './auth';
import { GetAllResponse, Task } from '../model/responses';

export async function deleteTask(taskId: string) {
  const response = await fetch(`https://api.todoist.com/rest/v1/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return response;
}

export async function getCompletedTasks(): Promise<Task[]> {
  const response = await fetch(`https://api.todoist.com/sync/v8/completed/get_all?token=${token}&limit=200`)
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json() as Promise<GetAllResponse>;
    })
    .then(data => data.items);

  return response;
}