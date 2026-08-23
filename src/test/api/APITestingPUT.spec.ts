import {test, request, APIRequestContext} from '@playwright/test';

/*
* Put API Testing   
  I wanted to create a new booking entry with POST and then update the same entry with PUT method.
*/
test.describe.serial('Put API Testing', () => {
    let globalPutRequest:APIRequestContext;
    let bookingID:number;
    test.beforeAll(async()=>{
        globalPutRequest=await request.newContext({
            baseURL: 'https://restful-booker.herokuapp.com',
            extraHTTPHeaders:{
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
            }

        })
    })

    test.afterAll(async()=>{
        await globalPutRequest.dispose();
    })


    test('Create new book entry with POST', async ({request})=>{
        const responseWithID = await globalPutRequest.post('/booking',{
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
     console.log(await responseWithID.json());
     test.expect(responseWithID.status()).toBe(200);
     const responseBody = await responseWithID.json();
     test.expect(responseBody).toHaveProperty('bookingid');
     console.log("Booking ID is : "+responseBody.bookingid);
     bookingID = responseBody.bookingid;
     console.log("Post Booking ID is : "+bookingID);

    })

    test('Put request with global request', async ({request})=>{
        console.log("Put Booking ID is : "+bookingID);
        const response = await globalPutRequest.put('/booking/'+bookingID,{
            data:{
                firstname : "Blue",
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
       // console.log(await response.json());
        test.expect(response.status()).toBe(200);
        const responseBody = await response.json();
        test.expect(responseBody.firstname).toBe('Blue');
        test.expect(responseBody).toHaveProperty('firstname');
    })
})