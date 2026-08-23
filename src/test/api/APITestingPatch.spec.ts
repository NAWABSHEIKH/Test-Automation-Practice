import {expect,test,request,APIRequestContext} from '@playwright/test';

test.describe.serial('Patch API Testing', () => {
    let globalPatchRequest:APIRequestContext;
    let bookingID:number;
    test.beforeAll(async()=>{
        globalPatchRequest=await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            extraHTTPHeaders:{
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            }
        })
    })

    test.afterAll(async()=>{
            await globalPatchRequest.dispose();
    })

        test('Create new book entry with POST', async ({request})=>{
            const responseWithID = await globalPatchRequest.post('/booking',{
                 data:{
        firstname : "Yellow",
        lastname : "Brown",
        totalprice : 111,
        depositpaid : true,
        bookingdates : {
        checkin : "2018-01-01",
        checkout : "2019-01-01"
            },
        additionalneeds : "Breakfast"
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

    test('Patch request with global request', async ({request})=>{
        console.log("Patch Booking ID is : "+bookingID);
        const response = await globalPatchRequest.patch('/booking/'+bookingID,{
            data:{
                firstname : "Blue_Updated",
            }
        })
        const responseBody = await response.json();
        console.log(responseBody);
        test.expect(response.status()).toBe(200);
        test.expect(responseBody.firstname).toBe('Blue_Updated');
    })
})
