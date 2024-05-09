export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Failed to fetch");
  }
  return data;
};
