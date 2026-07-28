import {Locator,Page} from '@playwright/test';
import { Home } from './Home';

export class Table extends Home{

    /** This is for static web table. */
    public readonly staticHeading:Locator;
    public readonly  staticRowData:Locator;

    constructor(page:Page){
        super(page);
        this.staticHeading=page.getByRole("heading",{name:'Static Web Table'});
        this.staticRowData=page.locator("[name=BookTable]>tbody>tr");
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



