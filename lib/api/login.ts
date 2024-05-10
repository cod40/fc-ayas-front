type LoginData = {
  nickname: string;
  password: string;
};

export const login = async (loginData: LoginData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }
  return data;
};
