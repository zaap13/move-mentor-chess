import api from "./api";

export async function getLesson(id, token) {
  const response = await api.get(`/lesson/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function completeLesson(id, token) {
  const response = await api.post(
    `/lesson/complete/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function createLesson(body, token) {
  const response = await api.post(`/lesson`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
