import { Locator, Page } from "@playwright/test";
import { Home } from "./Home";
import { Form } from "./Form";

export class AlertPopup extends Home{

    public readonly simpleAlert:Locator;
    public readonly confirmationAlert:Locator;
    public readonly promtAlert:Locator;
    public readonly alertMessage:Locator;

    constructor(page:Page){
        super(page);
        this.simpleAlert=page.locator('[id="alertBtn"]');
        this.confirmationAlert=page.getByRole("button",{name:'Confirmation Alert'});
        this.promtAlert=page.getByRole("button",{name:'Prompt Alert'});
        this.alertMessage=page.locator('[id="demo"]');
    }

    async simpleAlertBtn():Promise<void>{
   
        this.page.on("dialog",async(dialog)=>{
          console.log(`1. ${dialog.type()}`);  
          console.log(dialog.defaultValue());
          await dialog.accept();
        })

        await this.simpleAlert.click();
        
    }

    async confirmAlertBtn(message:string):Promise<string>{

        this.page.on('dialog',async(dialog)=>{
            console.log(`2. ${dialog.type()}`); 
            console.log(dialog.defaultValue());
            if(message==='OK'){
                await dialog.accept();
            }else if(message==='Cancel'){
                await dialog.dismiss();
            }
        });

        await this.confirmationAlert.click();
        return (await this.alertMessage.textContent())!;


    }


    async promptAlertBtn(message:string): Promise<string> {

    this.page.on('dialog', async (dialog) => {
        console.log(`3. ${dialog.type()}`);
        console.log(dialog.type());
        console.log(dialog.message());
        await dialog.accept(message);
        console.log(dialog.defaultValue());
    });

    
    await this.promtAlert.click();
    return (await this.alertMessage.textContent())!;

    
}

}


