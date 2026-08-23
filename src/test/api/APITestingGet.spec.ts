import {test,request, type APIRequestContext} from '@playwright/test';

test.describe('API Testing',()=>{

let globalRequest: APIRequestContext;
test.beforeAll(async ()=>{
    globalRequest= await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
        extraHTTPHeaders: {
            Accept: 'application/json'
        }
    })
})

test.afterAll(async ()=>{
    await globalRequest.dispose();
})

test('GET Call with global request', async ({request})=>{
    const responseWithID = await globalRequest.get('/booking/2');
    console.log(await responseWithID.json());
})

test('GET request', async ({request}) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking'); 
    console.log(await response.json());
    // Expect the response status to be 200 OK
    test.expect(response.status()).toBe(200);
} )

test('Get request with Id', async ({request}) => {
    const bookingListResponse = await request.get('https://restful-booker.herokuapp.com/booking');
    test.expect(bookingListResponse.status()).toBe(200);
    const bookingList = await bookingListResponse.json();
    test.expect(bookingList.length).toBeGreaterThan(0);

    const bookingId = bookingList[0].bookingid;
    const response = await request.get('https://restful-booker.herokuapp.com/booking/' + bookingId);
    const responseBody = await response.json();
    console.log(responseBody);
    test.expect(response.status()).toBe(200);
    test.expect(responseBody).toHaveProperty('firstname');
})

test('Get request with context url', async ({}) => {
    const context = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com',
    })
    const responseWithID = await context.get('/booking/2');
    console.log(await responseWithID.json());
    test.expect(responseWithID.status()).toBe(200);

})

})





