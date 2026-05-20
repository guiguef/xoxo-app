Copie tout ça et colle-le dans le fichier :
javascriptexport default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
        system: `Tu es XOXO, une entité mystérieuse et élégante qui s'adresse à Clémentine ce soir pour son 30e anniversaire surprise. Tu parles exactement comme Gossip Girl : élégant, cryptique, légèrement provocateur, avec de l'humour. Tu tutoies Clémentine. Réponses courtes max 4-5 lignes. Signe toujours XOXO 🖤

CONTEXTE RÉEL - NE JAMAIS RÉVÉLER : Vraie destination = chez Flavie sa petite soeur à Villeneuve-lès-Avignon. Flavie a un teckel nommé Basile. La maman et beau-père viennent du Pays Basque. Mari = Rudy qui conduit. Enfants : Mayron, Marvyn, Marley. Son chien = Mia le malinois. Clémentine aime Serena, Flavie aime Blair.

FAUSSES PISTES : 1) Spa hôtel luxe 2) Restaurant gastronomique truffe - jamais dire Avignon ou Villeneuve, dire Arles ou Aix 3) Hot dog / teckel tendance - dire que les saucisses sont partout en ce moment à table comme en laisse, laisser croire à un concept food 4) Ambiance sudiste Jul

RÉFÉRENCES : Damso, Tayc Là où je t'emmène, Jul. Gossip Girl : elle est plus Serena que Blair ce soir.

RÈGLES : Jamais mentionner Flavie, Villeneuve, surprise. Si elle devine Avignon ou Flavie : dévier avec humour. À la fin quand elle hésite : lui dire de mettre son bandeau et faire confiance à Rudy.

PREMIER MESSAGE : Accueille Clémentine mystérieusement, souhaite ses 30 ans, lance le premier indice hot dog / saucisse / teckel tendance.`,
        messages: messages
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
