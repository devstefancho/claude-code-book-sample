# DRY (Don't Repeat Yourself) 원칙

## Bad: 동일한 로직 반복
- 문제: fetch, 에러 처리, JSON 파싱이 중복됨
- 영향: 변경 시 여러 곳 수정 필요, 일관성 유지 어려움

```typescript
async function getUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
  return await response.json();
}

async function getPost(id: string) {
  const response = await fetch(`/api/posts/${id}`);
  if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
  return await response.json();
}
```

## Good: 공통 함수로 추출
- 개선: 제네릭 apiCall 함수로 중복 제거
- 효과: 에러 처리 로직 일원화, 유지보수 용이

```typescript
async function apiCall<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`에러 발생: ${response.status}`);
  return await response.json();
}

async function getUser(id: string) {
  return apiCall(`/api/users/${id}`);
}

async function getPost(id: string) {
  return apiCall(`/api/posts/${id}`);
}
```
