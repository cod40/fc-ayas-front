export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const { message } = await res.json();
    throw new Error(message || "Failed to fetch");
  }

  return data;
};

export const userInfoFetcher = async ([url, accessToken]: string[]) => {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
