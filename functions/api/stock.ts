interface Env {}

const UPSTREAM = 'https://query1.finance.yahoo.com/v8/finance/chart/TCS.NS';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request } = context;

  const upstream = await fetch(UPSTREAM, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await upstream.json();
  return new Response(JSON.stringify(data), {
    status: upstream.status,
    headers: { 'Content-Type': 'application/json' },
  });
};
