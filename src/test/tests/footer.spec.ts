import { expect, test } from "@playwright/test";
import { Home } from "../../main/pages/Home";
import { Footer } from "../../main/pages/Footer";
import { HiddenElementAndAjax } from "../../main/pages/HiddenElementAndAjax";
import { Download } from "../../main/pages/Download";
test.describe("Footer Section",async ()=>{

    let home:Home;
    let footer:Footer;
    let ajaxHiddenElement:HiddenElementAndAjax;
    let download:Download;
    test.beforeEach("Setting up the website.",async ({page})=>{
        home=new Home(page);
        await home.openUrl();

    })

    test("1. Click Home footer link.",async({page})=>{
      footer=new Footer(page);
      home=new Home(page);
      console.log(await footer.locateAndClickFooterLink("Home"));
      expect(await home.headerTitle()).toMatch(/Automation Testing Practice/i);
      console.log(await home.headerTitle());
    })

    test("2. Click Ajax footer link.",async({page})=>{
      footer=new Footer(page);
      home=new Home(page);
      ajaxHiddenElement=new HiddenElementAndAjax(page);
      console.log(await footer.locateAndClickFooterLink("Hidden Elements & AJAX"));
      expect(await ajaxHiddenElement.getTitle()).toMatch(/Hidden Elements & AJAX/i);
      console.log("========================================");
      let statusValue:string[]=await ajaxHiddenElement.hiddenAjaxElement();

      console.log(statusValue);
      expect(statusValue[0]).toMatch(/Input Box 2 shown/i);
      expect(statusValue[1]).toMatch(/Checkbox 2 shown/i);

      expect(await ajaxHiddenElement.clickAndCheckAjaxContent()).toMatch(/AJAX content loaded/i);

    })

    test("3. Click Ajax footer link.",async({page})=>{
      footer=new Footer(page);
      home=new Home(page);
      download=new Download(page);
      await footer.locateAndClickFooterLink("Download Files");
      const textFile:string=await download.downloadTextFile("Random Stirng"); 
      const textPDF:string=await download.downloadPDFFile("Download PDF"); 
      const url:string=await download.downloadPDFViaBrowser();   
      expect(textFile).toContain(".txt");
      expect(textPDF).toContain(".pdf");
      expect(url).toContain("blob:"); 
    })

})