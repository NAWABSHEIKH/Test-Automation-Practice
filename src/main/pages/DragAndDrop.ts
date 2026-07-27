import { Home } from "./Home";
import { Locator,Page } from "@playwright/test";

export class DragAndDrop extends Home{

    public readonly srcBox:Locator;
    public readonly tarBox:Locator;

    public readonly srcBox1:string;
    public readonly tarBox1:string;

    constructor(page:Page){
        super(page);
        this.srcBox=page.locator("#draggable");
        this.tarBox=page.locator("#droppable");

        this.srcBox1="#draggable";
        this.tarBox1="#droppable";


    }

    async getDroppableMsg():Promise<string>{
        const message:string=(await this.tarBox.locator("p").textContent())!;
        return message;
    }

    async moveTheBox():Promise<void>{
        await this.srcBox.scrollIntoViewIfNeeded();
        await this.srcBox.dragTo(this.tarBox);
        //await this.page.dragAndDrop(this.srcBox1,this.tarBox1);

    }
     
}