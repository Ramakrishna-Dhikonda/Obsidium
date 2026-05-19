import {
  For
} from "solid-js";

import {
  columns,
  rows
} from "./tableData";

const totalWidth =
  columns.reduce(
    (sum, col) =>
      sum + col.width,
    0
  );
  

export default function TableSurface() {
  return (
    <div class="table-surface">
      <div class="table-scroll-container">
        <div class="table-grid">
          <div class="table-header">
            <For each={columns}>
              {(column) => (
                <div class="table-header-cell">
                  {column.label}
                </div>
              )}
            </For>
          </div>

          <div class="table-body">
            <For each={rows}>
              {(row) => (
                <div class="table-row">
                  <For each={columns}>
                    {(column) => (
                      <div class="table-cell">
                        {
                          row [
                            column.id as keyof typeof row
                          ]
                        }
                      </div>
                    )}
                  </For>
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}