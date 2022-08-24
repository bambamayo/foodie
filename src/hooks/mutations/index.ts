// export function useCreateAlbum() {
//     return useMutation(async function (data: any) {
//       const response = await createAlbum(data);
//       return response.data.album;
//     });
//   }

import { useMutation } from "@tanstack/react-query";
import { getFoodNutrients } from "../../services/nutrients";

export function useGetNutrients() {
  return useMutation(async function (query: string) {
    const response = await getFoodNutrients(query);
    return response.foods;
  });
}
