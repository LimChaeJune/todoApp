# API Spec

### Types

```tsx
interface ToDo {
  id: number; // PK
  text: string; // To-Do 내용
  done: boolean;  // 완료 여부
  deadline: number; // 기한 (timestamp - milliseconds)
}

interface APIResponse<T> {
  code: number, // HTTP Code
  message?: string,  // message
  data?: T,
}

type ToDoRequest = Omit<ToDo, 'id'>;
```

### Fetch ToDos

```tsx
Endpoint: /api/todos
Method: GET
Response: APIResponse<ToDo[]>
Example:
  {
    code: 200,
    message: '',
    data: [
      {id: 1, text: "To do", done: false, deadline: 1645434638682},
    ]
  }
```

### Create ToDo

```tsx
Endpoint: /api/todos
Method: POST
Request: ToDoRequest
Example:
  {
    text: "To do", done: false, deadline: 1645434638682,
  }
Response: APIResponse<ToDo>
Example:
  {
    code: 200,
    message: '',
    data: {
      id: 2, text: "To do", done: false, deadline: 1645434638682,
    }
  }

```

### Get ToDo

```tsx
Endpoint: /api/todos/{id}
Method: GET
Response: APIResponse<ToDo>
Example:
  {
    code: 200,
    message: '',
    data: {id: 1, text: "To do", done: false, deadline: 1645434638682}
  }

```

### Update ToDo

```tsx
Endpoint: /api/todos/{id}
Method: PUT
Request: ToDoRequest
Example:
  { text: "To do", done: false, deadline: 1645434638682}
Response: APIResponse<ToDo>
Example:
  {
    code: 200,
    message: '',
    data: { id, 2, text: "To do", done: false, deadline: 1645434638682}
  }
```

### Delete ToDo

```tsx
Endpoint: /api/todos/{id}
method: DELETE
Response: APIResponse<void>
Example:
  {
    code: 200,
    message: ''
  }
```
