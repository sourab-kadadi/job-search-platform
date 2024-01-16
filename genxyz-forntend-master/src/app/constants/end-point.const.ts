import {environment} from '../../environments/environment';

export class EndPointConst {
    public static REFRESH_TOKEN = environment.server + "/auth/renew-token"
    public static CUSTOMER_SIGN_UP = environment.server + "/auth/signUp";

    public static CANDIDATE_SIGN_UP = environment.server + "/auth/candidate/signUp";
    public static COMPANY_SIGN_UP = environment.server + "/auth/company/signUp";


    public static LOGIN = environment.server + "/auth/login";
    public static LOGIN_CLIENT = environment.server + "/auth/login-client";
    public static LOGOUT = environment.server + "/auth/logout";
    public static UPDATE_CANDIDATE_USER_INFO = environment.server + "/auth/candidate/update";
    public static GET_USER_INFO = environment.server + "/auth/user";


    //Profile
    public static GET_CATEGORY_LIST_DROPDOWN = environment.server + "/category/drop-down/all";
    public static CREATE_PROFILE = environment.server + "/profile/create";
    public static GET_MY_PROFILE = environment.server + "/profile/findMyProfile";
    public static UPDATE_MY_PROFILE = environment.server + "/profile/updateMyProfile";

    public static COMPANY_CREATE = environment.server + "/giver-details/create";
    public static GET_PRESIGNED_S3_URL = environment.server + "/aws/preSignedUrl"

    // category
    public static GET_ALL_CATEGORY = environment.server + "/category/active/all";
    public static GET_ALL_SUB_CATEGORY = environment.server + "/sub-category/active";

    //Profile
    public static FIND_CANDIDATE_PROFILE = environment.server + "/candidate-profile/find/";
    public static CREATE_CANDIDATE_PROFILE = environment.server + "/candidate-profile/create";
    public static UPDATE_CANDIDATE_PROFILE = environment.server + "/candidate-profile/update/";

    //Profile
    public static FIND_JOB_POST_PROFILE = environment.server + "/job-post/find/";
    public static FIND_JOB_POST_CANDIDATE = environment.server + "/job-post/candidate/find/";
    public static CREATE_JOB_POST_PROFILE = environment.server + "/job-post/create";
    public static UPDATE_JOB_POST_PROFILE = environment.server + "/job-post/update/";
    public static FIND_MY_JOB_POST_PROFILE = environment.server + "/job-post/all";
    public static GET_JOB_LIST_CANDIDATE = environment.server + "/job-post/candidate";
    public static APPLY_JOB = environment.server + "/job-apply";

    // public static FIND_JOB_DETAILS = environment.server + "/job-post/find";





    // public API

    public static GET_ALL_COUNTRY = "https://countriesnow.space/api/v0.1/countries/positions";
    public static GET_ALL_CITY = "https://countriesnow.space/api/v0.1/countries/state/cities";
    public static GET_ALL_STATE = "https://countriesnow.space/api/v0.1/countries/states";

}