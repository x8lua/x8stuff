export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false });
  }
  const { password } = req.body;
  const correct = process.env.SEARCH_PWD;

  if (password === correct) {
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
}
