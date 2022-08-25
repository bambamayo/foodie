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
  const [tabInView, setTabInView] = React.useState<"combo" | "pinned">("combo");
  const [pinnedCombinations, setPinnedCombinations] = React.useState<any>(null);
  const [fetchingPinned, setFetchingPinned] = React.useState(false);

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

  function handlePinFoodCombo(
    combination: string,
    combinationData: ISingleNutrients[]
  ) {
    if (!localStorage.getItem("data")) {
      const data = {
        [combination]: combinationData,
      };
      localStorage.setItem("data", JSON.stringify(data));
      setPinnedCombinations({
        ...pinnedCombinations,
        [combination]: combinationData,
      });
    } else if (localStorage.getItem("data")) {
      let data = localStorage.getItem("data");
      if (data) {
        const rawData = JSON.parse(data);
        const newData = { ...rawData, [combination]: combinationData };
        localStorage.setItem("data", JSON.stringify(newData));
        setPinnedCombinations({
          ...pinnedCombinations,
          [combination]: combinationData,
        });
      }
    }
    toast(`Food combination #${combination} pinned succesfully`, {
      type: "success",
    });
  }

  React.useEffect(() => {
    setFetchingPinned(true);
    const data = localStorage.getItem("data");
    setFetchingPinned(false);
    if (data) {
      setPinnedCombinations(JSON.parse(data));
    } else {
      return;
    }
  }, []);

  return (
    <div className="home">
      <Header />
      <div className="tabs">
        <button
          className="btn btn--black"
          onClick={() => setTabInView("combo")}
        >
          Search for food nutrients
        </button>
        <button
          className="btn btn--black"
          onClick={() => setTabInView("pinned")}
        >
          View pinned
        </button>
      </div>
      {tabInView === "combo" ? (
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
              <NutrientBreakdown
                showButton={true}
                buttonClicked={() =>
                  handlePinFoodCombo(combinationOne, combinationOneData)
                }
                breakdown={combinationOneData}
              />
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
              <NutrientBreakdown
                showButton={true}
                buttonClicked={() =>
                  handlePinFoodCombo(combinationTwo, combinationTwoData)
                }
                breakdown={combinationTwoData}
              />
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
              <NutrientBreakdown
                showButton={true}
                buttonClicked={() =>
                  handlePinFoodCombo(combinationThree, combinationThreeData)
                }
                breakdown={combinationThreeData}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="page-wrapper">
          <h2 className="section-header">View Pinned Combinations</h2>
          {!pinnedCombinations ? (
            <div className="pinned-empty">No pinned combinations</div>
          ) : fetchingPinned ? (
            <div className="pinned-empty">Loading pinned combinations</div>
          ) : (
            <div className="pinned-list">
              {Object.keys(pinnedCombinations).map((item) => (
                <NutrientBreakdown
                  showButton={false}
                  key={item}
                  breakdown={pinnedCombinations[item]}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
