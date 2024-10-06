"use client";

import { Button } from "./ui/button";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Editör yükleniyor...</p>,
});

const TextEditor = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const toolbarOptions = [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <>
      {!isOpen && value.length === 0 && (
        <p
          onClick={() => setIsOpen(true)}
          className="cursor-pointer p-8 bg-slate-100 rounded-lg hover:bg-gray-300 transition-all"
        >
          Daha ayrıntılı bir açıklama ekleyin
        </p>
      )}
      {isOpen && (
        <>
          <ReactQuill
            className="h-32"
            theme="snow"
            modules={modules}
            value={value}
            onChange={setValue}
          />
          <div className="flex gap-4 mt-[4.5rem]">
            <Button className="bg-slate-700" onClick={() => setIsOpen(false)}>
              Kaydet
            </Button>
            <Button className="bg-gray-600" onClick={() => setIsOpen(false)}>
              İptal
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default TextEditor;
