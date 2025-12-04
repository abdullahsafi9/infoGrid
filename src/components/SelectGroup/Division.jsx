"use client";
import React, { useState } from "react";


export default function CategorySubcategory() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [area, setArea] = useState("");
  const [subSearch, setSubSearch] = useState("");

  const categories = [
    { value: "dhaka", label: "  Dhaka" },
    { value: "chittagong", label: " Chittagong" },
    { value: "barisal", label: " Barisal" },
    { value: "khulna", label: " Khulna" },
    { value: "mymensingh", label: " Mymensingh" },
    { value: "rajshahi", label: " Rajshahi" },
    { value: "rangpur", label: " Rangpur" },
    { value: "sylhet", label: " Sylhet" },
  ];

  const subCategories = {
      dhaka: [
      { value: "faridpur", label: "Faridpur" },
      { value: "gazipur", label: "Gazipur" },
      { value: "gopalganj", label: "Gopalganj" }
    ],
     chittagong: [
      { value: "men", label: "Men Wear" },
      { value: "women", label: "Women Wear" },
      { value: "shoes", label: "Shoes" }
    ],
    barisal: [
      { value: "school", label: "School" },
      { value: "college", label: "College" },
      { value: "university", label: "University" }
    ],
     khulna: [
      { value: "school", label: "School" },
      { value: "college", label: "College" },
      { value: "university", label: "University" }
    ],
      mymensingh: [
      { value: "school", label: "School" },
      { value: "college", label: "College" },
      { value: "university", label: "University" }
    ],
     rajshahi: [
      { value: "school", label: "School" },
      { value: "college", label: "College" },
      { value: "university", label: "University" }
    ],
     rangpur: [
      { value: "school", label: "School" },
      { value: "college", label: "College" },
      { value: "university", label: "University" }
    ],
     sylhet: [
      { value: "school", label: "School" },
      { value: "college", label: "College" },
      { value: "university", label: "University" }
    ],
  };

  const areas = {
      faridpur: [
      { value: "faridpur1", label: "Faridpur1" },
      { value: "faridpur2", label: "Faridpur2" },
      { value: "faridpur3", label: "Faridpur3" }
    ],
     gazipur: [
      { value: "gazipur1", label: "Gazipur1" },
      { value: "gazipur2", label: "Gazipur2" },
      { value: "gazipur3", label: "Gazipur3" }
    ],
     gopalganj: [
      { value: " gopalganj1", label: "Gopalganj1" },
      { value: " gopalganj2", label: "Gopalganj2" },
      { value: " gopalganj3", label: "Gopalganj3" }
    ]
  };

  const filteredSubCategories =
    category && subCategories[category]
      ? subCategories[category].filter(item =>
          item.label.toLowerCase().includes(subSearch.toLowerCase())
        )
      : [];

        const filteredarea =
     subCategories && areas [subCategory]
      ? areas[subCategory].filter(item =>
          item.label.toLowerCase().includes(subSearch.toLowerCase())
        )
      : [];

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };


  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select Division
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>

        <select
        value={category}
        onChange={e => {
          setCategory(e.target.value);
          setSubCategory("");
               changeTextColor();
        }}
          
        
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-12 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            subCategories ? "text-black dark:text-white" : ""
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark"> Select Division</option>
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
    
        </select>

     
        
      </div>
      <br></br>
 {category && (
        <>
           <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select District
      </label>
          <br></br>
        <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
               <select className="relative z-50 pr-[700px] p-[10px] h-[45px] bg-white dark:bg-form-input"
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
          >
         
            <option value=""  disabled className="relative z-20 bg-white dark:bg-form-input">Select Your District</option>
            {filteredSubCategories.map(sub => (
              <option key={sub.value} value={sub.value}>
                {sub.label}
              </option>
            ))}
          </select>
          </div>
        </>
      )}
        <br></br>
  {subCategories && (
        <>
           <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select Area
      </label>
          <br></br>
        <div className="relative z-20 bg-white dark:bg-form-input">
        <span className="absolute left-4 top-1/2 z-30 -translate-y-1/2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.8">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                fill="#637381"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                fill="#637381"
              ></path>
            </g>
          </svg>
        </span>
               <select className="relative z-50 pr-[700px] p-[10px] h-[45px] bg-white dark:bg-form-input"
            value={area}
            onChange={e => setArea(e.target.value)}
          >
         
            <option value=""  disabled className="relative z-20 bg-white dark:bg-form-input">Select Your Area</option>
            {filteredarea.map(area => (
              <option key={area.value} value={area.value}>
                {area.label}
              </option>
            ))}
          </select>
          </div>
        </>
      )}
       
      </div>

  );
};

