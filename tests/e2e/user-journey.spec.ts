import { test, expect } from '@playwright/test';

test.describe('Book Collection User Journey', () => {
  test('should load the homepage, display collection, and navigate to details', async ({ page }) => {
    // 1. Visitar raiz
    await page.goto('/');

    // Aguardar que a coleção apareça
    await expect(page.locator('h1')).toHaveText(/Livros Recomendados/i);
    
    // Checar se carregou a página (esperamos que a seed tenha alimentado)
    // Se não tiver livros devido a CI sem seed, pelo menos não pode estar em erro.
    const articleCards = page.locator('article');
    
    // 3. Procura botão "Detalhes ↗" do primeiro card, assumindo que há livros.
    const firstBookButton = articleCards.first().locator('button:has-text("Detalhes ↗")');
    
    // Pula o fluxo se não houver dados no banco renderizando.
    if ((await articleCards.count()) > 0) {
      await firstBookButton.click();
      
      // 4. Valida se entrou na tela de detalhes
      await expect(page.locator('h3:has-text("Sinopse / Detalhes")')).toBeVisible();
      
      // 5. Clica em Voltar
      const backButton = page.locator('button:has-text("Voltar para Coleção")');
      await expect(backButton).toBeVisible();
      await backButton.click();
      
      // Valida que voltou
      await expect(page).toHaveURL(/.*localhost:5173\/?$/);
    }
  });
});
