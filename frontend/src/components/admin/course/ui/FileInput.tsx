const FileInput = ({ label, onChange }: any) => (
    <div className="flex flex-col gap-2">
      <label className="label"><span className="font-medium">{label}</span></label>
      <input type="file" className="file-input file-input-bordered w-full" onChange={onChange} />
    </div>
  );
  export default FileInput;
  