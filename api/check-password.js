export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const body = await req.json ? await req.json() : JSON.parse(req.body || "{}");
    const input = body.password?.trim();
    const correct = process.env.SEARCH_PWD; // your env var (plaintext for now)

    if (!correct) {
      return res.status(500).json({ ok: false, error: "Server misconfigured" });
    }

    if (input === correct) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(401).json({ ok: false });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: err.message || "Internal server error" });
  }
}
