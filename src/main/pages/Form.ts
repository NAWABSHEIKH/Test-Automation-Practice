import { Locator,Page } from "@playwright/test";
import { Home } from "./Home";

export class Form extends Home{

    public readonly name:Locator;
    public readonly email:Locator;
    public readonly address:Locator;
    public readonly phone:Locator;
    public readonly genderAndDays:Locator;
    public readonly country:Locator;
    public readonly color:Locator;
    public readonly animals:Locator;
    public readonly date1:Locator;
    public readonly date2:Locator;
    public readonly selectMonth:Locator;
    public readonly selectYear:Locator;
    public readonly selectDate:Locator;

    constructor(page:Page){
        super(page);
        this.name=page.locator("#name");
        this.email=page.locator("#email");
        this.address=page.locator("#phone");
        this.phone=page.locator("#textarea");
        this.genderAndDays=page.locator(".form-check>input");
        this.country=page.locator("#country");
        this.color=page.locator("#colors");
        this.animals=page.locator("#animals");
        this.date1=page.locator("#datepicker");

        this.date2=page.locator("#txtDate");
        this.selectMonth=page.locator('[class="ui-datepicker-month"]');
        this.selectYear=page.locator('[class="ui-datepicker-year"]');
        this.selectDate=page.locator('.ui-datepicker-calendar>tbody>tr>td');




    }

    async fillUserName(name:string):Promise<void>{
        await this.name.fill(name);
    }

    async fillUserEmail(name:string):Promise<void>{
        await this.email.fill(name);
    }

    async fillUserAddress(name:string):Promise<void>{
        await this.address.fill(name);
    }

    async fillUserPhone(name:string):Promise<void>{
        await this.phone.fill(name);
    }

    async selectGender(gender:string):Promise<void>{
        for(let i=0;i<await this.genderAndDays.count();i++){
            let value=await this.genderAndDays.nth(i).getAttribute("id");
            if(value===gender){
                await this.genderAndDays.nth(i).click();
                break;
            }
        }
    }


     async selectDays(days:string[]):Promise<void>{
        for(let j=0;j<await this.genderAndDays.count();j++){
            let value=await this.genderAndDays.nth(j).getAttribute("id");
            for(let i=0;i<days.length;i++){
                if(value===days[i]){
                    await this.genderAndDays.nth(j).click();
                }
            }
        }
    }

    async selectCountry(country:string):Promise<void>{
        await this.country.click();
        await this.country.selectOption(country);
    }

    async selectColor(colors:string[]):Promise<void>{
       // Playwright natively handles multi-select arrays on <select> tags
  // This replaces your entire loop and safely checks the options
  await this.color.selectOption(colors);

  // If you still want to log what was available in the dropdown:
  const allColors = await this.color.locator('option').allTextContents();
  console.log("Available options in dropdown:", allColors.map(c => c.trim()));    
    }

    async sortAnimals(animals:string[]):Promise<void>{
        await this.animals.selectOption(animals);

        // If you still want to log what was available in the dropdown:
  const allAnimals = await this.animals.locator('option').allTextContents();
  console.log("Available options in dropdown:", allAnimals.map(c => c.trim()));
    }

    async datePicker1(){

    }

    async datePicker2(datePass:string):Promise<void>{
        await this.date2.click();
        await this.selectMonth.selectOption("Dec");
        await this.selectYear.selectOption("2036");

        for(let i=0;i<await this.selectDate.count();i++){
            let date=await this.selectDate.nth(i).textContent();
            if(date==datePass){
                await this.selectDate.nth(i).click();
                break;
            }
        }


    }


}