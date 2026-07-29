import {Locator,Page} from '@playwright/test';
import { Home } from './Home';

export class Table extends Home{

    /** This is for static web table. */
    public readonly staticHeading:Locator;
    public readonly  staticRowData:Locator;

    /**This is for Dynamic web table */
    public readonly dynamicHeading:Locator;
    public readonly dynamicTableHead:Locator;
    public readonly dynamicRowsData:Locator;

    /**This is for fetching message. */
    public readonly processMsg:Locator;

    constructor(page:Page){
        super(page);
        this.staticHeading=page.getByRole("heading",{name:'Static Web Table'});
        this.staticRowData=page.locator("[name=BookTable]>tbody>tr");

        this.dynamicHeading=page.getByRole("heading",{name:"Dynamic Web Table"});
        this.dynamicTableHead=page.locator("#taskTable>thead>tr>th");
        this.dynamicRowsData=page.locator("#taskTable>tbody>tr");

        this.processMsg=page.locator("#displayValues>p");
    }

    async getProcessMessage(process:string,browser:string):Promise<string|void>{

        const paraLength=await this.processMsg.count();
        console.log(`Total Length: ${paraLength}`);

        for(let i=0;i<paraLength;i++){
            const message=await this.processMsg.nth(i).textContent();
            console.log(message);

            if(message?.includes(process) && message.includes(browser)){
                let value:string=(await this.processMsg.locator("strong").nth(i).textContent())!;
                console.log(value);
                return value;

            }

        }


    }

    async getProcessOccupyValue(process:string,browser:string):Promise<string|void>{
        await this.dynamicHeading.scrollIntoViewIfNeeded();

        let value:string="";
        let rowsLength:number=await this.dynamicTableHead.count(); //5
        let columnLenght:number=await this.dynamicRowsData.count(); //4


        console.log(`${rowsLength}, ${columnLenght}`);

        for(let i=0;i<rowsLength;i++){
            const processName:string=(await this.dynamicTableHead.nth(i).textContent())!;
            console.log(`${i}.${processName}`);
            if(processName==process){
                for(let j=0;j<columnLenght;j++){
                    const browserName:string=(await this.dynamicRowsData.nth(j).locator("td").nth(0).textContent())!;
                    console.log(`${browserName}`);
                    if(browser==browserName){
                        value=(await this.dynamicRowsData.nth(j).locator("td").nth(i).textContent())!;
                        console.log(`Your searched Value ${value}`);
                        return value;
                    }
                    
                }
            }
           


        }


       
    }

    async getBKnameAndPrice(authorPass:string):Promise<[string,string][]>{
        const matchDeatils:[string,string][]=[];
        
        const length:number=await this.staticRowData.count();

        for(let i=1;i<length;i++){
  
            const author=(await this.staticRowData.nth(i).locator("td").nth(1).textContent())!;
            if(author===authorPass){
            const bookName:string= (await this.staticRowData.nth(i).locator("td").nth(0).textContent())!;
            const price:string=(await this.staticRowData.nth(i).locator("td").nth(3).textContent())!;

            matchDeatils.push([bookName,price]);
            }

        }

        return matchDeatils;
    }


}



