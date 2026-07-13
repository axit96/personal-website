interface Env {}

const UPSTREAM = 'https://opencode.ai/zen/v1/chat/completions';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;
  const body = await request.json();

  const auth = request.headers.get('Authorization') ?? '';

  const upstream = await fetch(UPSTREAM, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify(body),
  });

  const data = await upstream.json();
  return new Response(JSON.stringify(data), {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
