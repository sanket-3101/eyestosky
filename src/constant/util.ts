import { toast, ToastOptions } from "react-toastify";
// import { generateToken } from "../notification/firebase";



export const showToast = (msg: string, props: ToastOptions) => {
    return toast(msg, {
        autoClose: 3000,
        theme: "light",
        position: "top-right",
        ...props,
    });
}
export const  formatDate =(dateString: string) => {
    if(!dateString) {
        return
    }
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
  

// export const getFirebaseToken = async (dispatch : any) => {
//     const local_firebase_token = await localStorage.getItem('firebase_token')
//     console.log('Token ==>', local_firebase_token)
//     if (local_firebase_token) {
//       dispatch(setFirebaseToken(local_firebase_token))
//       return local_firebase_token
//     }

//     const token = await generateToken()
//     if (!token) return
//     await localStorage.setItem('firebase_token', token)
//     dispatch(sendFirebaseToken(token))
//     return token
// }