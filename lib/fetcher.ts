export const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    // Attach extra info to the error object.
    const { message } = await res.json();
    throw new Error(message || 'An error occurred while fetching the data.');
  }

  return res.json();
};
