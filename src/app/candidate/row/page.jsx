"use client";
import { useState } from "react";

export default function CaseForm() {
  const [rows, setRows] = useState([
    { caseTitle: "", description: "", images: [] }
  ]);

  // ✅ Add Row
  const addRow = () => {
    setRows([...rows, { caseTitle: "", description: "", images: [] }]);
  };

  // ✅ Remove Row
  const removeRow = (index) => {
    const updated = [...rows];

    // Clean memory
    updated[index].images.forEach((img) => {
      URL.revokeObjectURL(img.preview);
    });

    updated.splice(index, 1);
    setRows(updated);
  };

  // ✅ Handle text change
  const handleChange = (index, e) => {
    const updated = [...rows];
    updated[index][e.target.name] = e.target.value;
    setRows(updated);
  };

  // ✅ Handle multiple image upload
  const handleImages = (index, e) => {
    const files = Array.from(e.target.files);

    const imagesArray = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    const updated = [...rows];
    updated[index].images = [...updated[index].images, ...imagesArray];

    setRows(updated);
  };

  // ✅ Remove single image
  const removeImage = (rowIndex, imageIndex) => {
    const updated = [...rows];

    URL.revokeObjectURL(updated[rowIndex].images[imageIndex].preview);
    updated[rowIndex].images.splice(imageIndex, 1);

    setRows(updated);
  };

  // ✅ Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    rows.forEach((row, i) => {
      formData.append(`cases[${i}][case]`, row.caseTitle);
      formData.append(`cases[${i}][description]`, row.description);

      row.images.forEach((img, j) => {
        formData.append(`cases[${i}][images][${j}]`, img.file);
      });
    });

    console.log("Ready for API:", rows);

    // fetch("/api/upload", { method: "POST", body: formData });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "1000px" }}>
      <h2>Case Form (Multiple Images)</h2>

      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "8px"
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              name="caseTitle"
              placeholder="Case title"
              value={row.caseTitle}
              onChange={(e) => handleChange(index, e)}
            />

            <textarea
              name="description"
              placeholder="Description"
              value={row.description}
              onChange={(e) => handleChange(index, e)}
            />

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleImages(index, e)}
            />
          </div>

          {/* 🖼 Image Preview Grid */}
          {row.images.length > 0 && (
            <div
              style={{
                display: "flex",
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
                      right: "-6px",
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

          {/* Row Actions */}
          <div style={{ marginTop: "10px" }}>
            <button type="button" onClick={addRow}>
              + Add Row
            </button>

            {rows.length > 1 && (
              <button
                style={{ marginLeft: "10px" }}
                type="button"
                onClick={() => removeRow(index)}
              >
                Remove Row
              </button>
            )}
          </div>
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

/*import { useState } from "react";

export default function CaseForm() {
  const [rows, setRows] = useState([
    { caseTitle: "", description: "", image: null, preview: null }
  ]);

  // Add new row
  const addRow = () => {
    setRows([
      ...rows,
      { caseTitle: "", description: "", image: null, preview: null }
    ]);
  };

  // Remove row
  const removeRow = (index) => {
    const updated = [...rows];

    // Remove preview url from memory
    if (updated[index].preview) {
      URL.revokeObjectURL(updated[index].preview);
    }

    updated.splice(index, 1);
    setRows(updated);
  };

  // Handle input
  const handleChange = (index, e) => {
    const updated = [...rows];
    updated[index][e.target.name] = e.target.value;
    setRows(updated);
  };

  // Handle image upload/change
  const handleImageChange = (index, e) => {
    const file = e.target.files[0];

    if (!file) return;

    const updated = [...rows];

    // Clear old preview from memory
    if (updated[index].preview) {
      URL.revokeObjectURL(updated[index].preview);
    }

    updated[index].image = file;
    updated[index].preview = URL.createObjectURL(file);

    setRows(updated);
  };

  // Remove image
  const removeImage = (index) => {
    const updated = [...rows];

    if (updated[index].preview) {
      URL.revokeObjectURL(updated[index].preview);
    }

    updated[index].image = null;
    updated[index].preview = null;

    setRows(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    rows.forEach((row, i) => {
      formData.append(`cases[${i}][case]`, row.caseTitle);
      formData.append(`cases[${i}][description]`, row.description);
      if (row.image) {
        formData.append(`cases[${i}][image]`, row.image);
      }
    });

    console.log("Ready to send", rows);

    // fetch("/api/upload", { method: "POST", body: formData });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "900px" }}>
      <h2>Dynamic Case Form</h2>

      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1.3fr auto auto",
            gap: "10px",
            marginBottom: "20px",
            alignItems: "center"
          }}
        >
          {/* Case }
          <input
            type="text"
            name="caseTitle"
            placeholder="Case title"
            value={row.caseTitle}
            onChange={(e) => handleChange(index, e)}
          />

          {/* Description }
          <textarea
            name="description"
            placeholder="Description"
            value={row.description}
            onChange={(e) => handleChange(index, e)}
          />

          {/* Image Upload }
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e)}
          />

          {/* Preview + Remove image }
          {row.preview && (
            <div style={{ textAlign: "center" }}>
              <img
                src={row.preview}
                alt="preview"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  display: "block",
                  marginBottom: "5px"
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                style={{
                  fontSize: "12px",
                  background: "tomato",
                  color: "#fff",
                  border: "none",
                  padding: "4px 8px",
                  cursor: "pointer"
                }}
              >
                Remove
              </button>
            </div>
          )}

          {/* Add row }
          <button type="button" onClick={addRow}>
            ＋
          </button>

          {/* Remove row }
          {rows.length > 1 && (
            <button type="button" onClick={() => removeRow(index)}>
              ✕
            </button>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

/*import { useState } from "react";

export default function CaseForm() {
  const [rows, setRows] = useState([
    { caseTitle: "", description: "", image: null, preview: null }
  ]);

  // Add new row
  const addRow = () => {
    setRows([
      ...rows,
      { caseTitle: "", description: "", image: null, preview: null }
    ]);
  };

  // Remove a row
  const removeRow = (index) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  // Text input change
  const handleChange = (index, e) => {
    const updated = [...rows];
    updated[index][e.target.name] = e.target.value;
    setRows(updated);
  };

  // Image change + Preview
  const handleImage = (index, e) => {
    const file = e.target.files[0];

    if (file) {
      const updated = [...rows];
      updated[index].image = file;
      updated[index].preview = URL.createObjectURL(file);
      setRows(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rows);

    const formData = new FormData();

    rows.forEach((row, i) => {
      formData.append(`cases[${i}][case]`, row.caseTitle);
      formData.append(`cases[${i}][description]`, row.description);
      formData.append(`cases[${i}][image]`, row.image);
    });

    // Send to API:
    // fetch("/api", { method: "POST", body: formData });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "900px" }}>
      <h2>Dynamic Case Form</h2>

      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr auto auto",
            gap: "10px",
            marginBottom: "15px",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            name="caseTitle"
            placeholder="Case title"
            value={row.caseTitle}
            onChange={(e) => handleChange(index, e)}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={row.description}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImage(index, e)}
          />

          {/* Image Preview }
          {row.preview && (
            <img
              src={row.preview}
              alt="preview"
              style={{
                width: "60px",
                height: "60px",
                objectFit: "cover",
                borderRadius: "5px"
              }}
            />
          )}

          <button type="button" onClick={addRow}>
            +
          </button>

          {rows.length > 1 && (
            <button type="button" onClick={() => removeRow(index)}>
              ✕
            </button>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}

/*import { useState } from "react";

export default function CaseForm() {
  const [rows, setRows] = useState([
    { caseTitle: "", description: "", image: null }
  ]);

  // Add new row
  const addRow = () => {
    setRows([...rows, { caseTitle: "", description: "", image: null }]);
  };

  // Remove a row
  const removeRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  // Handle text changes
  const handleChange = (index, e) => {
    const updatedRows = [...rows];
    updatedRows[index][e.target.name] = e.target.value;
    setRows(updatedRows);
  };

  // Handle image upload
  const handleImage = (index, e) => {
    const updatedRows = [...rows];
    updatedRows[index].image = e.target.files[0];
    setRows(updatedRows);
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(rows);

    // for api: use FormData
    const formData = new FormData();
    rows.forEach((row, i) => {
      formData.append(`cases[${i}][case]`, row.caseTitle);
      formData.append(`cases[${i}][description]`, row.description);
      formData.append(`cases[${i}][image]`, row.image);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Case Form</h2>

      {rows.map((row, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            alignItems: "center"
          }}
        >
          <input
            type="text"
            name="caseTitle"
            placeholder="Enter case..."
            value={row.caseTitle}
            onChange={(e) => handleChange(index, e)}
          />

          <textarea
            name="description"
            placeholder="Enter description..."
            value={row.description}
            onChange={(e) => handleChange(index, e)}
          />

          <input
            type="file"
            onChange={(e) => handleImage(index, e)}
          />

          {/* Add row button }
          <button type="button" onClick={addRow}>
            +
          </button>

          {/* Remove row button }
          {rows.length > 1 && (
            <button type="button" onClick={() => removeRow(index)}>
              ✕
            </button>
          )}
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
}
/*import { useState } from "react";

export default function DynamicForm() {
  const [alligations, setAllegations] = useState([
    { alligation: "", description: "", image: "" }
  ]);

  const addRow = () => {
    setAllegations([...alligations, { alligation: "", description: "", image: "" }]);
  };

  const removeRow = (index) => {
    const data = [...alligations];
    data.splice(index, 1);
    setAllegations(data);
  };

  const handleChange = (index, e) => {
    const data = [...allegations];
    data[index][e.target.name] = e.target.value;
    setAllegations(data);
  };

  return (
    <form>
      {cases.map((row, index) => (
        <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input name="allegation" placeholder="Allegation"
                 onChange={(e) => handleChange(index, e)}
                 value={row.allegation} />

          <input name="description" type="text" placeholder="Allegation Description"
                 onChange={(e) => handleChange(index, e)}
                 value={row.description} />

          <input name="image" type="file" placeholder="Image"
                 onChange={(e) => handleChange(index, e)}
                 value={row.image} />

          <button type="button" onClick={() => addRow()}>+</button>

          {cases.length > 1 && (
            <button type="button" onClick={() => removeRow(index)}>x</button>
          )}
        </div>
      ))}
    </form>
  );
}*/