import { Page, expect } from "@playwright/test";

export const getHmoprovider = async (page: Page) => {
  const selectInput = page.locator("#react-select-30-input, .modal-select__control").first();
  await selectInput.click();
  // Wait for the listbox container
  const listBox = page.getByText('Adeshola ShopejuANCHORAvonPro');
  await expect(listBox).toBeVisible();

  // Collect all option texts
  const options = await listBox.locator(".modal-select__option").allTextContents();
  const HMO = options.map(opt => opt.trim()).filter(Boolean);

  if (HMO.length === 0) {
    throw new Error("No HMO found in the listbox");
  }

  // Pick a random one
  const HMOindex = Math.floor(Math.random() * HMO.length);
  const HMOname = HMO[HMOindex];

  console.log("Random HMO:", HMOname);
  return HMOname;
};
