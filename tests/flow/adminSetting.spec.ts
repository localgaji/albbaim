import test, { expect } from '@playwright/test';
import { addGroup } from '../testCode/admin/addGroupTest';
import { kakaoLogin, signup } from '../testCode/loginTest';

require('dotenv').config();

const [mail, pw] = [process.env.KAKAO_MAIL, process.env.KAKAO_PW];

test.describe('매니저 설정', () => {
  test('매니저 가입 + 그룹 설정', async ({ page, baseURL }) => {
    await kakaoLogin({ page, baseURL, mail, pw });

    await page.waitForTimeout(1000);
    if (page.url().includes('signup')) {
      await signup({ page, baseURL });
    }

    await addGroup({ page, baseURL });

    await page.getByRole('button', { name: '메인으로 이동' }).click();

    const invite = page.getByRole('button', { name: '초대링크 발급받기' });
    await expect(invite).toBeVisible();

    await invite.click();
    await expect(page.getByRole('button', { name: '복사하기' })).toBeVisible();
  });
});
