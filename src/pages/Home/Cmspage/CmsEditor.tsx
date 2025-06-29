import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";
import { showToast } from "../../../constant/util";
import { Loader } from "../../../component/Loader";

interface CmsData {
  description: string;
}

const CmsEditor = () => {
  const { type } = useParams<{ type: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (type) {
      getCmsContent();
    }
  }, [type]);

  const getCmsContent = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      switch (type) {
        case 'about_us':
          endpoint = apiConstants.getCmsAboutUs;
          break;
        case 'privacy_policy':
          endpoint = apiConstants.getCmsPrivacyPolicy;
          break;
        case 'terms':
          endpoint = apiConstants.getCmsTerms;
          break;
        default:
          showToast("Invalid page type", { type: "error" });
          navigate('/cms');
          return;
      }

      const response = await axios.get(apiConstants.baseUrl + endpoint);
      if (response.data && response.data.description) {
        setContent(response.data.description);
      }
    } catch (error) {
      console.error('Error fetching CMS content:', error);
      showToast("Error loading content", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!type) {
      showToast("Invalid page type", { type: "error" });
      return;
    }

    setSaveLoading(true);
    try {
      let endpoint = '';
      switch (type) {
        case 'about_us':
          endpoint = apiConstants.updateCmsAboutUs;
          break;
        case 'privacy_policy':
          endpoint = apiConstants.updateCmsPrivacyPolicy;
          break;
        case 'terms':
          endpoint = apiConstants.updateCmsTerms;
          break;
        default:
          showToast("Invalid page type", { type: "error" });
          return;
      }

      const payload = {
        description: content
      };

      const response = await axios.put(apiConstants.baseUrl + endpoint, payload);
      
      if (response.data) {
        showToast("Content saved successfully", { type: "success" });
      }
    } catch (error) {
      console.error('Error saving CMS content:', error);
      showToast("Error saving content", { type: "error" });
    } finally {
      setSaveLoading(false);
    }
  };

  const getPageTitle = () => {
    switch (type) {
      case 'about_us':
        return 'About Us';
      case 'privacy_policy':
        return 'Privacy Policy';
      case 'terms':
        return 'Terms & Conditions';
      default:
        return 'CMS Editor';
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ color: '#04105a' }}>{getPageTitle()}</h2>
          <button 
            onClick={() => navigate('/cms-page')}
            className="btn btn-outline-secondary"
          >
            <i className="bx bx-arrow-back me-2"></i>
            Back to CMS
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={CmsEditor.modules}
            formats={CmsEditor.formats}
            placeholder="Write your content here..."
            style={{ height: '400px', marginBottom: '50px' }}
          />
        </div>

        <div className="d-flex gap-2">
          <button 
            onClick={handleSave} 
            className="btn btn-primary"
            disabled={saveLoading}
          >
            {saveLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="bx bx-save me-2"></i>
                Save Changes
              </>
            )}
          </button>
          <button 
            onClick={() => navigate('/cms-page')}
            className="btn btn-outline-secondary"
            disabled={saveLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
};

// Toolbar settings
CmsEditor.modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ['link', 'image'],
    ['clean']
  ]
};

CmsEditor.formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'color', 'background',
  'align',
  'link', 'image'
];

export default CmsEditor;
