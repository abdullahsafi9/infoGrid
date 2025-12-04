"use client";
import React,{ useEffect, useState }  from 'react'
import { BsImage } from 'react-icons/bs'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import Division from "@/components/SelectGroup/Division";


const page = () => {
     const { successMessage, errorMessage } = useState(true)
 const [state, setState] = useState({
      
        image: ''
    })

  const [show, setShow] = useState(false)

    const [imageShow, setImage] = useState('')

       
    const imageHandle = (e) => {
        let files = e.target.files
        if (files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
        }
    }

    
    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            setState({
              
                image: ''
            })
            setImage('')
           
        }
    }, [])
  return (
        <DefaultLayout>
         <Breadcrumb pageName="Add Candidate" />
              <div className=" sm:grid-cols-2">
        <div className="">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-center text-black dark:text-white">
                Candidate Information
              </h3>
        
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
 <div>
               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     <SelectGroupOne />
                </label>
               
              </div>

         <div className="mb-3 block text-sm font-medium text-black dark:text-white flex flex-col gap-5.5">
              <Division />
            </div>



            <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Constituency Name & Number
                </label>
                <input
                  type="text"
                  placeholder="Enter Constituency Number"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Candidate Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Candidate Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
    <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Candidate Photo
                </label>
                
                    <div>

                                    <label className='flex justify-center items-center flex-col w-[300px] h-[200px] cursor-pointer border border-dashed hover:border-indigo-500 w-full border-[#d0d2d6]' htmlFor="image">
                                        {
                                            imageShow ? <img className='w-full h-full' src={imageShow} /> : <>
                                                <span><BsImage /></span>
                                                <span>select Image</span>
                                            </>
                                        }

                                    </label>
                                </div>
                                <input onChange={imageHandle} className='hidden' type="file" name='image' id='image' required />
              </div>


              <div>
               <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Total Voters
                </label>
                <input
                  type="number"
                  placeholder="Enter Number of Voters"
                  disabled
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>

       
            </div>
          </div>



        </div>

  
      </div>
    </DefaultLayout>

  )
}

export default page
