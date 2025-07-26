export default async function handler(req, res) {
  const agent_id = req.query.agent_id || process.env.RETELL_AGENT_ID;

  if (!agent_id) {
    res.status(400).json({ error: "Missing agent_id" });
    return;
  }

  try {
    const response = await fetch('https://api.retellai.com/call/token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RETELL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agent_id }),
    });

    const data = await response.json();

    if (!response.ok) {
      res.status(response.status).json({ error: "Retell API error", details: data });
    } else {
      res.status(200).json(data);
    }
  } catch (err) {
    res.status(500).json({ error: "Unexpected error", details: err.message });
  }
}
