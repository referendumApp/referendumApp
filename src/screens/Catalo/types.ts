import { Bill, BillField, Legislator, LegislatorField } from '@/appTypes';
import { FieldValidator } from '@/appTypes/utils';

export type TabType = 'bill' | 'legislator';

export enum FilterComponentFields {
  roleId = 'roleId',
  stateId = 'stateId',
  partyId = 'partyId',
}
export type FilterComponentFieldTypes = keyof typeof FilterComponentFields;

export type FilterOptionValueMap = {
  [FilterComponentFields.partyId]: number[];
  [FilterComponentFields.roleId]: number[];
  [FilterComponentFields.stateId]: number[];
  federal: boolean;
}
export type FilterOptionFieldTypes = keyof FilterOptionValueMap;
export type FilterOptions = Partial<FilterOptionValueMap>;

type BillFilterFields = FieldValidator<BillField, FilterComponentFieldTypes>;
type LegislatorFilterFields = FieldValidator<LegislatorField, FilterComponentFieldTypes>;
export type ValidFilterFields = BillFilterFields[] | LegislatorFilterFields[];

export enum SortFields {
  identifier = 'identifier',
  name = 'name',
  title = 'title',
  statusDate = 'statusDate',
}
export type SortFieldTypes = keyof typeof SortFields;

type BillSortFields = Exclude<FieldValidator<BillField, SortFieldTypes>, 'name'>;
type LegislatorSortFields = FieldValidator<LegislatorField, SortFieldTypes>;
export type ValidSortFields = BillSortFields | LegislatorSortFields;

type TabMapping = {
  bill: {
    item: Bill;
    filterFields: BillFilterFields,
    sortFields: BillSortFields,
  };
  legislator: {
    item: Legislator;
    filterFields: LegislatorFilterFields,
    sortFields: LegislatorSortFields,
  };
};
export type TabMappingItem<T extends TabType> = TabMapping[T]['item'];
export type TabMappingFilterFields<T extends TabType> = TabMapping[T]['filterFields'];
export type TabMappingSortFields<T extends TabType> = TabMapping[T]['sortFields'];
