import React from "react";
import { manageJobsData } from "../assets/assets.js";
import moment from "moment";
import {useNavigate} from 'react-router-dom'

function ManageJobs() {

  const navigate = useNavigate()

  return (
    <div className="container p-4 max-w-5xl">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm ">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
              <th className="py-2 px-4 border-b text-left">Job Title</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
              <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
              <th className="py-2 px-4 border-b text-center">Applicants</th>
              <th className="py-2 px-4 border-b text-left">Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job, index) => (
              <tr key={index} className="text-gray-700">
                <td className="py-2 px-4 border-b max-sm:hidden">{index + 1}</td>
                <td className="py-2 px4 border-b">{job.Title}</td>
                <td className="py-2 px4 border-b">{moment(job.date).format("ll")}</td>
                <td className="py-2 px4 border-b">{job.location}</td>
                <td className="py-2 px4 border-b text-center">{job.applicants}</td>
                <td className="py-2 px4 border-b">
                  <input type="checkbox" className="scale-125 ml-4 cursor-pointer"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={e=> navigate('/dashboard/add-job')} className="px-4 py-3 rounded bg-black text-white cursor-pointer active:scale-95 transition">Add New Job</button>
      </div>
    </div>
  );
}

export default ManageJobs;
