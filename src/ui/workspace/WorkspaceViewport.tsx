import { 
  Component,
  createSignal
} from "solid-js";

import TableSurface from "../table/TableSurface";

import { columns } from "../table/tableData";
import TableToolbar from "../table/TableToolbar";

export default function WorkspaceViewport() {
  const [
    visibleColumns,
    setVisibleColumns
  ] = createSignal(columns.map(column => column.id));
  return (
    <div class="workspace-viewport">
      <TableToolbar 
        visibleColumns={visibleColumns()}
        setVisibleColumns={setVisibleColumns}
      />
      <TableSurface 
        visibleColumns={visibleColumns()}
      />
    </div>
  );
}