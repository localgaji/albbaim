import { test } from '@playwright/test';
import { mockResponse } from '../mock/mockResponse';
import { getMyinfoNoGroup } from '../mock/responseBody/getMyInfo';
import { addGroup } from '../testCode/admin/addGroupTest';

test.beforeEach(async ({ page }) => {
  await page.route(`*/**/workplace`, async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill(mockResponse(getMyinfoNoGroup));
    } else if (route.request().method() === 'POST') {
      await route.fulfill(mockResponse(null));
    }
  });
});

test.describe('그룹 생성 페이지', () => {
  test('그룹 생성', async ({ page, baseURL }) => {
    await addGroup({ page, baseURL });
  });
});
