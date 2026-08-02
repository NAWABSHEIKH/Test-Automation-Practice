import {test,expect} from "@playwright/test";
import { Home } from "../../main/pages/Home";
import { MouseHover } from "../../main/pages/MouseHover";

test.describe("Mouse Hover",async()=>{
    let mouseHover:MouseHover
    test.beforeEach("Open the URL",async({page})=>{
    mouseHover=new MouseHover(page);
    await mouseHover.openUrl();
    })
    test("Hover on Point me.",async ({page})=>{
    mouseHover=new MouseHover(page);
    const totalELement:number=(await mouseHover.hoverAndVisibleElement())!;
    console.log(totalELement);
    expect(totalELement).toEqual(2);
    })
})
