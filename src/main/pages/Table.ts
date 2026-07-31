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

    /**This is for pagination table */
    public readonly paginationTableHeading:Locator;
    public readonly productTableRow:Locator;
    public readonly totalPaginationInTable:Locator;


    constructor(page:Page){
        super(page);
        this.staticHeading=page.getByRole("heading",{name:'Static Web Table'});
        this.staticRowData=page.locator("[name=BookTable]>tbody>tr");

        this.dynamicHeading=page.getByRole("heading",{name:"Dynamic Web Table"});
        this.dynamicTableHead=page.locator("#taskTable>thead>tr>th");
        this.dynamicRowsData=page.locator("#taskTable>tbody>tr");

        this.processMsg=page.locator("#displayValues>p");

        /*---------------------------------------*/
        this.paginationTableHeading=page.getByRole("heading",{name:"Pagination Web Table"});
        this.productTableRow=page.locator("#productTable>tbody>tr");
        this.totalPaginationInTable=page.locator("#pagination>li>a");

    }

    async getSelectedProductFromTable():Promise<string[]>{
        await this.paginationTableHeading.scrollIntoViewIfNeeded();
        let tableRowLength=await this.productTableRow.count();
        let paginationLength=await this.totalPaginationInTable.count();
        let selectedProducts:string[]=[];

        console.log(`${tableRowLength}--> ${paginationLength} `);

        for(let i=1;i<paginationLength;){
            for(let j=0;j<tableRowLength;j++){
                const isSelectedProduct:boolean=(await this.productTableRow.nth(j).locator("td").nth(3).isEnabled())!;
                console.log(`${j}. ${isSelectedProduct} `);
                if(isSelectedProduct){
                 const product:string=(await this.productTableRow.nth(j).locator("td").nth(1).textContent())!;
                 selectedProducts.push(product);
                }
              
        }
        await this.totalPaginationInTable.nth(i++).click();
        // this.page.waitForEvent("domcontentloaded");
        }
        return selectedProducts;
        
    }

    async selectProductFromTable(products: string[]): Promise<void> {
    await this.paginationTableHeading.scrollIntoViewIfNeeded();
    const totalPages = await this.totalPaginationInTable.count();
    for (let page = 0; page < totalPages; page++) {
        // Don't click Page 1 because it is already open.
        if (page > 0) {
            await this.totalPaginationInTable.nth(page).click();
        }
        // Fetch row count for the current page.
        const rowCount = await this.productTableRow.count();
        for (let row = 0; row < rowCount; row++) {
            const productName = (
                await this.productTableRow
                    .nth(row)
                    .locator("td")
                    .nth(1)
                    .textContent()
            )?.trim();
            console.log(`Page ${page + 1} -> ${productName}`);
            if (productName && products.includes(productName)) {
                await this.productTableRow
                    .nth(row)
                    .locator("td")
                    .nth(3)
                    .locator("input")
                    .check();      // or click()
                console.log(`${productName} selected`);
            }
        }
    }
}

    // async selectProductFromTable(products:string[]):Promise<void>{
    //     await this.paginationTableHeading.scrollIntoViewIfNeeded();
    //     let tableRowLength=await this.productTableRow.count();
    //     let paginationLength=await this.totalPaginationInTable.count();

    //     console.log(`${tableRowLength}--> ${paginationLength} `);

    //     for(let i=0;i<paginationLength;){
    //        console.log(`${i}. pagination `);
    //         for(let j=0;j<tableRowLength;j++){
    //             const productName:string=(await this.productTableRow.nth(j).locator("td").nth(1).textContent())!;
    //             console.log(`${j}. ${productName} `);
    //             for(let product of products){
    //                 if(product==productName){
    //                 await this.productTableRow.nth(j).locator("td").nth(3).locator("input").click();
    //                 break;   
    //             }
    //         }
    //     }
    //     await this.totalPaginationInTable.nth(i++).click();
    //     // this.page.waitForEvent("domcontentloaded");
    //     }

    // }

    

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



