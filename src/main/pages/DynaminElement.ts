import { Locator,Page } from "@playwright/test";
import { Home } from "./Home";

export class DynamicElement extends Home{
    public readonly searchBox:Locator;
    public readonly searchBtn:Locator;
    public readonly searchResult:Locator


    constructor(page:Page){
        super(page);
        this.searchBox=page.locator("#Wikipedia1_wikipedia-search-input");
        this.searchBtn=page.locator(".wikipedia-search-button");
        this.searchResult=page.locator("#wikipedia-search-result-link");
    }

    async searchAndFind(search:string):Promise<string|void>{
        await this.searchBox.scrollIntoViewIfNeeded();
        await this.searchBox.fill(search);
        await this.searchBtn.click();
        let allResult:Locator=this.searchResult.locator("a");
        await allResult.first().waitFor();
        let resultCount:number=await allResult.count();
        console.log(resultCount);

        for(let i=0;i<resultCount;i++){
            const matchingResult:string=(await allResult.nth(i).textContent())!;
            if(matchingResult===search){
                const childPagePromise=this.page.waitForEvent("popup");
                await allResult.nth(i).click();
                const childPage=await childPagePromise;
                await childPage.waitForLoadState("load");
                console.log(await childPage.title());

                return await childPage.title();
            }
        }
        

    }

}