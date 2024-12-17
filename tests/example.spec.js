// @ts-check
const { test, expect } = require('@playwright/test');

test('search and open image', async ({ page }) => {
  // Acessa a página principal da Wikipédia
  await page.goto('https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:P%C3%A1gina_principal');

  // Localiza o campo de pesquisa pelo placeholder
  const searchInput = page.getByPlaceholder('Pesquisar na Wikipédia');

  // Clica no campo, insere o texto e pressiona Enter
  await searchInput.click();
  await searchInput.fill('rio grande do sul');
  await Promise.all([
    page.waitForNavigation(), // Aguarda o carregamento da nova página
    searchInput.press('Enter')
  ]);

  // Localiza a imagem da página de destino
  const image = page.locator('img[width="133"][height="149"]'); // Seletor baseado nas dimensões conhecidas

  // Aguarda a imagem ficar visível
  await expect(image).toBeVisible({ timeout: 10000 });

  // Clica na imagem
  await image.click();
});
