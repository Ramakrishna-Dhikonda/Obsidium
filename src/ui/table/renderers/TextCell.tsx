export default function TextCell(
  props: {
    value: string;
  }
) {
  return (
    <span>
      {props.value}
    </span>
  );
}