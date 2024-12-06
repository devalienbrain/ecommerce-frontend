// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Title from "../components/shared/Title";

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch categories from the API
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/categories"
//         );
//         setCategories(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (categoryId) => {
//     navigate(`/products/${categoryId & categoryName}`);
//   };

//   if (loading) {
//     return <div>Loading categories...</div>;
//   }
//   const title = "Categories";
//   return (
//     <>
//       <div>
//         <Title title={title} />
//       </div>
//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               onClick={() => handleCategoryClick(category.id)}
//               className="p-4 border rounded shadow-md cursor-pointer hover:bg-blue-100"
//             >
//               {category.name}
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Categories;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Title from "../components/shared/Title";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, categoryName) => {
    navigate(`/products/${categoryId}`, { state: { categoryName } });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <>
      <div>
        <Title title="Categories" />
      </div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id, category.name)}
              className="p-4 border rounded shadow-md cursor-pointer hover:bg-blue-100"
            >
              {category.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
