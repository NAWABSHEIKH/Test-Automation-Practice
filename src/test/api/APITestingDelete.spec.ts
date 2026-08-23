import {test,request,APIRequestContext} from '@playwright/test';

test.describe.serial('Delete API Testing', () => {
    let globalDeleteRequest:APIRequestContext;
    let bookingID:number;
    test.beforeAll(async()=>{
        globalDeleteRequest=await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            extraHTTPHeaders:{
                Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='     
            }
        })
    })

    test.afterAll(async()=>{
        await globalDeleteRequest.dispose();
    })

    test('Create new book entry with POST', async ({request})=>{
        const responseWithID = await globalDeleteRequest.post('/booking',{
             data:{
        firstname : "Yellow",
        lastname : "Brown",
        totalprice : 111,
        depositpaid : true,
        bookingdates : {
        checkin : "2018-01-01",
        checkout : "2019-01-01"
            },
        additionalneeds : "Breakfast",
    }
        })
        const responseBody = await responseWithID.json();
        console.log(await responseWithID.json());
        test.expect(responseWithID.status()).toBe(200);
        test.expect(responseBody).toHaveProperty('bookingid');
        console.log("Booking ID is : "+responseBody.bookingid);
        bookingID = responseBody.bookingid;
        console.log("Post Booking ID is : "+bookingID);

    })

    test('Delete request with global request', async ({request})=>{
        console.log("Delete Booking ID is : "+bookingID);
        const response = await globalDeleteRequest.delete('/booking/'+bookingID);
        console.log(response.status());
        test.expect(response.status()).toBe(201);
    })



})
