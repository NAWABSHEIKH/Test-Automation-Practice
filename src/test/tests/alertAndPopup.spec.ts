import { Home } from "../../main/pages/Home";
import { Form } from "../../main/pages/Form";
import { expect, Page,test } from "@playwright/test";
import { AlertPopup } from "../../main/pages/AlertPopup";

test.describe("Alert and Popup",async ():Promise<void>=>{
 
    let form:Form;
    let alert:AlertPopup;
    test.beforeEach("Opening the website",async ({page})=>{
    form=new Form(page);    
    await form.openUrl();
    });

    test("1. Simple Alert",async({page})=>{
    alert=new AlertPopup(page);
    await alert.simpleAlertBtn();
    });

    test("2. Confirm Alert Button",async ({page})=>{
    alert=new AlertPopup(page);
    let enterMessage:string="OK";
    let message:string=await alert.confirmAlertBtn(enterMessage);
    if(enterMessage=='Cancel'){
    expect(message).toMatch(/Cancel/i)
    }else if(enterMessage=='OK')
    expect(message).toMatch(/OK/i)
    })

    test("3. Prompt Alert Button",async ({page})=>{
    alert=new AlertPopup(page);
    const messageVerify:string=await alert.promptAlertBtn("Khan");
    expect(messageVerify).toMatch(/khan/i)

    })

})
