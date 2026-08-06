import { Home } from "./Home";
import { Locator,Page } from "@playwright/test";

/** Count hover element visible,hover element, move and check visiblilty
 * <button class="dropbtn">Point Me</button>
 * .dropbtn
*/

export class HiddenElementAndAjax extends Home{

    public readonly ajaxTitle:Locator;
    public readonly ajaxContainer:Locator;
    public readonly ajaxInput1:Locator;
    public readonly ajaxInput2:Locator;
    public readonly ajaxCheckbox1:Locator;
    public readonly ajaxCheckbox2:Locator;
    public readonly toggleInput2:Locator;
    public readonly toggleCheckbox2:Locator;
    public readonly loadAjaxContent:Locator;
    public readonly toggleStatus:Locator;

    public readonly ajaxContentBox:Locator;


    constructor(page:Page){
        super(page);
        this.ajaxTitle=page.locator('[itemprop="name"]');
        this.ajaxContainer=page.locator('//div[@id="container"]');
        this.ajaxInput1=this.ajaxContainer.locator('//input[@id="input1"]');
        this.ajaxInput2=this.ajaxContainer.locator('//input[@id="input2"]');
        this.ajaxCheckbox1=this.ajaxContainer.locator('//input[@id="checkbox1"]');
        this.ajaxCheckbox2=this.ajaxContainer.locator('//input[@id="checkbox2"]');
        this.toggleInput2=page.getByRole("button",{name:"Toggle Input Box 2"});
        this.toggleCheckbox2=page.getByRole("button",{name:"Toggle Checkbox 2"});
        this.loadAjaxContent=page.getByRole("button",{name:"Load AJAX Content"});
        this.toggleStatus=this.ajaxContainer.locator('//span[@id="statusLabel"]');
        this.ajaxContentBox=page.locator('//div[@id="ajaxContent"]');

    }
 
    async clickAndCheckAjaxContent():Promise<string>{

    console.log(`Before`);    

       await this.loadAjaxContent.click();
   //Important line,  wait base on function.
    await this.page.waitForFunction(() => {
    return document.querySelector("#statusLabel")?.textContent?.includes("AJAX content loaded");
});
       console.log(await this.getHiddenElementStatus());
       console.log(`After`);  
       return await this.getHiddenElementStatus();
    }

    async getHiddenElementStatus():Promise<string>{
        return (await this.toggleStatus.textContent())!;
    }

    async getTitle():Promise<string>{
         const title:string=(await this.ajaxTitle.textContent())!;
         return title;
    }
    async hiddenAjaxElement():Promise<string[]>{
     let addBooleanValue:string[]=[];   
     const title:string=(await this.ajaxTitle.textContent())!;
     console.log(title);

    //  console.log(await this.ajaxInput2.isVisible());
     await this.toggleInput2.click();
     
     const messageInput2:string=await this.getHiddenElementStatus();
    //  console.log(await this.ajaxInput2.isVisible());

    //  console.log(await this.ajaxCheckbox2.isVisible());
     await this.toggleCheckbox2.click();
     const messageChecbox2:string=await this.getHiddenElementStatus();
    //  console.log(await this.ajaxCheckbox2.isVisible());

     addBooleanValue.push(messageInput2);
     addBooleanValue.push(messageChecbox2);


     return addBooleanValue;
               
   }
}