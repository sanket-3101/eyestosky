export const apiConstants = {
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://3.95.198.60:3000/api/v1/admin/' : 'http://3.95.198.60:3000/api/v1/admin/',
    loginEmailPassword: 'auth/login',
    verifyPhoneNumber: 'auth/login-with-mobile',
    verifyOtp: 'auth/verify-otp',
    forgotPassword: 'auth/forgot_password',
    resetPassword: `auth/reset_password`,
    getProfile: 'profile',
    getProfileById: (id: string) => `user/${id}/details`,
    updateProfileById: (id: string) => `user/${id}`,                     
    updateProfileImage: 'profile/update-profile-image',
    updateProfile: 'profile',
    presign: 'presign',
    updateProfileAvatar: 'profile/avatar',
    addContact: 'contact/add-contact',
    postList: (details: any) => {
        let url = `post?page=${details.page}&search=${details.search}`;
        if (details.postType) {
            url += `&mediaType=${details.postType}`;
        }
        if (details.status) {
            url += `&status=${details.status}`;
        }
        return url;
    },
    postDetailsById: (id: string) => `post/${id}`,
    cms: 'cms/get-cms',
    getCmsPrivacyPolicy: 'cms/privacy_policy/details',
    getCmsTerms: 'cms/terms/details',
    getCmsAboutUs: 'cms/about_us/details',
    updateCmsPrivacyPolicy: 'cms/privacy_policy',
    updateCmsTerms: 'cms/terms',
    updateCmsAboutUs: 'cms/about_us',
    // getCases: (details: any) => `dashboard/get-cases?startIndex=${details.startIndex}&itemsPerPage=10&sortValue=1&search=${details.search}`,
    // getCaseDetails: 'dashboard/get-case/',
    // getService: 'service/get-services',
    // submitServiceRequest: 'service/add-service-request',
    getDisputeRequest: (details: any) => `contact/get-dispute-requests?startIndex=${details.startIndex}&itemsPerPage=10&sortValue=1&search=${details.search}&sortBy=createdAt`,
    getNotification: (details: any) => `notification/get-notifications?startIndex=${details.startIndex}&itemsPerPage=10`,
    sendFirebaseNotification: `profile/update-fcm`,
    getCasesByDate: (details: any) => `dashboard/get-all-cases?startDate=${details.startDate}&endDate=${details.endDate}`,
    getUserList: (details: any) => `user?page=${details.page}&search=${details.search}`,

    getHashtagList: (details: any) => `hashtag?page=${details.page}&search=${details.search}`,
    getHashtagDetailsById: (id: string) => `hashtag/${id}/details`,
    updateHashtagById: (id: string) => `hashtag/${id}`,
    sendNotification: () => `notification/send`,
    dashboard: () => `dashboard`

}
export enum apiState {
    loading = 'loading',
    idle = 'idle',
    succeeded = 'succeeded',
    failed = 'failed'

}

export interface UserDetailsType {
    first_name: string,
    last_name: string,
    avatar: string,
    email: string,
    salutation: string,
    id: string,
    user_name: string
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
    startIndex: number,
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