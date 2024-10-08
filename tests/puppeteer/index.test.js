/* eslint-disable no-undef */
import 'expect-puppeteer'

describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should be titled "Google"', async () => {
    await expect(page.title()).resolves.toMatch('Google')
  })
})
