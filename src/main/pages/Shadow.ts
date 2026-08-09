import { Locator,Page } from "@playwright/test";
import { Home } from "./Home";

export class Shadow extends Home{

    public readonly shadowDomRoot:Locator;
    public addFiles:string;

    constructor(page:Page){
        super(page);
        this.shadowDomRoot=page.locator("#HTML16");
        this.addFiles="C:\\Users\\dawoo\\OneDrive\\Desktop\\PracticeDemoPW\\FolderAttachment\\QARoadMap.jpg"

    }

    async showdowDomContent(inputValue:string):Promise<string>{
        await this.shadowDomRoot.getByRole("heading",{name:"ShadowDOM"}).scrollIntoViewIfNeeded();
        const headingVisible:boolean=await this.shadowDomRoot.getByRole("heading",{name:"ShadowDOM"}).isVisible();
        const mobileVisible:boolean=await this.shadowDomRoot.getByText("Mobiles").isVisible();

        const laptopVisible:boolean=await this.shadowDomRoot.locator("#nested_shadow_content>div").isVisible();

        console.log(`${headingVisible},${mobileVisible},${laptopVisible},`);

        const blog:Locator=this.shadowDomRoot.getByRole("link",{name:"Blog"});
        console.log(await blog.isVisible());
        await this.page.waitForLoadState("domcontentloaded");
        await blog.click();
        console.log(await this.page.title())
        await this.page.goBack();
        console.log(await this.page.title())
        await this.shadowDomRoot.locator('input[type="text"]').fill(inputValue);
        await this.shadowDomRoot.locator('input[type="checkbox"]').click();
        await this.shadowDomRoot.locator('input[type="file"]').setInputFiles(this.addFiles);

        await this.page.waitForLoadState("domcontentloaded");
        const youtube:Locator= this.shadowDomRoot.getByRole("link",{name:"Youtube"});
    
        await youtube.click();

        await this.page.waitForURL("**youtube.com/**");
        const youtubeTitle:string=await this.page.title()
        console.log(await this.page.title());
        await this.page.goBack();
         console.log(await this.page.title());
         return  youtubeTitle;
         





        
    }
}