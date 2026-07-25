import { test } from '@playwright/test';

test('Dialog Debug', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', async (dialog) => {
    console.log(dialog.message());
    await dialog.accept();
});

await page.getByRole('button', { name: 'Simple Alert' }).click();
    // page.on('dialog', async (dialog) => {
    //     console.log("Dialog Type:", dialog.type());
    //     console.log("Dialog Message:", dialog.message());

    //     await dialog.accept();
    // });

    // await page.getByRole('button', { name: 'Prompt Alert' }).click();

    // console.log("Click completed");
});