import axios from "axios";

axios.defaults.headers.common["Content-Type"] = "application/json";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
//   "auth"
// )}`;

// 리스트 조회
export async function fetchData(url, params) {
  let path = `${process.env.REACT_APP_API_HOST}/${url}`;
  if (params) {
    path = `${process.env.REACT_APP_API_HOST}/admin/users?page=1`;
  }

  const response = await axios.get(path, axios.defaults.headers.common);
  console.log(response.data);

  return response.data;
}

// 단건 조회
export async function getData(url, seq) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_HOST}/${url}/${seq}`,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  console.log(response.data);
  return response.data.data;
}

// get
export async function getData2(url, params) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_HOST}/${url}?${params}`,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// get
export async function getData3(url) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_HOST}/${url}`,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// 등록
export async function addData(url, params) {
  // console.log(`${process.env.REACT_APP_API_HOST}/${url}?${params}`);
  const response = await axios.post(
    `${process.env.REACT_APP_API_HOST}/${url}?${params}`,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// 폼등록
export async function addFormData(url, params) {
  const response = await axios.post(
    `${process.env.REACT_APP_API_HOST}/${url}`,
    params,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

export async function addFormData2(url, params) {
  const response = await axios.post(
    `${process.env.REACT_APP_API_HOST}/${url}`,
    params,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// JSON 등록
export async function addJsonData(url, params) {
  // console.log(JSON.stringify(Object.fromEntries(params)));
  const response = await axios.post(
    `${process.env.REACT_APP_API_HOST}/${url}`,
    params,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// 수정
export async function editData(url, params) {
  const response = await axios.put(
    `${process.env.REACT_APP_API_HOST}/${url}`,
    JSON.stringify(Object.fromEntries(params)),
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// 폼수정
export async function editFormData(url, params) {
  console.log(axios.defaults.headers.common);
  const response = await axios.put(
    `${process.env.REACT_APP_API_HOST}/${url}`,
    params,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// 수정
export async function editJsonData(url, params) {
  const response = await axios.put(
    `${process.env.REACT_APP_API_HOST}/${url}`,
    params,
    axios.defaults.headers.common
  );
  if (response.data.code === -1002) {
    alert(response.data.msg);
  }
  return response.data;
}

// 삭제
export async function deleteData(url, params) {
  const response = await axios.delete(
    `${process.env.REACT_APP_API_HOST}/${url}/${params}`,
    axios.defaults.headers.common
  );
  return response.data;
}
