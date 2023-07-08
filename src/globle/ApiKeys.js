const BaseUrl = "http://localhost:5000"

// const GET = "get";
// const POST = "post";
// const PUT = "put";
// const DELETE = "delete";

const ApiConst = {
    verify_mobile_no: `${BaseUrl}/admin/verify_mobile_no`,
    verify_admin: `${BaseUrl}/admin/verify_admin`,
    get_all_property_list: `${BaseUrl}/admin/get_all_property_list`,
    get_details_of_owner: `${BaseUrl}/admin/get_details_of_owner/`,
    delete_the_property: `${BaseUrl}/admin/delete_the_property/`,
    get_all_users_list: `${BaseUrl}/admin/get_all_users_list`,
    delete_user: `${BaseUrl}/admin/delete_user/`,
    edit_user: `${BaseUrl}/admin/edit_user/`,
    edit_user_status: `${BaseUrl}/admin/edit_user_status/`,
    unblock_user_status: `${BaseUrl}/admin/unblock_user_status/`,
    getallcomplains: `${BaseUrl}/complain/list`,
    getComplain: `${BaseUrl}/complain/get_id_of_complain/`,
    suspendProperties: `${BaseUrl}/property/suspend/`,
    getAllAgentDetais: `${BaseUrl}/agent/getAllAgentsDetails`,
    suspendPlan: `${BaseUrl}/agent/suspendPlans/`,
    deleteAgent: `${BaseUrl}/agent/deleteAgent/`,
    lastFiveReviews: `${BaseUrl}/agent/viewHistory/`,
    agentComplain: `${BaseUrl}/agent/totalEnqiries/`,
    getrAllFinanceDetail: `${BaseUrl}/agent/financeAndAccount`,
    getNewsLetters: `${BaseUrl}/agent/newsLetter`,
    blockTheMail: `${BaseUrl}/agent/restrictMail/`,
    dashbordData: `${BaseUrl}/admin/dashboard`,
    supportManagementList: `${BaseUrl}/supportManagement/getEnquiries`,
    resolveEnqueries: `${BaseUrl}/supportManagement/resolvedQuery/`,
    propertyReview: `${BaseUrl}/property/propertyReview/`,
}

export default ApiConst;