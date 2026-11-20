
import { test, expect } from '@playwright/test';



test('My First APi Test', async({request})=>{
 
    const response1 = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response1.status()).toBe(200);

    const responseBody1= await response1.json();
    expect(responseBody1.id).toBe(1);
    expect(responseBody1.userId).toBe(1);
    expect(responseBody1.title).toContain('provident');

    const response2= await request.post('https://jsonplaceholder.typicode.com/posts',
        {
            data:{
                userId:10,
                title:'My First API Post Test',
                body:'Learning Playwright API testing'
            }
        }
    )

    expect(response2.status()).toBe(201);
    const responseBody2= await response2.json();
       expect(responseBody2.userId).toBe(10);
    expect(responseBody2.title).toContain('My First API Post Test');
    expect(responseBody2.body).toBe('Learning Playwright API testing');

    const response3= await request.put('https://jsonplaceholder.typicode.com/posts/1',
        {
            data:{
                userId:10,
                title:'My First API Post Test Replace',
                body:'Learning Playwright API testing Replace'
            }
        }
    )

    expect(response3.status()).toBe(201);
    const responseBody3= await response3.json();
       expect.soft(responseBody3.userId).toBe(13);
    expect.soft(responseBody3.title).toBe('My First API Post Test');
    expect.soft(responseBody3.body).toBe('Learning Playwright API testing');


});
