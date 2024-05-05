export const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Failed to fetch");
  }
};
