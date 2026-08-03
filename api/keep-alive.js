/**
 * Vercel Serverless Function: keep-alive
 *
 * Faz um GET mínimo no Supabase para evitar que o banco seja pausado
 * por inatividade no plano gratuito (pausa após 7 dias sem atividade).
 *
 * Acionado por cron job definido no vercel.json (1x por dia).
 * Protegido por CRON_SECRET para bloquear chamadas externas não autorizadas.
 */

export default async function handler(req, res) {
  // Vercel envia automaticamente: Authorization: Bearer <CRON_SECRET>
  const authHeader = req.headers['authorization'];
  const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

  if (authHeader !== expectedToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing Supabase environment variables' });
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/books?select=id&limit=1`,
      {
        method: 'GET',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!response.ok) {
      const body = await response.text();
      console.error(`[keep-alive] Supabase respondeu com erro ${response.status}: ${body}`);
      return res.status(502).json({ error: 'Supabase request failed', status: response.status });
    }

    console.log('[keep-alive] Ping enviado com sucesso ao Supabase.');
    return res.status(200).json({ ok: true, timestamp: new Date().toISOString() });
  } catch (err) {
    console.error('[keep-alive] Erro inesperado:', err);
    return res.status(500).json({ error: 'Internal error', message: err.message });
  }
}
