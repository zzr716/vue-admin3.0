import { GetCategory } from "@/api/news"

const actions = {
    getInfoCategory(content, repuestData) {
        return new Promise((resolve, reject) => {
            GetCategory({}).then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    actions
};