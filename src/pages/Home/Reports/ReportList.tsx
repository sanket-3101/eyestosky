import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../constant/axios";
import { apiConstants } from "../../../constant/constant";
import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";

interface ReportsApiItem {
  _id: string;
  reason: string;
  reporter: {
    _id: string;
    user_name: string;
    email: string;
  } | null;
  reported_user: {
    _id: string;
    user_name: string;
    email: string;
  } | null;
  reported_post: {
    _id: string;
    media_url: string;
    description: string;
  } | null;
}

interface ReportsListType {
  data: any[];
  totalItems: number;
  itemsPerPage: number;
  totalPage: number;
  pageNumber: number;
}

function ReportList() {
  const navigate = useNavigate();
  const [reportList, setReportList] = useState<ReportsListType | null>(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: "1", name: "Reason", fieldName: "reason", style: { width: "20%" } },
    { id: "2", name: "Reporter", fieldName: "reporter_name", style: { width: "20%" } },
    { id: "3", name: "Reporter Email", fieldName: "reporter_email", style: { width: "20%" } },
    { id: "4", name: "Reported Id", fieldName: "reported_id_display", style: { width: "20%" } },
    { id: "5", name: "Action", style: { width: "15%" } },
  ];

  useEffect(() => {
    getDetails({ page: 1, limit: 10, search: "" });
  }, []);

  const getDetails = async (params: { page: number; limit: number; search?: string }) => {
    try {
      const res: any = await axios.get(
        apiConstants.baseUrl + apiConstants.getReports({ page: params.page, limit: params.limit, search: params.search || '' })
      );
      const { data: payload } = res || {};
      const { total, total_pages, page, limit, data: items } = payload || {};
      const arrayItems: ReportsApiItem[] = Array.isArray(items) ? items : [];

      const mapped = arrayItems.map((item) => ({
        id: item._id,
        reason: item.reason,
        reporter_name: item.reporter?.user_name || "-",
        reporter_email: item.reporter?.email || "-",
        reported_post_id: item.reported_post?._id || null,
        reported_user_id: item.reported_user?._id || null,
        reported_id_display: item.reported_post?._id || item.reported_user?._id || "-",
      }));

      setReportList({
        data: mapped,
        totalItems: total,
        itemsPerPage: limit,
        totalPage: total_pages,
        pageNumber: page,
      });
    } finally {
      setLoading(false);
    }
  };

  const onActionClick = (row: any) => {
    if (row.reported_post_id) {
      navigate(`/post-list/edit/${row.reported_post_id}`);
      return;
    }
    if (row.reported_user_id) {
      navigate(`/user-list/edit/${row.reported_user_id}`);
      return;
    }
  };

  return loading || !reportList ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={reportList}
          columns={columns}
          onActionClick={onActionClick}
          onPageChange={(pageNumber: number) => getDetails({ page: pageNumber, limit: reportList.itemsPerPage, search: '' })}
          onSearchChange={(value: string) => getDetails({ page: 1, limit: reportList.itemsPerPage, search: value })}
        />
      </div>
    </section>
  );
}

export default ReportList;


