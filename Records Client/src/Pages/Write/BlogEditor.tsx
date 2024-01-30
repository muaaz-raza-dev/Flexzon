import { useAppDispatch, useAppSelector } from "@/app/ReduxHooks";
import ReactQuill from "react-quill";
import { useState, useEffect, useRef } from "react";
import { WriteInsertion } from "@/app/Slices/WriteSlice";
var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block","image"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
];
const modules = {
  toolbar: toolbarOptions,
};
const BlogEditor = () => {
  const EditorRef: any = useRef(null);
  const [Content, setContent] = useState<string>("");
 
  let dispatch = useAppDispatch();
let data=useAppSelector(state=>state.write)
  useEffect(() => {
    dispatch(
      WriteInsertion({
        mainContent: Content,
        plainText: EditorRef.current.unprivilegedEditor.getText(),
      })
    );
  }, [Content]);

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      className="w-[90%] bg-[#f7f6f6] border-none md:h-[50vh]   mb-6"
      ref={EditorRef}
      placeholder="Share your information or thoughts "
      defaultValue={data.mainContent || ""}
      onChange={setContent}
    />
  );
};

export default BlogEditor;
