import path from "path";
import { Locator, Page } from "@playwright/test";
import { Home } from "./Home";

export class Shadow extends Home {
    public readonly shadowDomRoot: Locator;
    public addFiles: string;

    constructor(page: Page) {
        super(page);
        this.shadowDomRoot = page.locator("#HTML16");
        this.addFiles = path.resolve(process.cwd(), "FolderAttachment", "QARoadMap.jpg");
    }

    async showdowDomContent(inputValue: string): Promise<string> {
        await this.shadowDomRoot.getByRole("heading", { name: "ShadowDOM" }).scrollIntoViewIfNeeded();
        const headingVisible = await this.shadowDomRoot.getByRole("heading", { name: "ShadowDOM" }).isVisible();
        const mobileVisible = await this.shadowDomRoot.getByText("Mobiles").isVisible();
        const laptopVisible = await this.shadowDomRoot.locator("#nested_shadow_content>div").isVisible();

        if (!headingVisible || !mobileVisible || !laptopVisible) {
            throw new Error("Shadow DOM content was not rendered as expected.");
        }

        const blog: Locator = this.shadowDomRoot.getByRole("link", { name: "Blog" });
        await this.page.waitForLoadState("domcontentloaded");
        await blog.click();
        await this.page.goBack();
        await this.shadowDomRoot.locator('input[type="text"]').fill(inputValue);
        await this.shadowDomRoot.locator('input[type="checkbox"]').click();
        await this.shadowDomRoot.locator('input[type="file"]').setInputFiles(this.addFiles);

        await this.page.waitForLoadState("domcontentloaded");
        const youtube: Locator = this.shadowDomRoot.getByRole("link", { name: "Youtube" });

        await youtube.click();
        await this.page.waitForURL("**youtube.com/**");
        const youtubeTitle = await this.page.title();
        await this.page.goBack();
        return youtubeTitle ?? "";
    }
}