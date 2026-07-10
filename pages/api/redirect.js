import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'no slug provided' });

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
  );

  const { data, error } = await supabase
    .from('workspace')
    .select('content')
    .eq('slug', slug)
    .single();

  if (data?.content) {
    return res.status(200).json({ target: data.content });
  } else {
    return res.status(404).json({ error: 'shortlink not found' });
  }
}
