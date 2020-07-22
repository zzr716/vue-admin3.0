import { GetCategory } from "@/api/news"
import { reactive } from "@vue/composition-api";

export function common() {
    const category = reactive({
        item: []
    })
    /**
     * 获取分类
     */
    const getInfoCategory = () => {
        GetCategory({}).then(response => {
            console.log('common')
            console.log(response.data.data.data)
            category.item = response.data.data.data
        }).catch(error => {

        })
    }
    return {
        getInfoCategory,
        category
    }
}