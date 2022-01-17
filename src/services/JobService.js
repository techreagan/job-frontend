import Api from "./Api";

export default {
  getJobs(params) {
    return Api().get(`/jobs?${params}`);
  },
  getJob(jobId) {
    return Api().get(`jobs/${jobId}`);
  },
  createJob(data) {
    return Api().post("jobs/", data);
  },
  updateJob(id, data) {
    return Api().put(`jobs/${id}`, data);
  },
  deleteJob(id) {
    return Api().delete(`jobs/${id}`);
  },
};
