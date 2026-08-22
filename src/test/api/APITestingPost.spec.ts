import {test,request, type APIRequestContext} from '@playwright/test';

test.describe.serial('Post API Testing',()=>{
    let globalPostRequest:APIRequestContext;
    let bookingId:number;
    test.beforeAll(async ()=>{
      globalPostRequest=await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            extraHTTPHeaders: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
    })

    test.afterAll(async ()=>{
        await globalPostRequest.dispose();
    })

    test('POST Call with global request', async ({request})=>{
        const responseWithID = await globalPostRequest.post('/booking',{
            data:{
    firstname : "Bablu",
    lastname : "Brown",
    totalprice : 111,
    depositpaid : true,
    bookingdates : {
        checkin : "2018-01-01",
        checkout : "2019-01-01"
    },
    additionalneeds : "Breakfast"
}
        });
        console.log(await responseWithID.json());
        const responseBody = await responseWithID.json();
        test.expect(responseWithID.status()).toBe(200);
        test.expect(responseBody).toHaveProperty('bookingid');
        
        console.log("Booking ID is : "+responseBody.bookingid);
        bookingId = responseBody.bookingid;
        console.log("Post Booking ID is : "+bookingId);

    })


    test('Get request with Id after POST', async ({request}) => {
         console.log("Get Booking ID is : "+bookingId);
        const response = await globalPostRequest.get('/booking/'+bookingId);
        const responseBody = await response.json();
        console.log(responseBody);
        test.expect(response.status()).toBe(200);
        test.expect(responseBody.firstname).toBe('Bablu');
        test.expect(responseBody).toHaveProperty('firstname');
    })
        
})