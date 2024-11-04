import { Bill, BillField, Legislator, LegislatorField } from '@/appTypes';

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

type FieldValidator<S> = {
  [K in FilterComponentFieldTypes]: K extends S ? K : never;
}[FilterComponentFieldTypes];

export type BillFilterFields = FieldValidator<BillField>;

export type LegislatorFilterFields = FieldValidator<LegislatorField>;

export type ValidFilterFields = BillFilterFields[] | LegislatorFilterFields[];

type TabMapping = {
  bill: {
    item: Bill;
    fields: BillFilterFields;
  };
  legislator: {
    item: Legislator;
    fields: LegislatorFilterFields;
  };
};

export type TabMappingItem<T extends TabType> = TabMapping[T]['item'];
