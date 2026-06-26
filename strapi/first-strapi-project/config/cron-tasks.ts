// 定时任务

export default {
  myJob1: {
    task: ({ strapi }) => {
      console.log("每日 12 点执行一次！");
    },
    options: {
      /*
        秒 分 时 日 月 周

        取值范围（常用理解）
        - 秒：0-59
        - 分：0-59
        - 时：0-23
        - 日：1-31
        - 月：1-12
        - 周：0-7（通常 0/7=周日，1=周一…6=周六

        常用写法
        - * ：任意值
        - *\/n ：每 n 个单位（步长）
        - a-b ：范围
        - a,b,c ：枚举多个值
      */
      rule: "0 0 12 * * *",
      tz: "Asia/Shanghai",
    },
  },
  myJob2: {
    task: ({ strapi }) => {
      console.log("服务启动后 10 秒执行一次！");
    },
    options: new Date(Date.now() + 10000),
  },
  myJob3: {
    task: ({ strapi }) => {
      console.log("服务启动后 20 秒到 30 秒之间每秒执行一次！");
    },
    options: {
      rule: "* * * * * *",
      // 从 20 秒后开始执行
      start: new Date(Date.now() + 20000),
      // 到 30 秒后结束
      end: new Date(Date.now() + 30000),
      tz: "Asia/Shanghai",
    },
  },
};