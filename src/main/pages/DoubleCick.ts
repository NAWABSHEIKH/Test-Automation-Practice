import { Home } from "./Home";
import { Locator,Page } from "@playwright/test";

export class DoubleClick extends Home{

    public doubleClickHeading:Locator;
    public firstField1:Locator;
    public secondField2:Locator;
    public doubleCopyText:Locator;

    constructor(page:Page){
        super(page);
        this.doubleClickHeading=page.getByRole("heading",{name:'Double Click'});
        this.firstField1=page.locator("#field1");
        this.secondField2=page.locator("#field2");
        this.doubleCopyText=page.getByRole("button",{name:'Copy Text'});
    }

    async doubleClick():Promise<string>{

        await this.doubleClickHeading.scrollIntoViewIfNeeded();
        const fieldMsg1:string=(await this.firstField1.getAttribute("value"))!;
        console.log(fieldMsg1);
        await this.doubleCopyText.dblclick();
        console.log(await this.secondField2.evaluate(el => el.outerHTML));
        const fieldMsg2:string=await this.secondField2.inputValue();
        console.log(fieldMsg2);

        return fieldMsg2;

    }


 


}