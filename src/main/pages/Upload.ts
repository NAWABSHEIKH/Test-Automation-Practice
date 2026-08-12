import path from "path";
import { Locator, Page } from "@playwright/test";
import { Home } from "./Home";

export class Upload extends Home {
    public readonly singleUpload: Locator;
    public readonly multipleUpload: Locator;
    public readonly attachmentDir: string;

    constructor(page: Page) {
        super(page);
        this.singleUpload = page.locator("#singleFileInput");
        this.multipleUpload = page.locator("#multipleFilesInput");
        this.attachmentDir = path.resolve(process.cwd(), "FolderAttachment");
    }

    async singleUploadFile(fileName: string): Promise<void> {
        const finalPath = path.join(this.attachmentDir, fileName);
        await this.singleUpload.setInputFiles(finalPath);
    }

    async multipleUploadFile(fileNames: string[]): Promise<void> {
        const finalPaths = fileNames.map((fileName) => path.join(this.attachmentDir, fileName));
        await this.multipleUpload.setInputFiles(finalPaths);
    }

    async getSingleUploadedFileCount(): Promise<number> {
        return this.singleUpload.evaluate((element) => {
            const input = element as HTMLInputElement;
            return input.files?.length ?? 0;
        });
    }

    async getMultipleUploadedFileCount(): Promise<number> {
        return this.multipleUpload.evaluate((element) => {
            const input = element as HTMLInputElement;
            return input.files?.length ?? 0;
        });
    }
}