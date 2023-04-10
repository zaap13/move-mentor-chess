import api from "./api";

export async function getCourses(token) {
  const response = await api.get("/courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getCourse(courseId, token) {
  const response = await api.get(`/courses/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function getUserCourses(token) {
  const response = await api.get("/courses/subscribed", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function subscribeCourse(courseId, token) {
  console.log({ courseId: courseId });
  const response = await api.post(
    "/courses/subscribe",
    { courseId: courseId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteSubscribe(subscriptionId, token) {
  const response = await api.delete(`/courses/subscribe/:${subscriptionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
