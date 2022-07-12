import dynamic from "next/dynamic";

import "suneditor/dist/css/suneditor.min.css";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const editorOptions = {
  buttonList: [
    ["font", "fontSize", "formatBlock"],
    ["bold", "underline", "italic", "strike", "subscript", "superscript"],
    ["fontColor", "hiliteColor", "textStyle"],
    ["outdent", "indent"],
    ["align", "horizontalRule", "list", "lineHeight"],
    ["table", "link", "image"],
    ["fullScreen", "codeView"],
  ],
  minHeight: "20rem",
  height: "auto",
  resizingBar: true,
  defaultStyle: "font-family: 'Nunito'; font-size: 16px;",
  imageFileInput: false,
};

export default function Editor(props: any) {
  return <SunEditor setOptions={editorOptions} {...props} />;
}
