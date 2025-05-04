import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../constant/axios';
import { UserDetailsType, apiConstants } from '../../constant/constant';
import { navigateToScreen } from './Navigation';
import { AxiosError } from 'axios';

interface AuthState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: any;
  phoneNumber: string
  isLoggedIn: boolean,
  profileDetails: UserDetailsType,
  firebaseToken: string,
  showNotificationMark: boolean
}

interface LoginWithEmailPasswordArgs {
  email: string;
  password: string;
}

interface VerifyPhoneNumberArgs {
  phoneNumber: string;
}

interface VerifyOTPArgs {
  otp: number;
  phoneNumber: string,
}

export const loginWithEmailPassword = createAsyncThunk(
  'auth/loginWithEmailPassword',
  async ({ email, password }: LoginWithEmailPasswordArgs, thunkAPI) => {

    const response = await axios.post(apiConstants.baseUrl + apiConstants.loginEmailPassword, {
      email,
      password,
    }).then((response) => {
      if (response.data.authToken) {
        localStorage.setItem('auth_token', response.data.authToken)
      }

      return thunkAPI.fulfillWithValue(response.data);
    }).catch((error: AxiosError) => {
      return thunkAPI.rejectWithValue(error.response?.data);
    })

    return response

  }
);

export const verifyPhoneNumber = createAsyncThunk(
  'auth/verifyPhoneNumber',
  async ({ phoneNumber }: VerifyPhoneNumberArgs, thunkAPI) => {

    const response = await axios.post(apiConstants.baseUrl + apiConstants.verifyPhoneNumber, {
      mobileCode: "+91",
      mobile: phoneNumber
    }).then(async (response) => {
      await thunkAPI.dispatch(navigateToScreen('otp'))

      return thunkAPI.fulfillWithValue({
        ...response.data,
        phoneNumber
      });
    }).catch((error: AxiosError) => {
      return thunkAPI.rejectWithValue(error.response?.data);
    })
    return response
  }

);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ otp, phoneNumber }: VerifyOTPArgs, thunkAPI) => {

    const response = await axios.post(apiConstants.baseUrl + apiConstants.verifyOtp, {
      mobileCode: "+91",
      otp: otp.toString(),
      mobile: phoneNumber,
    }).then((response) => {
      console.log(response)
      if (response.data.authToken) {
        localStorage.setItem('auth_token', response.data.authToken)
      }
      return thunkAPI.fulfillWithValue(response.data);
    }).catch((error: AxiosError) => {
      return thunkAPI.rejectWithValue(error.response?.data);
    });

    return response
  }
);

// export const sendFirebaseToken = createAsyncThunk(
//   'firebaseNotification/send-firebase-notification',
//   async (token: any, thunkAPI) => {
//     const response = await axios.post(apiConstants.baseUrl + apiConstants.sendFirebaseNotification, {
//       fcmToken: token
//     }).then((response) => {
//       console.log('firebase response ===>', response)
//       return thunkAPI.fulfillWithValue(token);
//     }).catch((error: AxiosError) => {
//       console.log(error)
//       return thunkAPI.rejectWithValue(error.response?.data);
//     });

//     return response
//   }
// );

export const getProfileDetails = createAsyncThunk(
  'profile/get-profile',
  async (data: any, thunkAPI) => {
    const response = await axios.get(apiConstants.baseUrl + apiConstants.getProfile).then((response) => {
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data);
    }).catch((error: AxiosError) => {
      console.log(error)
      return thunkAPI.rejectWithValue(error.response?.data);
    });

    return response
  }
);



export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    error: null,
    phoneNumber: '',
    isLoggedIn: false,
    profileDetails: {},
    firebaseToken: '',
    showNotificationMark: false
  } as AuthState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
    },
    setUserProfileDetails: (state, action) => {
      state.profileDetails = action.payload
    },
    resetState: (state, action) => {
      state.status = 'idle'
      state.error = null
      state.phoneNumber = ''
      state.isLoggedIn = false
    },
    setFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload
    },
    showNotificationMark : (state, action) => {
      state.showNotificationMark = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithEmailPassword.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginWithEmailPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true
      })
      .addCase(loginWithEmailPassword.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'failed';
      })
      .addCase(verifyPhoneNumber.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyPhoneNumber.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.phoneNumber = action.payload.phoneNumber
      })
      .addCase(verifyPhoneNumber.rejected, (state, action) => {
        state.error = action.payload
        state.status = 'failed';
      })
      .addCase(verifyOTP.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(getProfileDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProfileDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileDetails = action.payload
      })
      .addCase(getProfileDetails.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
      // .addCase(sendFirebaseToken.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.firebaseToken =  action.payload;
      // })
      // .addCase(sendFirebaseToken.rejected, (state, action) => {
      //   state.error = action.payload;
      //   state.status = 'failed';
      //   state.firebaseToken =  '';
      // })

  },
});

export default authSlice.reducer;
export const { setLoggedIn, setUserProfileDetails, resetState, setFirebaseToken, showNotificationMark } = authSlice.actions