# React + TypeScript + Vite + Bootstrap

https://robert-j-wang.github.io/react_Tshirt/

#### 说明：

- ##### Tshirt购物车功能

- ##### 练习使用基础的React hooks和使用第三方库优化性能

#### 实现方式：

- ##### 版本1：useState + props逐层传递状态数据

- ##### 版本2：useState + useContext 隔空传递状态数据

- ##### 版本3：useState + useContainer (*react-tracked*提供的对象)，解决组件重绘问题

- ##### 版本4：useReducer+useContainer (*react-tracked*提供)，解决组件中手写action方法的问题

- ##### 版本5：useImmerReducer(immer + use-immer提供) + useContainer (*react-tracked*提供), 解决原状态不可变的问题，简化action方法

- ##### 版本6：useImmerReducer(immer + use-immer提供) + useContainer (*react-tracked*提供) + initAction(useImmerReducer的第三个参数)：添加initAction参数，性能优化，实现本地数据的存取



更新ing...

使用zustand库统一管理状态......

+ ##### 版本7： 使用zustand状态管理库

    

#### 配置问题：

webpack中可以通过resolve.alias定义项目路径别名，这样可以在引入文件时，不再需要使用相对路径，统一以根路径（/src/）作为起点。

1. 设置@绝对路径步骤

+ 初次使用ts的话，安装`@types/node`

    ```
    yarn add @types/node --save-dev
    ```

+ vite.config中添加配置

    ```ts
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import { join } from "node:path";
    
    // https://vitejs.dev/config/
    export default defineConfig({
      base: "/react_Tshirt/",
      plugins: [react()],
    
      // 配置@路径, 应用组件时使用@代替./src/
      resolve: {
        alias: {
          "@": join(__dirname, "src"),
        },
      },
    });
    ```

+ tsconfig.json 中添加配置

    ```json
    {
      "compilerOptions": {
          
        //添加这些 配置
        "baseUrl": ".",
        "paths": {
          "@/*": ["src/*"]
        },
    
       //... 其他
    
        /* Bundler mode */
        "moduleResolution": "node",   // 这里修改
        "allowImportingTsExtensions": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx",
          
      //... 其他
        }
    ```

+ 根路径下新建申明文件typing.d.ts，添加下面代码

    ```ts
    declare module "@/*";
    ```

+ 如果需要的话重启ts服务器 ： 

    + shift+command+p ->搜索 restart -> 选择 Restart ts Server

+ 使用@代替  “./src/ " 引入文件

