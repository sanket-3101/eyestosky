import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { TotalCasesType, apiConstants } from "../../../constant/constant";

import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
import FilterPopup from "../../../component/FilterPopup";


interface PosListType {
  data: {
    id: string;
    created_at: string;
    media_type: string;
    status: string;
    media_url: string;
  }[];
  totalItems: number;
  itemsPerPage: number;
  totalPage: number;
  pageNumber: number
}

function PostList() {
  const navigate = useNavigate();
  const [postlist, setPostList] = useState<PosListType | null | any>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowpopup] = useState(false);
  const [showDownloadLoading, setShowDownloadLoading] = useState(false);
  const [currentFilters, setCurrentFilters] = useState({
    status: "",
    postType: ""
  });

  const columns = [
    {
      id: "1",
      name: "Date",
      fieldName: "created_at",
      style: {
        width: "20%",
      },
    },
    {
      id: "2",
      name: "Post-Type",
      fieldName: "media_type",
      style: {
        width: "20%",
      },
    },

    {
      id: "4",
      name: "Username",
      fieldName: "username",
      style: {
        width: "15%",
      },
    },
    {
      id: "4",
      name: "Status",
      fieldName: "status",
      style: {
        width: "15%",
      },
    },
    {
      id: "5",
      name: "Action",
      style: {
        width: "10%",
      },
    },
  ];
  useEffect(() => {
    getDetails({
      page: 1,
      search: "",
    });
  }, []);

  const getDetails = async (data: any) => {
    const details = {
      search: data.search,
      page: data.page,
      status: data.status !== undefined ? data.status : currentFilters.status,
      media_type: data.postType !== undefined ? data.postType : currentFilters.postType,
    };
    await axios
      .get(apiConstants.baseUrl + apiConstants.postList(details))
      .then((response) => {
        console.log(response.data)
        const { data } = response
        const updatedData = data.data.map((item: any) => ({
          ...item,
          username: item.user.user_name
        }));
        if (data) {
          const details = {
            pageNumber: data.page,
            totalItems: data.total,
            itemsPerPage: data.limit,
            totalPage: data.total_pages,
            data: updatedData,
          }
          setPostList(details);
        }
        setLoading(false);
      });
  };

  const onApplyFilter = async (filters: any) => {
    setCurrentFilters(filters);
    await getDetails({
      search: "",
      page: 1,
      status: filters.status,
      postType: filters.postType,
    });
    setShowpopup(false);
  };

  const handleDownload = async (audioUrl: string) => {
    try {
      setShowDownloadLoading(true);
      const response = await fetch(
        audioUrl
      );
  
      if (!response.ok) throw new Error("Network response was not ok");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = audioUrl.split("/").pop() || "audio.m4a"; // You can set any file name here
      a.click();
  
      // Cleanup
      window.URL.revokeObjectURL(url);
      setShowDownloadLoading(false);
    } catch (error) {
      setShowDownloadLoading(false);
      console.error("Download failed:", error);
    }
  };

  const onActionClick = (data: any) => {
    navigate(`view/${data.id}`);
  };

  const onEditAction = (data: any) => {
    navigate(`edit/${data.id}`);
  }

  const onDownloadAction = (data: any) => {
    handleDownload(data.media_url);
  }

  const onCustomButtonClick = () => {
    setShowpopup(true)
  }

  const isFilterApplied = currentFilters.status !== "" || currentFilters.postType !== "";

  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={postlist}
          columns={columns}
          onActionClick={onActionClick}
          onEditAction={onEditAction}
          onCustomButtonClick={onCustomButtonClick}
          customButtonName={
            <span style={{ position: 'relative', display: 'inline-block', paddingRight: '18px' }}>
              Add Filter
              {isFilterApplied && (
                <span style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 10,
                  height: 10,
                  background: 'red',
                  borderRadius: '50%',
                  display: 'inline-block',
                  border: '2px solid white',
                  zIndex: 1,
                }} />
              )}
            </span>
          }
          showCustomButton={true}
          onPageChange={(pageNumber: number) =>
            getDetails({ search: "", page: pageNumber })
          }
          onSearchChange={(value: string) =>
            getDetails({ search: value, page: 1 })
          }
          onDownloadAction={onDownloadAction}
        />
      </div>
      {showPopup && (
        <FilterPopup
          closeModal={() => setShowpopup(false)}
          onApplyFilter={onApplyFilter}
          initialFilters={currentFilters}
        />
      )}
      {showDownloadLoading && ( 
        <Loader />
      )}
    </section>
  );
}

export default PostList;
