import {
    createSignal,
    For,
    Show,
    onMount,
    onCleanup
} from "solid-js";

import {
    Check,
    ChevronRight,
    EllipsisIcon,
    EllipsisVertical,
    MoreHorizontal
} from "lucide-solid";

import {
    columns
} from "./tableData";

interface Props {
    visibleColumns: string[];

    setVisibleColumns: (
        updater: (
            prev: string[]
        ) => string[]
    ) => void;
}

export default function TableToolbar(
    props: Props
) {

    let menuRef: HTMLDivElement | undefined;

    onMount(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                menuRef &&
                !menuRef.contains(
                    event.target as Node
                )
            ) {

                setMenuOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        onCleanup(() => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        });
    });

    const toggleColumn = (
        columnId: string
    ) => {

        if (
            props.visibleColumns.includes(
                columnId
            )
        ) {

            props.setVisibleColumns(
                prev =>
                    prev.filter(
                        id => id !== columnId
                    )
            );

        } else {

            props.setVisibleColumns(
                prev => [
                    ...prev,
                    columnId
                ]
            );
        }
    };

    const [
        menuOpen,
        setMenuOpen
    ] = createSignal(false);

    return (

        <div class="table-toolbar">

            <div class="table-toolbar-left">
                <div class="toolbar-title">
                    Tasks
                </div>
            </div>

            <div class="table-toolbar-right">

                <div class="toolbar-dropdown" ref={menuRef}>

                    <button
                        class="toolbar-icon-button"

                        onClick={() =>
                            setMenuOpen(
                                !menuOpen()
                            )
                        }
                    >
                        <EllipsisVertical size={35} />
                    </button>

                    <Show when={menuOpen()}>

                        <div class="toolbar-menu">

                            {/* COLUMNS */}

                            <div class="toolbar-menu-item has-submenu">

                                <div class="menu-row">

                                    <span>
                                        Columns
                                    </span>

                                    <ChevronRight size={16} />

                                </div>



                                <div class="toolbar-submenu">

                                    <For each={columns}>
                                        {(column) => (

                                            <label class="column-toggle-item">
                                                <input 
                                                    type="checkbox"
                                                    checked={
                                                        props.visibleColumns.includes(
                                                            column.id
                                                        )
                                                    }
                                                    onChange={() =>
                                                        toggleColumn(
                                                            column.id
                                                        )
                                                    }
                                                />
                                                <span>
                                                    {column.label}
                                                </span>
                                            </label>
                                        )}
                                    </For>

                                </div>



                            </div>

                        </div>

                    </Show>

                </div>

            </div>

        </div>
    );
}