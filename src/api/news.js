import service from '@/utils/request'
/**
 * 列表
 */
/**
 * 新增
 */
export function GetCategory(data) {
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}
export function AddFirstCategory(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}
export function DeleteCategory(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}
export function EditCategory(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}
