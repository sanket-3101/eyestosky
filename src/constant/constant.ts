export const apiConstants = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'https://api.rabsapp.in/api/v1/' : 'https://api.rabsapp.in/api/v1/',
    loginEmailPassword: 'auth/login',
    verifyPhoneNumber: 'auth/login-with-mobile',
    verifyOtp: 'auth/verify-otp',
    forgotPassword: 'auth/forgot-password',
    resetPassword: (token: string) => `auth/reset-password/${token}`,
    getProfile: 'profile/get-profile',
    updateProfileImage: 'profile/update-profile-image',
    updateProfile: 'profile/update-profile',
    addContact: 'contact/add-contact',
    cms: 'cms/get-cms',
    getCases: (details: any) => `dashboard/get-cases?startIndex=${details.startIndex}&itemsPerPage=10&sortValue=1&search=${details.search}`,
    getCaseDetails: 'dashboard/get-case/',
    getService: 'service/get-services',
    submitServiceRequest: 'service/add-service-request',
    getDisputeRequest: (details: any) => `contact/get-dispute-requests?startIndex=${details.startIndex}&itemsPerPage=10&sortValue=1&search=${details.search}&sortBy=createdAt`,
    getNotification: (details: any) => `notification/get-notifications?startIndex=${details.startIndex}&itemsPerPage=10`,
    sendFirebaseNotification: `profile/update-fcm`,
    getCasesByDate: (details: any) => `dashboard/get-all-cases?startDate=${details.startDate}&endDate=${details.endDate}`
}
export enum apiState {
    loading = 'loading',
    idle = 'idle',
    succeeded = 'succeeded',
    failed = 'failed'

}

export interface UserDetailsType {
    name: {
        firstName: string,
        lastName: string,
        fullName: string
        salutation: string
    },
    designation: string,
    email: string,
    mobile: string,
    moblieCode: string,
    origanization: string,
    userType: string,
    profilePicture: {
        key: string,
        url: string
    },
    whatsappMobile: string
}

export interface TotalCasesType {
    data: {
        description: string
        fileNumber: string
        lawyer: string
        notes: string
        title: string
        _id: string
    }[]
    Success: boolean,
    message: string,
    statusCode: number,
    totalItems: number,
    tartIndex: number,
    itemsPerPage: number,
    totalPage: number,
}

export interface DisputeRequestType {
    data: {
        _id: string,
        subject: string,
        message: string,
        isResolved: boolean
    }[],
    isSuccess: boolean,
    message: string,
    statusCode: number,
    totalItems: number,
    startIndex: number,
    itemsPerPage: number,
    totalPage: number,
}


export enum TableAction {
    view = 'view',
    edit = 'edit'
}