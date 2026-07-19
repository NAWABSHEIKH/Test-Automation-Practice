import { Page } from "@playwright/test";
import { BasePage } from "../base/BasePage";

export class Home extends BasePage{

    constructor(page:Page){
        super(page);
    }

    async openUrl():Promise<void>{
        await this.page.goto('https://testautomationpractice.blogspot.com/');
    }
}