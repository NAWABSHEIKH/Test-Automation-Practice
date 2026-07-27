import { expect, test } from "@playwright/test";
import { Home } from "../../main/pages/Home";
import { DragAndDrop } from "../../main/pages/DragAndDrop";
test.describe("Drag and Drop",async ()=>{

    let home:Home;
    let dragDrop:DragAndDrop;
    test.beforeEach("Setting up the website",async ({page})=>{
        home=new Home(page);
        await home.openUrl();

    })

    test("Dragging to target location",async({page})=>{
      dragDrop=new DragAndDrop(page);
      console.log(await dragDrop.getDroppableMsg());
      await dragDrop.moveTheBox();
      const validateMessage:string=await dragDrop.getDroppableMsg();
      console.log(await dragDrop.getDroppableMsg());
      expect(validateMessage).toMatch(/Dropped!/i);
    })

})