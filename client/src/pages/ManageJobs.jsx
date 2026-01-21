import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading.jsx";

function ManageJobs() {
  const navigate = useNavigate();

  const { backendUrl, companyToken } = useContext(AppContext);

  const [jobs, setJobs] = useState(false);

  // Function

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/company/list-jobs", {
        headers: { token: companyToken },
      });

      if (data.success) {
        setJobs(data.jobsData.reverse());
        toast.success("Jobs are fetched");
        console.log(data.jobsData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Function to change Job Visibilty

  const changeJobVisiblity = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/company/change-visibility",
        { id },

        {
          headers: { token: companyToken },
        },
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }, [companyToken]);

  return jobs ? (
    jobs.length === 0 ? (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl sm:text-2xl">
          No Jobs Available or Posted
        </p>
      </div>
    ) : (
      <div className="container p-4 max-w-5xl">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  #
                </th>
                <th className="py-2 px-4 border-b text-left">Job Title</th>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  Date
                </th>
                <th className="py-2 px-4 border-b text-left max-sm:hidden">
                  Location
                </th>
                <th className="py-2 px-4 border-b text-center">Applicants</th>
                <th className="py-2 px-4 border-b text-left">Visible</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="py-2 px-6 border-b max-sm:hidden">
                    {index + 1}
                  </td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b">{job.location}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {job.applicants}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <input
                      onChange={() => changeJobVisiblity(job._id)}
                      type="checkbox"
                      checked={job.visible}
                      className="scale-125 ml-4 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={(e) => navigate("/dashboard/add-job")}
            className="px-4 py-3 rounded bg-black text-white cursor-pointer active:scale-95 transition"
          >
            Add New Job
          </button>
        </div>
      </div>
    )
  ) : (
    <Loading />
  );
}

export default ManageJobs;
