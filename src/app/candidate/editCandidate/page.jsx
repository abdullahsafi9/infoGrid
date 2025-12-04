"use client";
import React,{ useEffect, useState } from 'react'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { IoCloseSharp } from 'react-icons/io5'
import Link from 'next/link';
import { BsImages } from 'react-icons/bs'
import { BsImage } from 'react-icons/bs'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { PropagateLoader } from 'react-spinners'
const page = () => {
     const [state, setState] = useState({
        name: "",
        image:"",
        image1: ""
       
    })
       const [divisionShow, setDivisionShow] = useState(false)
      const [districtShow, setDistrictShow] = useState(false)
      const [areaShow, setAreaShow] = useState(false)
    const [division, setDivision] = useState('')
    const [area, setArea] = useState('')
    const [district, setDistrict] = useState('')
    const [allDivision, setAllDivision] = useState([])
    const [allDistrict, setAllDistrict] = useState([])
    const [allArea, setAllArea] = useState([])
    const [searchValue, setSearchValue] = useState('')
      const [show, setShow] = useState(false)
    const [imageShow, setImageShow] = useState([])
    const [images, setImages] = useState([])
    const [images1, setImages1] = useState([])
  const [imageShow1, setImageShow1] = useState([])
 
       
const [cases, setCases] = useState([
    { case: "", cdescription: "", images: []}
  ]);

  const addRow = () => {
    setCases([...cases, { case: "", cdescription: "", images: [] }]);
  };

  const removeRow = (index) => {
    const data = [...cases];
    data.splice(index, 1);
    setCases(data);
    // Clean memory
    data[index].images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
    });

    data.splice(index, 1);
    setCases(data);
  };

  const handleChange = (index, e) => {
    const data = [...cases];
    data[index][e.target.name] = e.target.value;
    setCases(data);
  };

   // ✅ Handle multiple image upload
  const handleImages = (index, e) => {
    const files = Array.from(e.target.files);

    const imagesArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    const data = [...cases];
    data[index].images = [...data[index].images, ...imagesArray];

    setCases(data);
  };

// ✅ Remove single image
  const removeImage = (rowIndex, imageIndex) => {
    const data = [...cases];

    URL.revokeObjectURL(data[rowIndex].images[imageIndex].preview);
    data[rowIndex].images.splice(imageIndex, 1);

    setCases(data);
  };

    const [allegations, setAllegations] = useState([
    { allegation: "", adescription: "", images1: [] }
  ]);

  const addRow1 = () => {
    setAllegations([...allegations, { allegation: "", adescription: "", images1: [] }]);
  };

  const removeRow1 = (index) => {
    const data = [...allegations];
    data.splice(index, 1);
    setAllegations(data);

    // Clean memory
    data[index].images1.forEach((img) => {
      URL.revokeObjectURL(img.preview);
    });

    data.splice(index, 1);
    setAllegations(data);
  };

  const handleChange1 = (index, e) => {
    const data = [...allegations];
    data[index][e.target.name] = e.target.value;
    setAllegations(data);
  };

 
   // ✅ Handle multiple image upload
  const handleImages1 = (index, e) => {
    const files = Array.from(e.target.files);

    const imagesArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    const data = [...allegations];
    data[index].images1 = [...data[index].images1, ...imagesArray];

    setAllegations(data);
  };

// ✅ Remove single image
  const removeImages1 = (rowIndex, imageIndex) => {
    const data = [...allegations];

    URL.revokeObjectURL(data[rowIndex].images1[imageIndex].preview);
    data[rowIndex].images1.splice(imageIndex, 1);

    setAllegations(data);
  };



     const divisionSearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srcValue = allDivision.filter(d => d.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllDivision(srcValue)
        } else {
            setAllDivision(divisions)
        }
    }
  const areaSearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srcValue = allArea.filter(a => a.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllArea(srcValue)
        } else {
            setAllArea(areas)
        }
    }

    const districtSearch = (e) => {
        const value = e.target.value
        setSearchValue(value)
        if (value) {
            let srcValue = allDistrict.filter(di => di.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllDistrict(srcValue)
        } else {
            setAllDistrict(districts)
        }
    }

  


    useEffect(() => {
        setState({
            name,
           

 
        })
    
    }, [])

const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

   
  return (
     <DefaultLayout>
         <Breadcrumb pageName="Add Candidate" />
         
              <div className=" sm:grid-cols-2">

  <div className=' '>
            <div className='w-full p-4  bg-[#283046] rounded-md'>
                <div className='flex justify-between items-center pb-4'>
                    <h1 className='text-[#d0d2d6] text-xl font-semibold'>Edit Candidate Details</h1>
                    <Link className='bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2 ' href='/candidate/showCandidate'>Candidates</Link>
                </div>
                <div>
                    <form>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="name">Constituency Name & Number</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'  value={state.name} type="text" placeholder='Constituency Name & Number' name='name' id='name' />
                            </div>
                            <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="brand">Candidate Name</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'   type="text" placeholder='Candidate Name' name='candidate_name' id='candidate_name' />
                            </div>
                        </div>
                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            <div className='flex flex-col w-full gap-1 relative'>
                                <label htmlFor="category">Division</label>
                                <input readOnly onClick={() => setDivisionShow(!divisionShow)} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'   type="text" placeholder='--select division--' id='division' />
                                <div className={`absolute top-[101%] bg-slate-800 w-full transition-all ${divisionShow ? 'scale-100' : 'scale-0'}`}>
                                    <div className='w-full px-4 py-2 fixed'>
                                        <input value={searchValue} onChange={divisionSearch} className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden' type="text" placeholder='search' />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scrool'>
                                       {
                                            allDivision.length > 0 && allDivision.map((d, i) => <span className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${division === d.name && 'bg-indigo-500'}`} onClick={() => {
                                                setDivisionShow(false)
                                                setDivision(d.name)
                                                setSearchValue('')
                                                setAllDivision(divisionss)
                                            }}>{d.name}</span>)
                                        }
                                    </div>
                                </div>
                            </div>

                             <div className='flex flex-col w-full gap-1 relative'>
                                <label htmlFor="category">District</label>
                                <input readOnly onClick={() => setDistrictShow(!districtShow)} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'   type="text" placeholder='--select district--' id='district' />
                                <div className={`absolute top-[101%] bg-slate-800 w-full transition-all ${districtShow ? 'scale-100' : 'scale-0'}`}>
                                    <div className='w-full px-4 py-2 fixed'>
                                        <input value={searchValue} onChange={districtSearch} className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden' type="text" placeholder='search' />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scrool'>
                                       {
                                            allDistrict.length > 0 && allDistrict.map((di, i) => <span className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${district === di.name && 'bg-indigo-500'}`} onClick={() => {
                                                setDistrictShow(false)
                                                setDistrict(di.name)
                                                setSearchValue('')
                                                setAllDistrict(districts)
                                            }}>{di.name}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full gap-1 relative'>
                                <label htmlFor="category">Area</label>
                                <input readOnly onClick={() => setAreaShow(!areaShow)} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'   type="text" placeholder='--select area--' id='area' />
                                <div className={`absolute top-[101%] bg-slate-800 w-full transition-all ${areaShow ? 'scale-100' : 'scale-0'}`}>
                                    <div className='w-full px-4 py-2 fixed'>
                                        <input value={searchValue} onChange={areaSearch} className='px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden' type="text" placeholder='search' />
                                    </div>
                                    <div className='pt-14'></div>
                                    <div className='flex justify-start items-start flex-col h-[200px] overflow-x-scrool'>
                                       {
                                            allArea.length > 0 && allArea.map((a, i) => <span className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg w-full cursor-pointer ${area === a.name && 'bg-indigo-500'}`} onClick={() => {
                                                setAreaShow(false)
                                                setArea(a.name)
                                                setSearchValue('')
                                                setAllArea(areas)
                                            }}>{a.name}</span>)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                             <div className='flex flex-col w-full gap-1'>
                                <label htmlFor="brand">Voter</label>
                                <input className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]'   type="text" placeholder='Total Voters' name='voter' id='voter' />
                            </div>
                          
                           
                        </div>

                         <div className='mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                           
                           
                       
                            {cases.map((row, index) => (
        <div key={index} style={{   border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px",display: "flex", gap: "10px", marginBottom: "10px" }}>
          
          <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
                            <label htmlFor="description">Case</label>
                            <textarea rows={4} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' onChange={(e) => handleChange(index, e)} value={row.case} placeholder='Enter Case Study' name='case' id='case'></textarea>
                        </div>
          
        <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
                            <label htmlFor="description">Description</label>
                            <textarea rows={4} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' placeholder="Case Description" onChange={(e) => handleChange(index, e)} value={row.description}   name='cdescription' id='cdescription'></textarea>
                        </div>
 
  <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
          <input name="image" className='' type="file" placeholder="Image"
                 accept="image/*"
              multiple
              onChange={(e) => handleImages(index, e)}
                  />
                            {row.images.length > 0 && (
            <div
              style={{
                display: "inline",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px"
              }}
            >
              {row.images.map((img, imgIndex) => (
                <div key={imgIndex} style={{ position: "relative" }}>
                  <img
                    src={img.preview}
                    alt="preview"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd"
                     
                      
                    }}
                
                  />

                  {/* Remove Image Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index, imgIndex)}
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "280px",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer"
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              
            </div>
            
          )}
 <button type="button" className='ml-[300px]' onClick={() => addRow()}>+ <br></br>Add Case</button>    
                           
          {cases.length > 1 && (
            <button type="button" className="ml-[300px]" onClick={() => removeRow(index)}>x Remove</button>
          )}

          
        </div>
        </div>
      ))}
                            </div>      
                           
                        

                        <div className=' mb-3 md:flex-row gap-4 w-full text-[#d0d2d6]'>
                            
 {allegations.map((row, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
         
           <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
                            <label htmlFor="description">Allegation</label>
                            <textarea rows={4} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' name="allegation" onChange={(e) => handleChange1(index, e)} value={row.allegation}  placeholder='Enter Allegation Study' id='allegation'></textarea>
                        </div>
         
         
        <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
                            <label htmlFor="description">Description</label>
                            <textarea rows={4} className='px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]' placeholder="Allegation Description" onChange={(e) => handleChange1(index, e)} value={row.adescription}  name='adescription' id='adescription'></textarea>
                        </div>

  <div className='flex flex-col w-full gap-1 text-[#d0d2d6] mb-5'>
          <input name="image1" className='' type="file" placeholder="Image1"
                 accept="image1/*"
              multiple
              onChange={(e) => handleImages1(index, e)}
                  />
                            {row.images1.length > 0 && (
            <div
              style={{
                display: "inline",
                flexWrap: "wrap",
                gap: "10px",
                marginTop: "10px"
              }}
            >
              {row.images1.map((img, imgIndex) => (
                <div key={imgIndex} style={{ position: "relative" }}>
                  <img
                    src={img.preview}
                    alt="preview"
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      border: "1px solid #ddd"
                     
                      
                    }}
                
                  />

                  {/* Remove Image Button */}
                  <button
                    type="button"
                    onClick={() => removeImages1(index, imgIndex)}
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "280px",
                      background: "red",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer"
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
              
            </div>
            
          )}
 <button type="button" className='ml-[300px]' onClick={() => addRow1()}>+ <br></br>Add Allegation</button>    
                           
         {allegations.length > 1 && (
            <button type="button" className="ml-[300px]" onClick={() => removeRow1(index)}>x Remove</button>
          )}

          
        </div>
         

        </div>
      ))}

                         

         
                        </div>


                        <div className='flex'>
                            <button className='bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3'>
                                {
                             'Update Candidate'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>

                
              </div>

</div>
               </DefaultLayout>
  ) 
}

export default page
