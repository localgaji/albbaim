import { expect } from '@playwright/test';

export const kakaoLogin = async ({ page, baseURL, mail, pw }) => {
  await page.goto(baseURL);
  const loginBtn = page.getByRole('button', { name: '카카오로 로그인하기' });
  await loginBtn.click();

  // 카카오 로그인
  await page.locator('#loginId--1').click();
  await page.locator('#loginId--1').fill(mail);

  await page.locator('#password--2').click();
  await page.locator('#password--2').fill(pw);

  const submitLocator = 'button.btn_g.highlight.submit';
  await page.locator(submitLocator).click();
  await page.waitForSelector(submitLocator, { state: 'hidden' });

  // 동의하기 발생 시
  if (baseURL && !page.url().includes(baseURL)) {
    await page.locator('#txt_accept_button_confirm').click();
  }
};

export const signup = async ({ page, baseURL, isAdmin = true }) => {
  if (isAdmin) {
    await page.getByRole('button', { name: '매니저로 시작하기' }).click();
  } else {
    await page.getByRole('button', { name: '알바생으로 시작하기' }).click();
  }

  await page.getByPlaceholder('이름').click();
  await page.getByPlaceholder('이름').fill('라이언');
  await page.getByText('약관동의 (필수)').click();
  await page.getByRole('button', { name: '가입 완료' }).click();

  await expect(page.getByLabel('메뉴')).toBeVisible();
};
