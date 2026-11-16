import styles from "./FilterTabs.module.css";

type Props<T extends string> = {
  label: string;
  options: readonly T[];
  value: T;
  // Optional so the tabs can be server-rendered (inactive) before JavaScript loads.
  onChange?: (value: T) => void;
};

// Controlled: the parent owns the selected value (the Projects page keeps it in the URL).
// Toggle buttons with aria-pressed, because these filter a list rather than switch between panels.
export function FilterTabs<T extends string>({
  label,
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <div role="group" aria-label={label} className={styles.tabs}>
      {options.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={option === value}
          className={styles.tab}
          onClick={onChange && (() => onChange(option))}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
