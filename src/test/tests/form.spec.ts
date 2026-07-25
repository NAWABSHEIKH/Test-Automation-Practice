import { Home } from "../../main/pages/Home";
import { Form } from "../../main/pages/Form";
import { Page,test } from "@playwright/test";

test.describe("Form Filling Details",async ():Promise<void>=>{
 
    let form:Form;
    test.beforeEach("Opening the website",async ({page})=>{
    form=new Form(page);    
    await form.openUrl();
    });

    test("Filling Details",async({page})=>{
    await form.fillUserName("Anonymous");
    await form.fillUserEmail("abc@gamil.com");
    await form.fillUserPhone("1234");
    await form.fillUserAddress("19 ABC Street");

    await form.selectDays(["monday","friday","wednesday"]);
    await form.selectGender("male");

    await form.selectCountry("India")
    await form.selectColor(["green","red","white"]);
    await form.sortAnimals(["Cat","Fox","Zebra"])
    await form.datePicker2("31","Nov","2026");
    await form.datePicker1("November","28");
    await form.selectDateRange(
    "1990", "06", "12",
    "2001", "11", "29");

    await page.pause();
    });

})
