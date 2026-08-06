import { Locator, Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class Home extends BasePage{

    public readonly title:Locator;
    constructor(page:Page){
        super(page);
        this.title=page.locator("//div[@id='header-inner']");
    }

    async headerTitle():Promise<string>{
       const title:string=(await this.title.locator("h1").innerText())!;
       return title;
    }

    async openUrl():Promise<void>{
        await this.page.goto('https://testautomationpractice.blogspot.com/');
    }


}