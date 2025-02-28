const TextAreaField = ({ label, name, value, onChange, placeholder }: any) => (
    <div className="flex flex-col gap-2">
      <label className="label"><span className="font-medium">{label}</span></label>
      <textarea name={name} className="textarea w-full" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
  export default TextAreaField;
  