import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditorInput = ({ label, data, onChange }: any) => (
  <div className="flex flex-col gap-2">
    <label className="label"><span className="font-medium">{label}</span></label>
    <CKEditor editor={ClassicEditor} data={data} onChange={onChange} config={{ language: "fa" }} className="bg-base-300" />
  </div>
);
export default EditorInput;