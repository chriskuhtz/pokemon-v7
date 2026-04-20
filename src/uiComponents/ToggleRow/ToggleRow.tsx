export const ToggleRow = ({
  label,
  value,
  setValue,
  description,
}: {
  value: boolean;
  setValue: (x: boolean) => void;
  label: string;
  description?: string;
}) => {
  return (
    <>
      <div>
        <h3 style={{ margin: 0 }}>{label}</h3>
        {description && (
          <strong style={{ color: "crimson" }}>({description})</strong>
        )}
      </div>
      <Toggle value={value} setValue={setValue} />
    </>
  );
};

export const Toggle = ({
  value,
  setValue,
}: {
  value: boolean;
  setValue: (x: boolean) => void;
}) => {
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
