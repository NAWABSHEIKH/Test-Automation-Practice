import { Home } from "./Home";
import { Locator,Page } from "@playwright/test";

/** Count hover element visible,hover element, move and check visiblilty
 * <button class="dropbtn">Point Me</button>
 * .dropbtn
*/

export class Footer extends Home{

    public readonly footerSection:Locator;

    constructor(page:Page){
        super(page);
        this.footerSection=page.locator('//div[@id="PageList1"]');
    }

    async locateAndClickFooterLink(link:string):Promise<boolean>{
        console.log(await this.footerSection.locator("h2").textContent());
        let footerAllLink=this.footerSection.locator("a");
        let countFooterLink=await footerAllLink.count();

        for(let i=0;i<countFooterLink;i++){
            if((await footerAllLink.nth(i).textContent())==link){
             await footerAllLink.nth(i).click();
             await this.page.waitForEvent("domcontentloaded");
             return true;
            }
        }
        return false;

    }
}