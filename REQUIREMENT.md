### **기능 요구사항**

- 화면 상단에서 신규 To-Do 입력하여 목록에 추가할 수 있습니다.
    - 내용 및 기한(날짜) 입력이 가능합니다.
    - 모든 입력에 대한 유효성 검증을 반영합니다.
        - 할일은 반드시 입력되어야 합니다.
        - 과거 날짜는 입력할 수 없습니다.
- Row 단위로 선택하여 수정이 가능합니다.
- 항목 별 완료 처리가 가능하고 완료된 항목에 대해 인지할 수 있도록 표시합니다.
- Multiple Row 선택 후 삭제가 가능합니다.
- 기한이 3일 이내로 남은 경우 사용자가 인지할 수 있도록 표시합니다.
- List 표시방법은 아래 두가지 방법 중 하나를 선택하여 구현합니다.
    - List는 Page Size 5, 10, 20 중 선택 옵션을 제공하여 페이지로 표시합니다.
        - 전체선택 기능을 구현합니다.
    - Infinite Scroll로 표시합니다.
- 리스트 내에서 검색 기능을 제공합니다.
    - 검색 키워드는 브라우저를 다시 열었을 때 유지되도록 합니다.
    - 키워드 검색 상태가 유지되도록 합니다.

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
