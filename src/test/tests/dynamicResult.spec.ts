import {expect, test} from "@playwright/test";
import { DynamicElement } from "../../main/pages/DynaminElement";

test.describe("Dynamic Element",async()=>{
    let dynamicElement:DynamicElement;
    test.beforeEach("Open the URL",async({page})=>{
    dynamicElement=new DynamicElement(page);
    await dynamicElement.openUrl();
    })
    test("Dynamic searching.",async ({page})=>{
    dynamicElement=new DynamicElement(page);
    const fetchValue:string=(await dynamicElement.searchAndFind("Shah Rukh Khan"))!;
    expect(fetchValue).toMatch(/Shah Rukh Khan/i);
    })
})