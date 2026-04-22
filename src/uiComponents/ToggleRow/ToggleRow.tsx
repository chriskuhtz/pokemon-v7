export const ToggleRow = ({
  label,
  value,
  setValue,
  description,
  disabled,
}: {
  value: boolean;
  setValue: (x: boolean) => void;
  label: string;
  description?: string;
  disabled: boolean;
}) => {
  return (
    <>
      <div>
        <h3 style={{ margin: 0 }}>{label}</h3>
        {description && (
          <strong style={{ color: "crimson" }}>({description})</strong>
        )}
      </div>
      <Toggle value={value} setValue={setValue} disabled={disabled} />
    </>
  );
};

export const Toggle = ({
  value,
  setValue,
  disabled,
}: {
  value: boolean;
  setValue: (x: boolean) => void;
  disabled: boolean;
}) => {
  if (disabled) {
    return (
      <button
        disabled
        style={{
          padding: 8,
          borderRadius: 16,
        }}
      >
        {value ? "ON" : "Off"}
      </button>
    );
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <button
        style={{
          padding: 8,

          borderBottomLeftRadius: 16,
          borderTopLeftRadius: 16,
          borderBottomRightRadius: 0,
          borderTopRightRadius: 0,
          backgroundColor: !value ? "black" : undefined,
          color: !value ? "white" : "black",
        }}
        onClick={() => setValue(false)}
      >
        Off
      </button>
      <button
        style={{
          padding: 8,
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
          borderBottomRightRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: value ? "black" : undefined,
          color: value ? "white" : "black",
        }}
        onClick={() => setValue(true)}
      >
        On
      </button>
    </div>
  );
};
