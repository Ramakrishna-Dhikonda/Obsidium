import {
  For
} from "solid-js";

import {
  columns,
  rows
} from "./tableData";

import { cellRegistry } from "./cellRegistry";


const totalWidth =
  columns.reduce(
    (sum, col) =>
      sum + col.width,
    0
  );

interface Props {
  visibleColumns: string[];
}


export default function TableSurface(props: Props) {

  const filteredColumns = columns.filter(
    column => props.visibleColumns.includes(column.id)
  );

  return (
    <div class="table-surface">
      <div class="table-scroll-container">
        <div class="table-grid">
          <div class="table-header">
            <For
              each={columns.filter(
                column =>
                  props.visibleColumns.includes(
                    column.id
                  )
              )}
            >
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
                  <For 
                    each={columns.filter(
                      column =>
                        props.visibleColumns.includes(
                          column.id
                        )
                    )}
                  >
                    {(column) => (
                      <div class="table-cell">

                        {(() => {

                          const Renderer =
                            cellRegistry[
                            column.type
                            ];

                          return (
                            <Renderer
                              value={
                                row[
                                column.id as keyof typeof row
                                ]
                              }
                            />
                          );

                        })()}

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