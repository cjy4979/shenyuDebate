import request from 'umi-request';
 
 
 
export const List=async (page: any)=>{
 
    return request('/api/enroll', {
        method: 'get',
        page,
        credentials: 'same-origin'
    })
}