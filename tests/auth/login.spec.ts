import test, { expect } from '@playwright/test';
import { mockMapper, mockResponse } from '../mock/mockResponse';
import { loginErrorBody, loginHeader, loginSuccessBody } from '../mock/responseBody/auth';
import { getMyinfoNoGroup } from '../mock/responseBody/getMyInfo';
import { kakaoLogin, signup } from './../testCode/loginTest';
require('dotenv').config();

const [mail, pw] = [process.env.KAKAO_MAIL, process.env.KAKAO_PW];

test.beforeEach(async ({ page }) => {
  await mockMapper({ page: page, url: 'workplace', method: 'GET', response: mockResponse(getMyinfoNoGroup) });
});

test.describe('로그인/회원가입', () => {
  test('로그인', async ({ page, baseURL }) => {
    await mockMapper({
      page,
      url: `auth/login`,
      method: 'POST',
      response: mockResponse(loginSuccessBody, 200, loginHeader),
    });

    await kakaoLogin({ page, baseURL, mail, pw });

    await expect(page.getByLabel('메뉴')).toBeVisible();
  });

  test('회원가입', async ({ page, baseURL }) => {
    await mockMapper({
      page,
      url: `auth/kakao/login`,
      method: 'POST',
      response: mockResponse(loginErrorBody, 404),
    });
    await mockMapper({
      page,
      url: `auth/kakao/join`,
      method: 'POST',
      response: mockResponse(loginSuccessBody, 200, loginHeader),
    });

    await kakaoLogin({ page, baseURL, mail, pw });
    await signup({ page, baseURL });
  });
});
