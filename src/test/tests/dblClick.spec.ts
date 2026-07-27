import { expect, test } from "@playwright/test";
import { Home } from "../../main/pages/Home";
import { DoubleClick } from "../../main/pages/DoubleCick";
test.describe("Double Click",async ()=>{

    let home:Home;
    let dblClick:DoubleClick;
    test.beforeEach("Setting up the website.",async ({page})=>{
        home=new Home(page);
        await home.openUrl();

    })

    test("Double Click to copy the text.",async({page})=>{
      dblClick=new DoubleClick(page);
      const message=await dblClick.doubleClick();
      expect(message).toMatch(/Hello World/i);
      console.log(message);
    })

})