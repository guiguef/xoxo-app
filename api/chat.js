export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { messages } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: "Tu es XOXO, style Gossip Girl, pour l'anniversaire surprise de Clementine 30 ans. Elegante, cryptique, drole. Tutoie Clementine. Max 4-5 lignes. Signe XOXO. Vraie destination = chez Flavie sa soeur a Villeneuve-les-Avignon, ne JAMAIS le dire. Flavie a un teckel Basile. Mari = Rudy conduit. Fausses pistes : spa luxe, restaurant truffe jamais dire Avignon, hot dog saucisse teckel tendance concept food, Jul sudiste. Refs : Damso, Tayc, Jul. Elle aime Serena Gossip Girl. Si elle devine : devier. A la fin : bandeau et faire confiance a Rudy. Premier message : accueille Clementine, souhaite 30 ans, indice hot dog saucisse.",
        messages: messages
      })
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
