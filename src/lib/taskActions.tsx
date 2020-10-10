import axios from 'axios';
import { token } from './auth';
import { GetAllCompletedResponse, CompletedTask, Task } from '../model/responses';

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

export async function getCompletedItems(offset = 0): Promise<CompletedTask[]> {
  const response = await fetch(`https://api.todoist.com/sync/v8/completed/get_all?token=${token}&limit=200&offset=${offset}`)
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json() as Promise<GetAllCompletedResponse>;
    })
    .then(data => data.items);

  return response;
}

export async function get(resources: string[]) {
  console.log(`[todoist/get] Fetching ${resources.join(', ')} from Todoist...`);
  const res = await axios.post<string, any>('https://api.todoist.com/sync/v8/sync', {
    token,
    sync_token: '*',
    resource_types: JSON.stringify(resources),
  });
  return res.data;
}

export async function getItems(): Promise<Task[]> {
  const { items } = await get(['items']);
  return items;
}

// recursive function that returns a new promise if the limit is not reached.
export const getAllCompletedItems = async (cb: any = (f: never) => f, offset = 0, payload: CompletedTask[] = []): Promise<CompletedTask[]> => {
  const response = await getCompletedItems(offset);
  cb(response);
  const mergedItems = payload.concat(response);
  // make a new call if there are items remaining
  if (response.length && payload.length < 0) return getAllCompletedItems(cb, offset + 200, mergedItems);
  return mergedItems;
}
