export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ ok: false, msg: "use POST" });
  }

  const { password } = req.body;
  const correct = process.env.SEARCH_PWD || "not_set";

  if (password === correct) {
    return res.status(200).json({ ok: true });
  } else {
    return res.status(401).json({ ok: false, msg: `expected ${correct}` });
  }
}
