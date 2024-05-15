type userData = {
  name: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  phone: string;
  verificationCode: string;
};

export const signUp = async (userData: userData) => {
  const { confirmPassword, verificationCode, ...userDetails } = userData;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to sign up.");
  }
  return data;
};
