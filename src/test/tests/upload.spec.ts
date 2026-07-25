import { Form } from "../../main/pages/Form";
import { Page,test } from "@playwright/test";
import { Upload } from "../../main/pages/Upload";

test.describe("Upload single and multiple files",()=>{
    let form:Form;
    let uploadFile:Upload;
    test.beforeEach("Opening the Website",async ({page})=>{
    form=new Form(page);
    await form.openUrl();
    })

    test("1. Single Upload",async({page})=>{
        uploadFile=new Upload(page);
        await uploadFile.singleUploadFile("IsrafilBannner.png");
    })

    test("2. Multiple File Upload",async({page})=>{
        uploadFile=new Upload(page);
        await uploadFile.multipleUploadFile(["IsrafilBannner.png","IsrafilBannner_Final.png","NewImage.png","QARoadMap.jpg"]);
        await page.pause();
    })

})