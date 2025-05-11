import { test } from '@playwright/test';
import { Page } from 'playwright';

/**
 * Ghi lỗi dưới dạng step + attachment + fail
 */
export async function logError(stepName: string, message: string, error?: Error): Promise<void> {
  await test.step(`[ERROR] ${stepName}`, async () => {
    const time = new Date().toISOString();
    const content =
      `[ERROR] ${stepName}\n` +
      `Time: ${time}\n` +
      `Message: ${message}\n` +
      (error ? `\nStack:\n${error.stack}` : '');

    test.info().attachments.push({
      name: 'Error Log',
      contentType: 'text/plain',
      body: Buffer.from(content, 'utf-8'),
    });

    throw new Error(message);
  });
}

/**
 * Ghi thông tin (info-level step)
 */
export async function logInfo(stepName: string, message: string): Promise<void> {
  await test.step(`[INFO] ${stepName}`, async () => {
    const content = `${new Date().toISOString()} - ${message}`;
    test.info().attachments.push({
      name: 'Info Log',
      contentType: 'text/plain',
      body: Buffer.from(content, 'utf-8'),
    });
  });
}

/**
 * Ghi log debug (tùy chọn log object hoặc chuỗi)
 */
export async function logDebug(stepName: string, data: string | object): Promise<void> {
  await test.step(`[DEBUG] ${stepName}`, async () => {
    const content = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    test.info().attachments.push({
      name: 'Debug Log',
      contentType: 'text/plain',
      body: Buffer.from(content, 'utf-8'),
    });
  });
}

/**
 * Đính kèm screenshot
 */
export async function logScreenshot(page: Page, name = 'Screenshot'): Promise<void> {
  const screenshot = await page.screenshot();
  test.info().attachments.push({
    name,
    contentType: 'image/png',
    body: screenshot,
  });
}

/**
 * Đính kèm HTML trạng thái trang
 */
export async function logPageState(page: Page, name = 'Page State'): Promise<void> {
  const html = await page.content();
  test.info().attachments.push({
    name,
    contentType: 'text/html',
    body: Buffer.from(html, 'utf-8'),
  });
}
