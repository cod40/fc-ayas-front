import axios from "axios";

const BASE_API_URL = "http://www.fc-ayas.com:5000";

export const fetchAttends = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/attends`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch attend");
  }
};
