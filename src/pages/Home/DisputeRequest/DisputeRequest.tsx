import { useEffect, useState } from "react";
import axios from "../../../constant/axios";
import { DisputeRequestType, apiConstants } from "../../../constant/constant";
import { Loader } from "../../../component/Loader";
import TableSection from "../../../component/Table/Table";
function DisputeRequest() {
  const [details, setDetails] = useState<DisputeRequestType | null | any>(null);

  const [loading, setLoading] = useState(true);
  const columns = [
    {
      id: "1",
      name: "Subject",
      fieldName: "subject",
    },
    {
      id: "2",
      name: "Message",
      fieldName: "message",
    },
    {
      id: "3",
      name: "Status",
      fieldName: "status",
    },
  ];

  useEffect(() => {
    getDetails({
      pageNumber: 1,
      search: "",
    });
  }, []);

  const getDetails = async (data: any) => {
    const details = {
      search: data.search,
      startIndex: data.pageNumber,
    };
    await axios
      .get(apiConstants.baseUrl + apiConstants.getDisputeRequest(details))
      .then((response) => {
        setDetails(response);
        setLoading(false);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <section className="card">
      <div className="card-body">
        <TableSection
          data={details}
          columns={columns}
          onPageChange={(pageNumber: number) =>
            getDetails({ search: "", pageNumber: pageNumber })
          }
          onSearchChange={(value: string) =>
            getDetails({ search: value, pageNumber: details.startIndex })
          }
        />
      </div>
    </section>
  );
}

export default DisputeRequest;
