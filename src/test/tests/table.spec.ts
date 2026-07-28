import {test,Page, expect} from '@playwright/test';
import { Table } from '../../main/pages/Table';
import { Home } from '../../main/pages/Home';

test.describe("All Table",async()=>{

    let home:Home;
    test.beforeEach("Open Url",async({page})=>{
        home=new Home(page);
        await home.openUrl();
    })

    let table:Table;
    test("1. Static Web Table",async({page})=>{
        table=new Table(page);
        const userInfo:[string,string][]=await table.getBKnameAndPrice("Amit");
        // for(let i=0;i<=userInfo.length;i++){
        //     console.log(userInfo);
        // }
        expect(Number(userInfo.length)).toBeGreaterThan(0);
       
    })

})