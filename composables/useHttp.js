// 處理錯誤
function handleError(response) {
  const err = (text) => {
    // Message.error({ content: response?._data?.message ?? text });
    console.log({ content: response?._data?.message ?? text });
  };

  if (!response._data) {
    err("请求超时，服务器无响应！");
    return;
  }

  const userStore = useUserStore();

  const handleMap = {
    404: () => err("服务器资源不存在"),
    500: () => err("服务器内部错误"),
    403: () => {
      err("没有权限访问该资源");
      userStore.clearUserInfo();
      // TODO 跳转实际登录页
      navigateTo("/");
    },
    401: () => {
      err("登录状态已过期，需要重新登录");
      userStore.clearUserInfo();
      // TODO 跳转实际登录页
      navigateTo("/");
    },
  };

  if (handleMap[response.status]) {
    handleMap[response.status]();
  } else {
    err("未知错误！");
  }
}

// get 方法传递数组形式参数
function paramsSerializer(params) {
  if (!params) return;

  const query = useCloneDeep(params);

  Object.entries(query).forEach(([key, val]) => {
    if (typeof val === "object" && Array.isArray(val) && val !== null) {
      query[`${key}[]`] = toRaw(val).map((v) => JSON.stringify(v));
      delete query[key];
    }
  });

  return query;
}

const fetch = $fetch.create({
  // 请求拦截器
  onRequest({ options }) {
    // get方法传递数组形式参数
    options.params = paramsSerializer(options.params);

    // 添加baseURL, nuxt3环境变量要从useRuntimeConfig里面取
    const {
      public: { apiBase },
    } = useRuntimeConfig();
    options.baseURL = apiBase;
    console.log(apiBase);

    // 添加请求头, 没登录不携带token
    // const userStore = useUserStore();
    // console.log("111");
    // if (!userStore.isLogin) return;
    // console.log("222");
    const cookie = useCookie("token");
    if (!cookie.value) return;

    options.headers = new Headers(options.headers);
    options.headers.set("Authorization", `Bearer ${cookie.value}`);
  },

  // 响应拦截
  onResponse({ response }) {
    console.log(response);
    if (response.headers.get("content-disposition") && response.status === 200)
      return response;

    // 在这里判断错误
    // if (response._data.code !== 200) {
    if (response.status !== 200) {
      handleError(response);
      return Promise.reject(response._data);
    }

    // 成功返回
    return response._data;
  },

  // 错误处理
  onResponseError({ response }) {
    handleError(response);
    return Promise.reject(response?._data ?? null);
  },
});

export const useHttp = {
  get(url, params) {
    return fetch(url, { method: "get", params });
  },

  post(url, body) {
    return fetch(url, { method: "post", body });
  },

  put(url, body) {
    return fetch(url, { method: "put", body });
  },

  delete(url, body) {
    return fetch(url, { method: "delete", body });
  },
};
