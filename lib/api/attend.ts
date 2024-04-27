import axios from "axios";

const BASE_API_URL = "http://13.209.27.84:3000";

export const fetchAttends = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/attends`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch attend");
  }
};
