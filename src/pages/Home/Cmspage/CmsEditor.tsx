import { useState } from "react";
import ReactQuill from 'react-quill';
const CmsEditor = () => {
  const [content, setContent] = useState('');

  const handleSave = () => {
    // You can send 'content' to your database or CMS backend here
    // onSave(content);
  };

  return (
     <section className="card">
      <div className="card-body">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={CmsEditor.modules}
        formats={CmsEditor.formats}
        placeholder="Write your HTML content here..."
      />
      <button onClick={handleSave} className="btn btn-primary mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Save Page
      </button>
    </div>
    </section>
  );
};

// Toolbar settings (optional, but useful)
CmsEditor.modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean']
  ]
};

CmsEditor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image'
];

export default CmsEditor;
