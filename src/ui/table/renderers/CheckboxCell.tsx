export default function CheckboxCell(
  props: {
    value: boolean;
  }
) {
  return (
    <input
      type="checkbox"
      checked={props.value}
    />
  );
}