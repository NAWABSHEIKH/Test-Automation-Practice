import { Locator,Page } from "@playwright/test";
import { Home } from "./Home";

export class Upload extends Home{
    public readonly singleUpload:Locator;
    public readonly multipleUpload:Locator;
    public readonly folderPath:string;

    constructor(page:Page){
        super(page);
        this.singleUpload=page.locator('#singleFileInput');
        this.multipleUpload=page.locator('#multipleFilesInput');
        this.folderPath="C:\\Users\\dawoo\\OneDrive\\Desktop\\PracticeDemoPW\\FolderAttachment";
    }

    async singleUploadFile(path:string):Promise<void>{
         let finalPath:string=this.folderPath+"\\"+path;
         await this.singleUpload.setInputFiles(finalPath);
    }

    async multipleUploadFile(path:string[]):Promise<void>{
        const finalPath:string[]=path.map(fileName=>(this.folderPath+"\\"+fileName));
        await this.multipleUpload.setInputFiles(finalPath);
    }
}