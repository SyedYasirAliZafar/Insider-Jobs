import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";
import { AppContext } from "../context/AppContext";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";


function Applications() {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);

  const [resume, setResume] = useState(null);

  const { backendUrl, userData, userApplications, fetchUserData } =
    useContext(AppContext);

  const updateResume = async () => {
    try {
      const formData = new FormData();
      formData.append("resume", resume);

      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume/${user?.id}`, // pass userId in URL
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchUserData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setIsEdit(false);
    setResume(null);
  };

  return (
    <>
      <Navbar />
      <div className="container px4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit || (userData && userData.resume === "") ? (
            <>
              <label htmlFor="resumeUpload" className="flex items-center">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : "Select Resume"}
                </p>
                <input
                  onChange={(e) => setResume(e.target.files[0])}
                  type="file"
                  accept="application/pdf"
                  id="resumeUpload"
                  hidden
                />
                <img
                  src={assets.profile_upload_icon}
                  alt=""
                  className="cursor-pointer"
                />
              </label>

              <button
                onClick={updateResume}
                className="bg-green-100 border border-green-400 rounded-lg px-4 py-2 cursor-pointer active:scale-95 transition"
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                href=""
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded cursor-pointer active:scale-95 transition"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer active:scale-95 transition"
              >
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Job Applied</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="px-4 py-3 border-b text-left">Company</th>
              <th className="px-4 py-3 border-b text-left">Job Title</th>
              <th className="px-4 py-3 border-b text-left max-sm:hidden">
                Location
              </th>
              <th className="px-4 py-3 border-b text-left">Date</th>
              <th className="px-4 py-3 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {jobsApplied.map((job, index) =>
              true ? (
                <tr
                  key={index}
                  className="hover:bg-gray-100 cursor-pointer transition"
                >
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    <img src={job.logo} alt="" className="w-8 h-8" />
                    {job.company}
                  </td>
                  <td className="py-2 px-4 border-b">{job.title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {job.location}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {moment(job.date).format("ll")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`${
                        job.status === "Accepted"
                          ? "bg-green-100"
                          : job.status === "Rejected"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } px-4 py-1.5 rounded cursor-pointer`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Applications;
