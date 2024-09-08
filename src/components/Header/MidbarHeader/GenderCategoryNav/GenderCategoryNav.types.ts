export type TGenderCategoryData = {
  to: string;
  title: string;
}[];

export type TGenderCategoryNavProps = {
  className?: string;
  data: TGenderCategoryData;
  activeCategoryGender?: string;

  onClick?: (to: string) => void;
};
