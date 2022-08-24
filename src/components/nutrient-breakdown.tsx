import { ISingleNutrients } from "../utils/interfaces/nutrients";

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
  if (breakdown.length === 0) {
    return null;
  }
  return (
    <div className="nb">
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
              <span>Food name</span>
              <span>{item.food_name}</span>
            </div>
            <div className="nb__info">
              <span>Calories</span>
              <span>{item.nf_calories}</span>
            </div>
            <div className="nb__info">
              <span>Cholesterol</span>
              <span>{item.nf_cholesterol}</span>
            </div>
            <div className="nb__info">
              <span>Dietary fiber</span>
              <span>{item.nf_dietary_fiber}</span>
            </div>
            <div className="nb__info">
              <span>Potassium</span>
              <span>{item.nf_potassium}</span>
            </div>
            <div className="nb__info">
              <span>Protein</span>
              <span>{item.nf_protein}</span>
            </div>
            <div className="nb__info">
              <span>Saturated fat</span>
              <span>{item.nf_saturated_fat}</span>
            </div>
            <div className="nb__info">
              <span>Sodium</span>
              <span>{item.nf_sodium}</span>
            </div>
            <div className="nb__info">
              <span>Sugars</span>
              <span>{item.nf_sugars}</span>
            </div>
            <div className="nb__info">
              <span>Total carbohydrate</span>
              <span>{item.nf_total_carbohydrate}</span>
            </div>
            <div className="nb__info">
              <span>Total fat</span>
              <span>{item.nf_total_carbohydrate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
