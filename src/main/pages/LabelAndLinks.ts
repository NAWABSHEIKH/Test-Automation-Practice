import {Locator,Page} from "@playwright/test";
import { Home } from "./Home";

export class LabelAndLinks extends Home{
    public readonly mobileLabelHeading:Locator;
    public readonly laptopLabelHeading:Locator;
    public readonly brokenLinkHeading:Locator;

    public readonly mobileLabelShown:Locator;
    public readonly laptopShown:Locator;

    public readonly brokenLinks:Locator;



    constructor(page:Page){
        super(page);
        this.mobileLabelHeading=page.getByRole("heading",{name:"Mobile Labels"});
        this.laptopLabelHeading=page.getByRole("heading",{name:"Laptop Links"});
        this.brokenLinkHeading=page.getByLabel("Broken Links",{exact:true});

        this.mobileLabelShown=page.locator("#mobiles");
        this.laptopShown=page.locator("#laptops");

        this.brokenLinks=page.locator("#broken-links");
    }

    async mobileModelPresence(mobiles:string[]):Promise<boolean>{
        await this.mobileLabelHeading.scrollIntoViewIfNeeded();
        const allLable:Locator= this.mobileLabelShown.locator("label");
        const mobilesSet=new Set(mobiles);
       // console.log(mobilesSet.size);
        for(let i=0;i<await allLable.count();i++){
            const currentMobile:string=(await allLable.nth(i).textContent())!;
            if(!mobiles.includes(currentMobile)){
                return false;
            }else{
                console.log(currentMobile);
                mobilesSet.delete(currentMobile);
            }
        }
        //console.log(mobilesSet.size);
        return true;
    }

    async clickLaptopLink(searchlaptop:string):Promise<string>{
        await this.laptopLabelHeading.scrollIntoViewIfNeeded();
        const allLaptops:Locator=this.laptopShown.locator("a");

        for(let i=0;i<await allLaptops.count();i++){
            const laptop:string=(await allLaptops.nth(i).textContent())!;
            if(laptop==searchlaptop){
                await allLaptops.nth(i).click();
                await this.page.waitForLoadState("domcontentloaded");
                return (await this.page.title());
            }
        }
        return "";
    }

    async verifyErrorLink(errorCode:string):Promise<string>{

        await this.brokenLinks.scrollIntoViewIfNeeded();
        const individualLinks:Locator=this.brokenLinks.locator("a");
        let pageTitle:string="";
        for(let i=0;i<await individualLinks.count();i++){
            const link:string= (await individualLinks.nth(i).textContent())!;
            if(link.includes(errorCode)){
                await this.page.waitForLoadState("domcontentloaded");
                await individualLinks.nth(i).click();
                console.log(await this.page.title());
                pageTitle=await this.page.title();
                break;   
            }
        }
        if(pageTitle===""){
            const bodyContent:string=(await this.page.locator("body").textContent())!;
            return bodyContent;
        }
        return pageTitle;

    }
     
}