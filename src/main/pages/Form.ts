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
    public readonly monthTitle:Locator;
    public readonly nextMonthArrow:Locator;
    public readonly startDate:Locator;
    public readonly endDate:Locator;
    public readonly submitBtn:Locator;

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
        this.monthTitle=page.locator('[class="ui-datepicker-month"]')
        this.nextMonthArrow=page.locator('[data-handler="next"]');

        this.date2=page.locator("#txtDate");
        this.selectMonth=page.locator('[class="ui-datepicker-month"]');
        this.selectYear=page.locator('[class="ui-datepicker-year"]');
        this.selectDate=page.locator('.ui-datepicker-calendar>tbody>tr>td');

        this.startDate=page.getByPlaceholder("Start Date");
        this.endDate=page.getByPlaceholder("End Date");
        this.submitBtn=page.locator('#post-body-1307673142697428135').getByRole('button', { name: 'Submit' });




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

    async datePicker1(month:string,datePass:string):Promise<void>{
        await this.date1.click();
        let currectMonth:string=await this.monthTitle.innerText();
        // console.log(`Current Month ${currectMonth}`)
        while(currectMonth!=month){
            await this.nextMonthArrow.click();
            currectMonth=await this.monthTitle.innerText();
            // console.log(`Current Month ${currectMonth}`)
        }

        for(let i=0;i<await this.selectDate.count();i++){
            let date=await this.selectDate.nth(i).textContent();
            if(date==datePass){
                await this.selectDate.nth(i).click();
                break;
            }
        }


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

    async selectDateRange(startYear:string,startMonth:string,startDay:string,
                         endYear:string,endMonth:string,endDay:string):Promise<void>{
            const start=`${startYear}-${startMonth}-${startDay}`;
            const end=`${endYear}-${endMonth}-${endDay}`;

            await this.startDate.fill(start);
            await this.endDate.fill(end);    
            await this.submitBtn.click();  
    }



    


}