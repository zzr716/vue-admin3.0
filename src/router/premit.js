import router from "./index";
import { getToken } from "@/utils/app.js";

const whiteRouter = ['/login']; // indexOF方法，判断数组是否存在指定某个对象,不存在返回-1
// 路由守卫
router.beforeEach((to, from, next) => {
    if(getToken()){
        console.log('存在')
        next();
        // 路由动态添加，分配菜单，每个角色分配不同菜单
    }else {
        // next('/login')
        if(whiteRouter.indexOf(to.path) !== -1) { //存在
            next()
        }else{
            next('/login')
        }
        console.log("no exist")
        /**
         * 1、直接进入index的时候，参数to被改变成/index，触发路由指向，就会跑beforeEach
         * 2、再一次next指向了login，再次发生路由指向，再跑beforeEcah，参数to被改变成了/login
         * 3、白名单判断存在，则直接执行next，因为没有参数，不会跑beforeEach
         */
    }
  console.log(to) //下一个页面
  console.log(from) // 离开之前的页面（上一个）
  console.log(next)
  next()  // to
})