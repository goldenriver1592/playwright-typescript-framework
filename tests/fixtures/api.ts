import { test as base, APIRequestContext } from '@playwright/test';

// Định nghĩa kiểu cho fixtures của module này
type ApiFixtures = {
  apiRequest: APIRequestContext;
  apiClient: {
    getUser: (id: string) => Promise<any>;
    createOrder: (data: any) => Promise<any>;
  };
};

// Export một TestType đã extend với 2 fixture
export const test = base.extend<ApiFixtures>({
  // 1. Lấy built-in `request` làm `apiRequest`
  apiRequest: async ({ request }, use) => {
    await use(request);
  },

  // 2. Khởi tạo API client wrapper
  apiClient: async ({ apiRequest }, use) => {
    const client = {
      getUser: (id: string) =>
        apiRequest.get(`/users/${id}`).then(r => r.json()),
      createOrder: (data: any) =>
        apiRequest.post('/orders', { data }).then(r => r.json()),
    };
    await use(client);
  },
});
