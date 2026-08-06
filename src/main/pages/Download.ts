import { Locator, Page,expect} from "@playwright/test";
import { Home } from "./Home"; 

export class Download extends Home{

    public readonly downloadTitle:Locator;
    public readonly textInput:Locator;
    public readonly ClickFileDownloadBtn:Locator;
    public readonly downloadFileLink:Locator;
    public readonly ClickPDFDownloadBtn:Locator;
    public readonly downloadPDFLink:Locator;
    public readonly downloadBrowserPDFLink:Locator;
    public path:string;


    constructor(page:Page){
        super(page);
        this.downloadTitle=page.getByRole("heading",{name:"Download Files"});
        this.textInput=page.locator("#inputText");
        this.ClickFileDownloadBtn=page.getByRole("button",{name:"Generate and Download Text File"});
        this.downloadFileLink=page.getByRole("link",{name:"Download Text File"});

        this.ClickPDFDownloadBtn=page.getByRole("button",{name:"Generate and Download PDF File"});
        this.downloadPDFLink=page.getByRole("link",{name:"Download PDF File"});

        this.downloadBrowserPDFLink=page.getByRole("button",{name:"Download PDF File",exact:true});
        this.path="C:\\Users\\dawoo\\OneDrive\\Desktop\\PracticeDemoPW\\FolderAttachment";
    }

    async downloadTextFile(text:string):Promise<string>{
        await this.downloadTitle.scrollIntoViewIfNeeded();
        await this.textInput.fill(text);
        await this.ClickFileDownloadBtn.click();
        const downloadPromise=this.page.waitForEvent("download");
        await this.downloadFileLink.click();
        const download=await downloadPromise;
        console.log(download.suggestedFilename());
        await download.saveAs(`${this.path}/${download.suggestedFilename()}`);

        return download.suggestedFilename();
    }

    async downloadPDFFile(text:string):Promise<string>{
       await this.downloadTitle.scrollIntoViewIfNeeded();
       await this.textInput.fill(text);
       await this.ClickPDFDownloadBtn.click();
       const downloadPromise=this.page.waitForEvent("download");
       await this.downloadPDFLink.click();
       const download=await downloadPromise;
       console.log(download.suggestedFilename());
       await download.saveAs(`${this.path}/${download.suggestedFilename()}`);

       return download.suggestedFilename();

    }

    async downloadPDFViaBrowser():Promise<string>{
        await this.downloadBrowserPDFLink.scrollIntoViewIfNeeded();
        const tabPromise=this.page.waitForEvent("popup");
        await this.downloadBrowserPDFLink.click();
       // const tabPage=await tabPromise;
        const popup = await tabPromise;
        await popup.waitForLoadState('load');
        console.log(await popup.title());
        return popup.url();
    }

}