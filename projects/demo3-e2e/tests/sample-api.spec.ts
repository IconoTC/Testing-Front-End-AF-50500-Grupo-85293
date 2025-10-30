import test, { expect } from '@playwright/test';

test.describe('API tests', () => {
    const baseURL = 'https://api.practicesoftwaretesting.com';

    test('GET /products', async ({ request }) => {
        const response = await request.get(`${baseURL}/products`);
        expect(response.status()).toBe(200);

        expect((await response.json()).data).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ id: expect.any(String) }),
            ])
        );
    });

    test('POST /users/login', async ({ request }) => {
  
        const response = await request.post(baseURL + '/users/login', {
            data: {
                email: 'customer@practicesoftwaretesting.com',
                password: 'welcome01',
            },
        });

        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.access_token).toBeTruthy();
    });
});
