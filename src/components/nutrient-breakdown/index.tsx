import { ISingleNutrients } from "../../utils/interfaces/nutrients";

type NutrientBreakdownProps = {
  breakdown: ISingleNutrients[];
  buttonClicked?(): void;
  showButton: boolean;
};

export function NutrientBreakdown({
  breakdown,
  buttonClicked,
  showButton,
}: NutrientBreakdownProps) {
  function handleWidth(value: number) {
    const evaluated = new Intl.NumberFormat("default", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100);
    if (parseInt(evaluated) > 100) return "100%";
    else return evaluated;
  }

  if (breakdown.length === 0) {
    return null;
  }
  return (
    <div className="nb" data-testid="nb">
      <div className="nb__list">
        {breakdown?.map((item) => (
          <div className="nb__item" key={item.food_name}>
            {showButton ? (
              <button onClick={buttonClicked} className="btn btn--blue nb__btn">
                pin combo
              </button>
            ) : null}
            <div className="nb__image">
              <img src={item.photo.thumb} alt={item.food_name} />
            </div>
            <div className="nb__info">
              <span>Name</span>
              <span>{item.food_name}</span>
            </div>
            <div className="nb__info">
              <span>Calories</span>
              <span>{item.nf_calories}</span>
              <div
                style={{ width: handleWidth(item.nf_calories) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Cholesterol</span>
              <span>{item.nf_cholesterol}</span>
              <div
                style={{ width: handleWidth(item.nf_cholesterol) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Dietary fiber</span>
              <span>{item.nf_dietary_fiber}</span>
              <div
                style={{ width: handleWidth(item.nf_dietary_fiber) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Potassium</span>
              <span>{item.nf_potassium}</span>
              <div
                style={{ width: handleWidth(item.nf_potassium) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Protein</span>
              <span>{item.nf_protein}</span>
              <div
                style={{ width: handleWidth(item.nf_protein) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Saturated fat</span>
              <span>{item.nf_saturated_fat}</span>
              <div
                style={{ width: handleWidth(item.nf_saturated_fat) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Sodium</span>
              <span>{item.nf_sodium}</span>
              <div
                style={{ width: handleWidth(item.nf_sodium) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Sugars</span>
              <span>{item.nf_sugars}</span>
              <div
                style={{ width: handleWidth(item.nf_sugars) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>carbohydrate</span>
              <span>{item.nf_total_carbohydrate}</span>
              <div
                style={{ width: handleWidth(item.nf_total_carbohydrate) }}
                className="nb__vi"
              ></div>
            </div>
            <div className="nb__info">
              <span>Total fat</span>
              <span>{item.nf_total_fat}</span>
              <div
                style={{ width: handleWidth(item.nf_total_fat) }}
                className="nb__vi"
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
