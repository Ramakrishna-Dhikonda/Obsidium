import {
  statusConfig
} from "../statusConfig";

export default function SelectCell(
  props: {
    value: string;
  }
) {

  const config =
    statusConfig[
      props.value as keyof typeof statusConfig
    ];

  return (
    <div
      class="select-pill"

      style={{
        background: config?.background,
        color: config?.color
      }}
    >
      {props.value}
    </div>
  );
}