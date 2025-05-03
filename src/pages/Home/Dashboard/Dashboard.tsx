import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventClickArg } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { apiConstants } from "../../../constant/constant";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHook";
import { getFirebaseToken } from "../../../constant/util";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<{}[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const profileDetails = useAppSelector((state) => state.auth); 
  const firebaseToken = useAppSelector((state) => state.auth.firebaseToken);
  
  // console.log('fIREBASE TOKEN ===>', firebaseToken)
  // useEffect(() => {
  //   // Get current date
  //   const currentDate = moment();

  //   // Get first day of the current month
  //   const firstDayOfMonth = currentDate.clone().startOf("month");

  //   // Get last day of the current month
  //   const lastDayOfMonth = currentDate.clone().endOf("month");

  //   // Format dates in yyyy-mm-dd format
  //   const startDate = firstDayOfMonth.format("YYYY-MM-DD");
  //   const endDate = lastDayOfMonth.format("YYYY-MM-DD");

  //   console.log(startDate, endDate);
  //   const data = {
  //     startDate,
  //     endDate
  //   };
  //   getCases(data);
  // }, []);


  // useEffect(() => {
  //   if(Object.keys(profileDetails.profileDetails).length) {
  //     getFirebaseToken(dispatch)
  //   }
  // }, [profileDetails])
  const getCasesBgColor = (orders: { priority: string }[]) => {
    const lastOrder = orders[0];
    if (lastOrder) {
      if (lastOrder.priority === "high") {
        return "#dc3545";
      } else if (lastOrder.priority === "medium") {
        return "#777";
      } else if (lastOrder.priority === "low") {
        return "#6cac6a";
      } else {
        return "blue";
      }
    }
  };
  const getCases = async (data: any) => {
    const details = {
      startDate: data.startDate,
      endDate: data.endDate
    };
    await axios
      .get(apiConstants.baseUrl + apiConstants.getCasesByDate(details))
      .then(response => {
        if (response.data) {
          const events = [] as {}[];
          response.data.forEach((data: any) => {
            events.push({
              caseId: data._id,
              start: moment(data.upcomingHearing).format("YYYY-MM-DD"),
              allDay: true,
              title: data.title,
              backgroundColor: getCasesBgColor(data.orders)
            });
            // if (data.orders) {
            //   data.orders.forEach((item: any) => {
            //     events.push({
            //       caseId: data._id,
            //       start: moment(item.upcomingHearing).format("YYYY-MM-DD"),
            //       allDay: true,
            //       title: data.title,
            //       backgroundColor: getCasesBgColor(data.orders)
            //     });
            //   });
            // }
          });
          setEvent(events);
        }
      });
    setInitialLoad(false);
  };

  const handleEventClick = (arg: EventClickArg) => {
    // alert(`Event title: ${arg.event.title}\nEvent start: ${arg.event.start}`);
    navigate(`/total-case/view-case/${arg.event.extendedProps.caseId}`);
    const tooltip = document.getElementsByClassName("fc-event-tooltip")[0];
    document.body.removeChild(tooltip);
  };
  const handleDatesSet = (arg: any) => {
    if (!initialLoad) {
      setEvent([]);
      const data = {
        startDate: moment(arg.start).format("YYYY-MM-DD"),
        endDate: moment(arg.end).format("YYYY-MM-DD")
      };
      getCases(data);
    }
  };

  const handleEventMouseEnter = (arg: any) => {
    if (arg.el) {
      const tooltip = document.createElement("div");
      tooltip.className = "fc-event-tooltip";
      tooltip.innerHTML = arg.event.title;

      // Calculate position relative to the event
      const eventRect = arg.el.getBoundingClientRect();
      const tooltipTop = eventRect.top + window.scrollY;
      const tooltipLeft = eventRect.right + window.scrollX;

      // Set tooltip position
      tooltip.style.position = "absolute";
      tooltip.style.top = `${tooltipTop}px`;
      tooltip.style.left = `${tooltipLeft}px`;

      // Append tooltip to the document body
      document.body.appendChild(tooltip);

      // Add mouseleave event listener to remove the tooltip
      const handleMouseLeave = () => {
        document.body.removeChild(tooltip);
        arg.el.removeEventListener("mouseleave", handleMouseLeave);
      };

      arg.el.addEventListener("mouseleave", handleMouseLeave);
    }
  };
  return (
    <div style={{ background: "white", height: "90vh", padding: "3%" }}>
      {/* <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek"
        }}
        initialView="dayGridMonth"
        events={event}
        eventClick={handleEventClick}
        height="80vh"
        datesSet={e => handleDatesSet(e)}
        weekNumberCalculation="local"
        eventMouseEnter={handleEventMouseEnter}
        // eventMouseLeave={handleEventMouseLeave}
      /> */}
    </div>
  );
}

export default Dashboard;
