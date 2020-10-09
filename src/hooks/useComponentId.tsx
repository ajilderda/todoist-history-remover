import { useState } from 'react';

let uniqueId = 0;

export function useComponentId() {
  const [componentId] = useState(() => uniqueId++);
  return componentId;
}