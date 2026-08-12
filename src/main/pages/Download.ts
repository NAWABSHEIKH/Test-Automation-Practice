import fs from "fs";
import path from "path";
import { Locator, Page } from "@playwright/test";
import { Home } from "./Home";

export class Download extends Home {
    public readonly downloadTitle: Locator;
    public readonly textInput: Locator;
    public readonly ClickFileDownloadBtn: Locator;
    public readonly downloadFileLink: Locator;
    public readonly ClickPDFDownloadBtn: Locator;
    public readonly downloadPDFLink: Locator;
    public readonly downloadBrowserPDFLink: Locator;
    public readonly downloadDir: string;

    constructor(page: Page) {
        super(page);
        this.downloadTitle = page.getByRole("heading", { name: "Download Files" });
        this.textInput = page.locator("#inputText");
        this.ClickFileDownloadBtn = page.getByRole("button", { name: "Generate and Download Text File" });
        this.downloadFileLink = page.getByRole("link", { name: "Download Text File" });

        this.ClickPDFDownloadBtn = page.getByRole("button", { name: "Generate and Download PDF File" });
        this.downloadPDFLink = page.getByRole("link", { name: "Download PDF File" });

        this.downloadBrowserPDFLink = page.getByRole("button", { name: "Download PDF File", exact: true });
        this.downloadDir = path.resolve(process.cwd(), "FolderAttachment", "downloads");
        fs.mkdirSync(this.downloadDir, { recursive: true });
    }

    async downloadTextFile(text: string): Promise<string> {
        await this.downloadTitle.scrollIntoViewIfNeeded();
        await this.textInput.fill(text);
        await this.ClickFileDownloadBtn.click();
        const downloadPromise = this.page.waitForEvent("download");
        await this.downloadFileLink.click();
        const download = await downloadPromise;
        const outputPath = path.join(this.downloadDir, download.suggestedFilename());
        await download.saveAs(outputPath);

        return download.suggestedFilename();
    }

    async downloadPDFFile(text: string): Promise<string> {
        await this.downloadTitle.scrollIntoViewIfNeeded();
        await this.textInput.fill(text);
        await this.ClickPDFDownloadBtn.click();
        const downloadPromise = this.page.waitForEvent("download");
        await this.downloadPDFLink.click();
        const download = await downloadPromise;
        const outputPath = path.join(this.downloadDir, download.suggestedFilename());
        await download.saveAs(outputPath);

        return download.suggestedFilename();
    }

    async downloadPDFViaBrowser(): Promise<string> {
        await this.downloadBrowserPDFLink.scrollIntoViewIfNeeded();
        const popupPromise = this.page.waitForEvent("popup", { timeout: 15000 });
        await this.downloadBrowserPDFLink.click();
        const popup = await popupPromise;
        await popup.waitForLoadState("load", { timeout: 15000 }).catch(() => undefined);
        const url = popup.url();
        if (!url || url === "about:blank") {
            try {
                return await popup.evaluate(() => location.href);
            } catch {
                return url;
            }
        }
        return url;
    }
}