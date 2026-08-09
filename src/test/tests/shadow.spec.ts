import { expect,Page ,test} from "@playwright/test";
import { Home } from "../../main/pages/Home";
import { Shadow } from "../../main/pages/Shadow";

test.describe("Shadow Dom",async()=>{

    let home:Home;
    let shadow:Shadow;
    test.beforeEach("Launching the website",async({page})=>{
        home=new Home(page);
        await home.openUrl();

    })
    test("1.Verify shadow dom element",async({page})=>{
        shadow=new Shadow(page);
       const  title:string=await shadow.showdowDomContent("Random String");
       expect(title).toContain('SDET- QA')
       
        
    })
})