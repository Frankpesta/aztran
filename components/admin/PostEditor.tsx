"use client";

import TiptapImage from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  ImageIcon,
} from "lucide-react";
import { useCallback, useEffect, type ReactElement } from "react";
import { Button } from "@/components/ui/button";

/**
 * Tiptap-based rich text editor styled for institutional article composition.
 */
export function PostEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}): ReactElement {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      LinkExtension.configure({ openOnClick: true }),
      TiptapImage,
      Placeholder.configure({
        placeholder: "Compose the article body…",
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "min-h-[280px] outline-none px-3 py-2 font-body text-body text-[var(--color-navy)] dark:text-[var(--color-offwhite)] [&_h2]:font-display [&_h3]:font-display",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  if (!editor) {
    return <div className="min-h-[280px] rounded-md border bg-muted/30" />;
  }

  return (
    <div className="rounded-md border border-[color-mix(in_srgb,var(--color-navy)_15%,transparent)]">
      <div className="flex flex-wrap gap-1 border-b border-[color-mix(in_srgb,var(--color-navy)_12%,transparent)] bg-[var(--color-offwhite)] p-2 dark:bg-[color-mix(in_srgb,var(--color-navy)_88%,black)]">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "secondary" : "ghost"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "secondary" : "ghost"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={
            editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
        >
          <Heading2 className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={
            editor.isActive("heading", { level: 3 }) ? "secondary" : "ghost"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="Heading 3"
        >
          <Heading3 className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
        >
          <Quote className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <List className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered list"
        >
          <ListOrdered className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => setLink()}
          aria-label="Link"
        >
          <LinkIcon className="size-4" />
        </Button>
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => addImage()}
          aria-label="Insert image"
        >
          <ImageIcon className="size-4" />
        </Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
