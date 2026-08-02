import { Home } from "./Home";
import { Locator,Page } from "@playwright/test";

/** Count hover element visible,hover element, move and check visiblilty
 * <button class="dropbtn">Point Me</button>
 * .dropbtn
*/

export class MouseHover extends Home{

    public readonly mouseHoverHeading:Locator;
    public readonly pointMeBtn:Locator;
    public readonly hoverContent:Locator;


    constructor(page:Page){
        super(page);
        this.mouseHoverHeading=page.getByRole("heading",{name:'Mouse Hover'});
        // this.pointMeBtn=page.getByRole("button",{name:"Point Me"});
        this.pointMeBtn=page.locator(".dropbtn");
        this.hoverContent=page.locator(".dropdown-content");
    }

    async hoverAndVisibleElement():Promise<number>{
        await this.mouseHoverHeading.scrollIntoViewIfNeeded();
        let totalElement:number=0;
        // await this.page.waitForTimeout(3000);
        await this.pointMeBtn.hover();
       if( await this.hoverContent.isVisible()){
         totalElement=await this.hoverContent.locator("a").count();
       }
       await this.page.mouse.move(0,0);
       console.log( await this.hoverContent.isVisible());
       return totalElement;
    }
}