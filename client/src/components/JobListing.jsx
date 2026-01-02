import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

function JobListing() {

  const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

  return (
    <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>

      {/* Sidebar */}
      <div className='w-full lg:w-1/4 bg-white px-4'>

        {/* Current Search */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className='font-medium text-lg mb-4'>Current Search</h3>
            <div className='mb-4 text-gray-600 flex flex-wrap gap-2'>

              {searchFilter.title && (
                <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                  {searchFilter.title}
                  <img
                    onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))}
                    className='cursor-pointer'
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}

              {searchFilter.location && (
                <span className='inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                  {searchFilter.location}
                  <img
                    onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))}
                    className='cursor-pointer'
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}
            </div>
          </>
        )}

        {/* Category Filter */}
        <div>
          <h4 className='font-medium text-lg py-4'>Search by Categories</h4>
          <ul className='space-y-2'>
            {JobCategories.map((category, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input type="checkbox" className='cursor-pointer scale-125' />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location Filter */}
        <div>
          <h4 className='font-medium text-lg py-4 pt-14'>Search by Location</h4>
          <ul className='space-y-2'>
            {JobLocations.map((location, index) => (
              <li className='flex gap-3 items-center' key={index}>
                <input type="checkbox" className='cursor-pointer scale-125' />
                {location}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Job Listings */}
      <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
        <h3 className='font-medium text-3xl py-2' id='job-list'>
          Latest Jobs
        </h3>
        <p className='mb-8'>Get your desired job from top companies</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
          {/* Job cards will come here */}
          {jobs.map((job, index)=>(
            <JobCard key={index} job={job}/>
          ))}
        </div>
      </section>

    </div>
  )
}

export default JobListing
