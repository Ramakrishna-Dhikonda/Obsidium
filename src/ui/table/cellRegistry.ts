import TextCell from "./renderers/TextCell";
import CheckboxCell from "./renderers/CheckboxCell";
import SelectCell from "./renderers/SelectCell";
import DateCell from "./renderers/DateCell";
import PriorityCell from "./renderers/PriorityCell";

import { ColumnType } from "./types";

export const cellRegistry: Record<ColumnType, any> = {

  text: TextCell,
  number: TextCell,
  select: SelectCell,
  checkbox: CheckboxCell,
  date: DateCell,
  priority: PriorityCell

};