import { expect, test } from "@playwright/test";
import { Form } from "../../main/pages/Form";
import { Upload } from "../../main/pages/Upload";

test.describe("Upload single and multiple files", () => {
    let form: Form;
    let uploadFile: Upload;

    test.beforeEach("Opening the Website", async ({ page }) => {
        form = new Form(page);
        await form.openUrl();
    });

    test("1. Single Upload", async ({ page }) => {
        uploadFile = new Upload(page);
        await uploadFile.singleUploadFile("QARoadMap.jpg");
        const uploadedFileCount = await uploadFile.getSingleUploadedFileCount();
        expect(uploadedFileCount).toBe(1);
    });

    test("2. Multiple File Upload", async ({ page }) => {
        uploadFile = new Upload(page);
        await uploadFile.multipleUploadFile(["QARoadMap.jpg", "info.txt", "QARoadMap.jpg"]);
        const uploadedFileCount = await uploadFile.getMultipleUploadedFileCount();
        expect(uploadedFileCount).toBe(3);
    });
});