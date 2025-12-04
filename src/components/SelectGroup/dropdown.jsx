import { useState } from "react";

export default function CategorySubcategory() {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [subSearch, setSubSearch] = useState("");

  const categories = [
    { value: "tech", label: "Technology" },
    { value: "fashion", label: "Fashion" },
    { value: "education", label: "Education" }
  ];

  const subCategories = {
    tech: [
      { value: "web", label: "Web Development" },
      { value: "app", label: "App Development" },
      { value: "ai", label: "Artificial Intelligence" }
    ],
    fashion: [
      { value: "men", label: "Men Wear" },
      { value: "women", label: "Women Wear" },
      { value: "shoes", label: "Shoes" }
    ],
    education: [
      { value: "school", label: "School" },
      { value: "college", label: "College" },
      { value: "university", label: "University" }
    ]
  };

  const filteredSubCategories =
    category && subCategories[category]
      ? subCategories[category].filter(item =>
          item.label.toLowerCase().includes(subSearch.toLowerCase())
        )
      : [];

  return (
    <div style={{ width: "300px" }}>

      {/* CATEGORY */}
      <label>Category</label>
      <select
        value={category}
        onChange={e => {
          setCategory(e.target.value);
          setSubCategory("");
        }}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>

      <br /><br />

      {/* SUB CATEGORY SEARCH */}
      {category && (
        <>
          <label>Search Sub Category</label>
          <input
            type="text"
            value={subSearch}
            onChange={e => setSubSearch(e.target.value)}
            placeholder="Search sub-category..."
          />

          <br /><br />

          <label>Sub Category</label>
          <select
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
          >
            <option value="">Select Sub Category</option>
            {filteredSubCategories.map(sub => (
              <option key={sub.value} value={sub.value}>
                {sub.label}
              </option>
            ))}
          </select>
        </>
      )}

      <br /><br />
      <strong>Selected:</strong> {category} / {subCategory}
    </div>
  );
}

