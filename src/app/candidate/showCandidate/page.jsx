"use client";
import React ,{ useEffect, useState} from 'react'
import Image from "next/image";
import { FaEdit,FaEye, FaTrash } from 'react-icons/fa'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from 'next/link';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Search from '@/components/Search'
import Pagination from '../../../Pagination'

const page = () => {


        
 const [state, setState] = useState({
    constituencyNameNumber: '',
    candidateName: '',
    image: '',
    district: '',
    division: '',
    area: '',
    voter: ''

    })

const [currentPage, setCurrentPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
     const [searchValue1, setSearchValue1] = useState('')
    const [perPage, setPerPage] = useState(5)
 

  const productData = [
  {
    constituencyNo : "1",
    candidateName : "Habib",
    image: "/images/product/product-01.png", 
    district: "Dhaka",
    division: "Dhaka",
    area: "Dhaka -1",
    voter: 20
   
  },
  { 
    constituencyNo : "2",
    candidateName : "Habib",
    image: "/images/product/product-02.png",
    district: "Dhaka",
    division: "Dhaka",
    area: "Dhaka-2",
     voter: 10
  },
  {
     constituencyNo : "3",
    candidateName : "Habib",
    image: "/images/product/product-03.png",
    district: "Dhaka",
    division: "Dhaka",
    area: "Dhaka-3",
     voter: 30
  },
  {
    
    constituencyNo : "4",
    candidateName : "Habib",
    image: "/images/product/product-04.png",
    district: "Dhaka",
    division: "Dhaka",
    area: "Dhaka-4",
     voter: 40
  },
];

  return (
     <DefaultLayout>
       <Breadcrumb pageName="Lists of Candidates" />
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Candidates List
        </h4>
      </div>

      <div className=" border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
         <div className='w-full'>
                    <div className='w-full p-4  bg-[#283046] rounded-md'>
                        <Search setPerPage={setPerPage} setSearchValue={setSearchValue} searchValue={searchValue} />
                        <div className='relative overflow-x-auto'>
                            <table className='w-full text-sm text-left text-[#d0d2d6]'>
                                <thead className='text-sm text-[#d0d2d6] uppercase border-b border-slate-700'>
                                    <tr>
                                      <th scope='col' className='py-3 px-4'>No</th>
                                        <th scope='col' className='py-3 px-4'>Constituency Name & Number</th>
                                        <th scope='col' className='py-3 px-4'>Candidate Name</th>
                                        <th scope='col' className='py-3 px-4'>Image</th>
                                        <th scope='col' className='py-3 px-4'>District</th>
                                        <th scope='col' className='py-3 px-4'>Division</th>
                                        <th scope='col' className='py-3 px-4'>Area</th>
                                        <th scope='col' className='py-3 px-4'>Voter</th>
                                        <th scope='col' className='py-3 px-4'>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        productData.map((product, i) => <tr key={i}>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>{i + 1}</td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span> {product.constituencyNo}</span>
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span> {product.candidateName}</span>
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <img className='w-[45px] h-[45px]' src={product.image} alt="" />
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span> {product.division}</span>
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span>
                                               {product.district}
                                                </span>
                                            </td>
                                             <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span>
                                               {product.area}
                                                </span>
                                            </td>
                                             <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <span>
                                               {product.voter}
                                                </span>
                                            </td>
                                            <td scope='row' className='py-1 px-4 font-medium whitespace-nowrap'>
                                                <div className='flex justify-start items-center gap-4'>
                                                    <Link href={`/candidate/candidateDetails/${product.constituencyNo}`} className='p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50'><FaEdit /></Link>
                                                    <Link href={''} className='p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50'><FaEye /></Link>
                                                </div>
                                            </td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
        
<div className='w-full flex justify-end mt-4 bottom-4 right-4'>
                            <Pagination
                                pageNumber={currentPage}
                                setPageNumber={setCurrentPage}
                                totalItem={50}
                                perPage={perPage}
                                showItem={4}
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




