export type InputType = {
  label: string;
  name: string;
  type: string;
  dataTestId: string;
  value: string;
  handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonType = {
  clicar: string;
  dataTestId: string;
  disabled: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type InicialStateLoginType = {
  email: string;
  password: string;
};

export type DoneRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[]
};

export type LayoutType = {
  searchResults: SearchResultsType;
};

export type RecipeType = {
  idMeal?: string;
  idDrink?: string;
  strMeal?: string;
  strDrink?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
};

export type SearchResultsType = {
  meals: RecipeType[];
  drinks: RecipeType[];
};

type DetailsCommonKeys = {
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strTags: string;
  strYoutube: string;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
  strAlcoholic?: string,
};
export type MealsDetailsType = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: null | string;
  strMealThumb: string;
  [key: string]: any;
} & DetailsCommonKeys;

export type DrinksDetailsType = {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: null | string;
  strDrinkThumb: string;
  strAlcoholic: string;
} & DetailsCommonKeys;

export type ProductDetailsType = {
  id: string;
  str: string;
  img: string;
} & DetailsCommonKeys;

export type FavoriteRecipeType = {
  id: string
  type: string,
  nationality: string,
  category: string,
  alcoholicOrNot: string,
  name: string,
  image: string
};

export type GlobalContextType = [
  LayoutType, React.Dispatch<React.SetStateAction<LayoutType>>];

export type RecipeCardProps = {
  recipe: RecipeType;
  index: number;
  baseHeadTestId?: string;
};

export interface RecipeDetailsType {
  strMeal: string;
  strDrink: string;
  strMealThumb: string;
  strDrinkThumb: string;
  strCategory: string;
  strAlcoholic: string;
  strInstructions: string;
  strYoutube: string;
}
