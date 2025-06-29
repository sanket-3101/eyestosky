import { useEffect, useState } from "react";
import { DisputeRequestType } from "../../../constant/constant";
import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";

interface CmsPageType {
  id: string;
  title: string;
  type: string;
  description?: string;
}

function Cmspage() {
  const [loading, setLoading] = useState(true);
  const [cmsPages, setCmsPages] = useState<CmsPageType[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      id: "1",
      name: "Title",
      fieldName: "title",
    },
    {
      id: "2",
      name: "Action",
      style: {
        width: "10%",
      },
    },
  ];

  useEffect(() => {
    getCmsPages();
  }, []);

  const getCmsPages = async () => {
    setLoading(true);
    try {
      const pages = [
        { id: 'about-us', title: 'About Us', type: 'about_us' },
        { id: 'privacy-policy', title: 'Privacy Policy', type: 'privacy_policy' },
        { id: 'terms', title: 'Terms & Conditions', type: 'terms' }
      ];
      setCmsPages(pages);
    } catch (error) {
      console.error('Error fetching CMS pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const onActionClick = (data: CmsPageType) => {
    navigate(`cms-editor/${data.type}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <h2 className="mb-4" style={{ color: '#04105a' }}>CMS Pages</h2>
        <TableSection
          data={{
            data: cmsPages,
            totalItems: cmsPages.length,
            itemsPerPage: 10,
            totalPage: 1,
            pageNumber: 1
          }}
          columns={columns}
          onActionClick={onActionClick}
        />
      </div>
    </section>
  );
}

export default Cmspage;
