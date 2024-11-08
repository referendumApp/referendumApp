import { ValidSortFields } from '@/screens/Catalog/types';

export type SortOptions = Array<{
  field: ValidSortFields;
  label: string;
}>;
