const InputField = ({ label, name, type = "text", value, onChange, placeholder }: any) => (
    <div className="flex flex-col gap-2">
      <label className="label"><span className="font-medium">{label}</span></label>
      <input type={type} name={name} placeholder={placeholder} className="input w-full" value={value} onChange={onChange} />
    </div>
  );
  export default InputField;  