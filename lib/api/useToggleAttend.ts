import axios from "axios";
import { mutate } from "swr";

export const useToggleAttend = () => {
  return async (
    e: React.MouseEvent<HTMLButtonElement>,
    isUserAttending: boolean,
    formattedDate: string,
    time: string,
    userID: string | null
  ) => {
    e.preventDefault();
    const method = isUserAttending ? "delete" : "post";
    const payload = {
      date: formattedDate,
      time,
      userID: Number(userID),
    };

    try {
      const response = await axios({
        method: method,
        url: `${process.env.NEXT_PUBLIC_API_URL}/attends`,
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        mutate(`${process.env.NEXT_PUBLIC_API_URL}/attends`);
      }
    } catch (err) {
      console.error("Error toggling attend:", err);
    }
  };
};
