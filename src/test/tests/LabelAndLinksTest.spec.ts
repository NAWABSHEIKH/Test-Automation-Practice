import { expect,test } from "@playwright/test";
import { Home } from "../../main/pages/Home";
import { LabelAndLinks } from "../../main/pages/LabelAndLinks";
import { errorcode } from "../data/errorcode";


test.describe("Label and Links",async()=>{
    let home:Home;
    let labelLinks:LabelAndLinks;
    test.beforeEach("Setting up the website",async({page})=>{
        home=new Home(page);
        await home.openUrl();
    })

    test("1. Mobiles Links",async({page})=>{
       labelLinks=new LabelAndLinks(page);
       const mobileAvailable:boolean= await labelLinks.mobileModelPresence(["Samsung","Real Me","Moto"]);
       expect(mobileAvailable).toBeTruthy();
    })

    test("2. Laptops Links",async({page})=>{
       labelLinks=new LabelAndLinks(page);
       const laptop:string="Lenovo"
       const laptopAvailable:string= await labelLinks.clickLaptopLink(laptop)
       expect(laptopAvailable).toContain(laptop);
    })

    for(const error of errorcode){

    test(`3. Broken Links ${error.status}`,async({page})=>{
       labelLinks=new LabelAndLinks(page);
       const status:string=(await labelLinks.verifyErrorLink(error.status))!;
       if(error.status=="400"){
        expect(status).toContain("Bad Request");
       }else if(error.status=="503"){
        expect(status).toContain("The service is unavailable.");
       }else if(error.status=="408"){
         expect(status).toContain("client took too long to complete its request");
       }else{
           expect(status).toContain(error.status);
       }    
       
    })
}

})


