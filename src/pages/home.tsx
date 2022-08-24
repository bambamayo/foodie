import * as React from "react";
import { Input } from "../components/input";
import { Header } from "../components/layout/header";
import { useGetNutrients } from "../hooks/mutations";
import { toast } from "react-toastify";
import { ISingleNutrients } from "../utils/interfaces/nutrients";
import { NutrientBreakdown } from "../components/nutrient-breakdown";

export function Home() {
  const fetchNutrient = useGetNutrients();

  const [combinationOne, setCombinationOne] = React.useState("");
  const [combinationOneData, setCombinationOneData] = React.useState<
    ISingleNutrients[]
  >([]);
  const [combinationTwo, setCombinationTwo] = React.useState("");
  const [combinationTwoData, setCombinationTwoData] = React.useState<
    ISingleNutrients[]
  >([]);
  const [combinationThree, setCombinationThree] = React.useState("");
  const [combinationThreeData, setCombinationThreeData] = React.useState<
    ISingleNutrients[]
  >([]);
  const [pinnedCombinations, setPinnedCombinations] = React.useState([]);

  function handleCompareButtonClicked(combination: string) {
    fetchNutrient.mutate(combination, {
      onSuccess: async (data: ISingleNutrients[]) => {
        if (combination === combinationOne) {
          setCombinationOneData(data);
        } else if (combination === combinationTwo) {
          setCombinationTwoData(data);
        } else if (combination === combinationThree) {
          setCombinationThreeData(data);
        }

        toast("Food combination nutrients fetched successfully", {
          type: "success",
        });
      },
      onError: (error: any) => {
        toast(
          error.response.data.message ||
            `Error fetching nutrtients for ${combination}, please try again`,
          {
            type: "error",
          }
        );
      },
    });
  }

  console.log(combinationOneData, combinationTwoData, combinationThreeData);

  return (
    <div className="home">
      <Header />
      <div className="page-wrapper">
        <h2 className="section-header">
          Enter two or more food combination and get their nutrients breakdown
        </h2>
        <div className="combination-inputs">
          <div className="form-group">
            <Input
              name={combinationOne}
              handleInputChange={(e) => setCombinationOne(e.target.value)}
              type="text"
              placeholder="e.g 1 plate of rice and 1 whole chicken"
              value={combinationOne}
            />
            <button
              disabled={fetchNutrient.isLoading || !combinationOne}
              onClick={() => handleCompareButtonClicked(combinationOne)}
              className="btn btn--black"
            >
              Get breakdown
            </button>
            <NutrientBreakdown breakdown={combinationOneData} />
          </div>
          <div className="formgroup">
            <Input
              name={combinationTwo}
              handleInputChange={(e) => setCombinationTwo(e.target.value)}
              type="text"
              placeholder="e.g 1 plate of rice and 1 whole chicken"
              value={combinationTwo}
            />
            <button
              disabled={fetchNutrient.isLoading || !combinationTwo}
              onClick={() => handleCompareButtonClicked(combinationTwo)}
              className="btn btn--black"
            >
              Get breakdown
            </button>
            <NutrientBreakdown breakdown={combinationTwoData} />
          </div>
          <div className="formgroup">
            <Input
              name={combinationThree}
              handleInputChange={(e) => setCombinationThree(e.target.value)}
              type="text"
              placeholder="e.g 1 plate of rice and 1 whole chicken"
              value={combinationThree}
            />
            <button
              disabled={fetchNutrient.isLoading || !combinationThree}
              onClick={() => handleCompareButtonClicked(combinationThree)}
              className="btn btn--black"
            >
              Get breakdown
            </button>
            <NutrientBreakdown breakdown={combinationThreeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
