import { expect } from '@playwright/test';

export const addGroup = async ({ page, baseURL }) => {
  // 1. 접속
  await page.goto(`${baseURL}/workplace`);
  await expect(page.getByText('매장 등록하기')).toBeVisible();

  const workplaceName = page.getByLabel('상호명');
  const workplaceNumber = page.getByLabel('사업자 번호');
  const address = page.getByLabel('상세 주소');
  const mainAddress = page.getByLabel('주소', { exact: true });

  // 2. 매장명 입력
  await workplaceName.focus();
  await workplaceName.fill('카카오 프렌즈샵');

  // 3. 사업자번호 입력
  await workplaceNumber.focus();
  await workplaceNumber.fill('0123456789');

  // 4. 상세주소 입력
  await address.focus();
  await address.fill('상세 주소');

  // 5. 다음 주소
  await mainAddress.click();

  // 5. 다음 주소 - 검색
  const frame = page
    .frameLocator('iframe[title="우편번호서비스 레이어 프레임"]')
    .frameLocator('iframe[title="우편번호 검색 프레임"]');
  const searchBox = frame.getByLabel('검색할 도로명/지번주소를 입력, 예시) 판교역로 166, 분당 주공, 백현동 532');
  const searchBtn = frame.getByRole('button', { name: '검색' });
  const searchResult = frame.locator('//button[@class="link_post"]');

  // // 5. 다음 주소 - 첫번째 결과 클릭
  await searchBox.fill('강남구');
  await searchBtn.click();
  await searchBtn.click();
  await searchResult.first().click();

  // // 6. 제출
  await page.getByRole('button', { name: '그룹 생성하기' }).click();

  await expect(page.getByText('매장 등록에 성공했습니다')).toBeVisible();
};
