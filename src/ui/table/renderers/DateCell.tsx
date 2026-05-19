export default function DateCell(
  props: {
    value: string;
  }
) {

  const date =
    new Date(props.value);

  const formattedDate =
    isNaN(date.getTime())
      ? props.value
      : date.toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric"
          }
        );

  return (
    <div class="date-cell">
      {formattedDate}
    </div>
  );
}