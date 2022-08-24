import axios from "../utils/axios";

export async function getFoodNutrients(query: string) {
  const response = await axios.post(`/natural/nutrients`, { query });
  return response.data;
}
