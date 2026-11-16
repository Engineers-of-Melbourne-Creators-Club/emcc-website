import styles from "./FormField.module.css";

type Props = {
  label: string;
  name: string;
  type?: "text" | "email" | "textarea";
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  defaultValue?: string;
  error?: string;
};

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required,
  defaultValue,
  error,
}: Props) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  // aria-invalid and aria-describedby make screen readers announce the error with the field.
  const shared = {
    id,
    name,
    placeholder,
    autoComplete,
    required,
    defaultValue,
    className: styles.input,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea {...shared} />
      ) : (
        <input type={type} {...shared} />
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  );
}
