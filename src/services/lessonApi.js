import api from "./api";

export async function getLesson(id, token) {
  const response = await api.get(`/lessons/:${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function completeLesson(id, token) {
  const response = await api.post(`/lessons/complete/:${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
