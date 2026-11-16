type Props = { title: string; link?: string };

// Shared by the card and the row: plain text, or an external link when the event has one.
export function EventTitle({ title, link }: Props) {
  if (!link) return title;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {title} <span aria-hidden="true">↗</span>
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
