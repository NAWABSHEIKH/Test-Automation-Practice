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

    /** 1. table.getProcessOccupyValue("Memory (MB)","Firefox")   table.getProcessMessage("Memory","Firefox"))
     *  2. CPU Chrome       (await table.getProcessMessage("CPU","Chrome"))! (await table.getProcessOccupyValue("CPU (%)","Chrome"))!
     *  3. Network Chrome  (await table.getProcessOccupyValue("Network (Mbps)","Chrome"))!  (await table.getProcessMessage("Network","Chrome"))!
     *  4. Disk Firefox    (await table.getProcessOccupyValue("Disk (MB/s)","Firefox")) (await table.getProcessMessage("Disk","Firefox"))!
     */

    test("2. Dynamic Table",async({page})=>{
        table=new Table(page);
       const rowValue:string= (await table.getProcessOccupyValue("CPU (%)","Chrome"))!;
        const paraValue:string=(await table.getProcessMessage("CPU","Chrome"))!;
        expect(rowValue).toBeTruthy();
        expect(rowValue).toBe(paraValue);
    })

     test("3. Pagination Table",async({page})=>{
        table=new Table(page);
        const products:string[]=["Wireless Earbuds","Action Camera","Portable Charger","Soundbar","Laptop"];
        await table.selectProductFromTable(products);
    })

})