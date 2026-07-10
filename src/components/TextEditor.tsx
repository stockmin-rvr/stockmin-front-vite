import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import {FaBold, FaItalic, FaUnderline, FaStrikethrough, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify} from "react-icons/fa";

interface TextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function TextEditor({value = "", onChange, placeholder = "Escriba aquí...", className = ""}: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight,
        Placeholder.configure({
        placeholder,
      }),
      TextAlign.configure({types: ["heading", "paragraph"]}),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate({ editor }) {onChange?.(editor.getHTML())}
  });

  if (!editor) return null;

  const buttonClass = (active: boolean) =>
    `w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200
      ${active? "bg-secondary-300 text-white": "hover:bg-primary-200 text-neutral-700"}
    `;

  return (
    <div
      className={`border border-primary-300 rounded-xl overflow-hidden bg-content ${className}`}
    >
      {/* ================= Toolbar ================= */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-primary-300">
        {/* Bold */}
        <button type="button" className={buttonClass(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()}>
          <FaBold />
        </button>

        {/* Italic */}
        <button type="button" className={buttonClass(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>

        {/* Underline */}
        <button type="button" className={buttonClass(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <FaUnderline />
        </button>

        {/* Strike */}
        <button type="button" className={buttonClass(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <FaStrikethrough />
        </button>

        <div className="w-px h-6 bg-primary-300 mx-1" />

        {/* Bullet */}
        <button type="button" className={buttonClass(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <FaListUl />
        </button>

        {/* Ordered */}
        <button type="button" className={buttonClass(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <FaListOl />
        </button>

        <div className="w-px h-6 bg-primary-300 mx-1" />

        <button type="button" className={buttonClass(editor.isActive({ textAlign: "left" }))} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
          <FaAlignLeft />
        </button>

        {/* Align Center */}
        <button type="button" className={buttonClass(editor.isActive({ textAlign: "center" }))} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
          <FaAlignCenter />
        </button>

        {/* Align Right */}
        <button type="button" className={buttonClass(editor.isActive({ textAlign: "right" }))} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
          <FaAlignRight />
        </button>

        {/* Justify */}
        <button type="button" className={buttonClass(editor.isActive({ textAlign: "justify" }))} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
          <FaAlignJustify />
        </button>
      </div>

      {/* ================= Editor ================= */}

      <EditorContent
        editor={editor}
        className=" py-2 ps-2 outline-none prose max-w-none"
      />
    </div>
  );
}