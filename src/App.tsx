import { useEffect, useState } from "react";
import Routes from "./Routes";
import { useAppDispatch } from "./redux/reduxHook";
import { setFirebaseToken, setLoggedIn, showNotificationMark } from "./redux/slice/Auth";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   handleFirebaseToken()
  // }, [])
  const CustomToast = ({ title, message }: { title: string, message: string }) => (
    <div>
      <strong style={{ fontSize: '16px', color: '#007bff' }}>{title}</strong> {/* Styled Title */}
      <div style={{ marginTop: '5px', fontSize: '14px', color: '#333' }}>{message}</div> {/* Styled Message */}
    </div>
  );


  // useEffect(() => {
  //   onMessage(messaging, (payload: any) => {
  //     console.log(payload)
  //     const { title, body } = payload.notification;
  //     dispatch(showNotificationMark(true))
  //     toast.info(<CustomToast title={title} message={body} />, {
  //       position: "top-right",
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       className: 'custom-toast',  // Optional class for further styling
  //       autoClose: false,
  //       // onClick: () => {
  //       //   navigate('/notification');  // Redirect to your desired route
  //       // }
  //     });
  //   })
  // }, [])

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (token && JSON.stringify(token)) {
      dispatch(setLoggedIn(true));
    }
  }, []);
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
