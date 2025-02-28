const SelectInput = ({ label, name, value, onChange, options }: any) => (
    <div className="flex flex-col gap-2">
      <label className="label"><span className="font-medium">{label}</span></label>
      <select name={name} className="select w-full" value={value} onChange={onChange}>
        <option value="">انتخاب {label}</option>
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
  export default SelectInput;  