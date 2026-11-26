import { expect, test, type Page } from '@playwright/test';

const longProfile = {
  id: 'profile-sample',
  name: 'Pagination Sample',
  title: 'Product Engineer',
  summary: 'A sample summary used to verify page geometry and pagination. '.repeat(16),
  experience: Array.from({ length: 48 }, (_, index) => ({
    id: `role-${index}`,
    employer: `Example Company ${index + 1}`,
    title: `Engineer ${index + 1}`,
    start: '2020',
    end: '2025',
    description: 'Designed, built, and maintained reliable product systems with a focus on accessibility, performance, and clear user workflows. '.repeat(2),
    achievements: [{ id: `achievement-${index}`, text: 'Improved a measurable workflow outcome through careful iteration and collaboration.', selected: true }],
  })),
};

async function loadSampleWorkspace(page: Page) {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'CV builder' })).toBeVisible();
  await expect(page.getByText('Saved locally')).toBeVisible();
  await page.evaluate(async (profile) => {
    const request = indexedDB.open('foss-cv-tailor-local', 1);
    const db = await new Promise<IDBDatabase>((resolve, reject) => {
      request.onupgradeneeded = () => request.result.createObjectStore('workspace');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('workspace', 'readwrite');
      transaction.objectStore('workspace').put({
        schemaVersion: 1,
        profile: { id: 'master-profile' },
        cvs: [{
          id: 'pagination-cv',
          name: 'Pagination sample',
          templateId: 'cv-00',
          profile,
          updatedAt: new Date().toISOString(),
        }],
        letters: [],
        applications: [],
        favorites: [],
        theme: 'light',
      }, 'current');
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
    db.close();
  }, longProfile);
  await page.reload();
  await expect(page.getByRole('button', { name: 'CV builder' })).toBeVisible();
  await page.getByRole('button', { name: 'CV builder' }).click();
  await expect(page.locator('.paper.page-a4')).toBeVisible();
}

test('page-size and zoom controls keep the preview at physical proportions', async ({ page }) => {
  await loadSampleWorkspace(page);
  const paper = page.locator('.paper');
  const a4Width = await paper.evaluate(element => element.getBoundingClientRect().width);
  await expect(page.getByText('A4 page · 75%')).toBeVisible();

  await page.getByLabel('Preview page size').selectOption('Letter');
  await expect(page.locator('.paper.page-letter')).toBeVisible();
  const letterWidth = await paper.evaluate(element => element.getBoundingClientRect().width);
  expect(letterWidth).toBeGreaterThan(a4Width);

  await page.getByRole('button', { name: 'Zoom in' }).click();
  await expect(page.getByText('Letter page · 85%')).toBeVisible();
  const zoomedWidth = await paper.evaluate(element => element.getBoundingClientRect().width);
  expect(zoomedWidth).toBeGreaterThan(letterWidth);
});

test('Letter print output paginates a long CV across multiple pages', async ({ page }) => {
  await loadSampleWorkspace(page);
  await page.getByLabel('Preview page size').selectOption('Letter');
  const pdf = await page.pdf({ printBackground: true, preferCSSPageSize: true });
  expect(pdf.toString('latin1')).toMatch(/\/MediaBox\s*\[\s*0\s+0\s+612\s+792\s*\]/);
  const pageObjects = pdf.toString('latin1').match(/\/Type\s*\/Page\b/g) || [];
  expect(pageObjects.length).toBeGreaterThan(1);
});
