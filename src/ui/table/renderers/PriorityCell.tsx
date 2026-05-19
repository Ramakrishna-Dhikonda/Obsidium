import {
  priorityConfig
} from "../priorityConfig";

export default function PriorityCell(
  props: {
    value: string;
  }
) {

  const config =
    priorityConfig[
      props.value as keyof typeof priorityConfig
    ];

  return (
    <div
      class="priority-pill"

      style={{
        background:
          config?.background,

        color:
          config?.color
      }}
    >
      {props.value}
    </div>
  );
}