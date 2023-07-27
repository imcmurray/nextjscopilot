// Path: pages/index.js
// Compare this snippet from pages/index.js:
// /*
// Create a text area with the following specifications:
// 
// 1. a H1 with the text "Find Nutrition Facts for any recipe"
// 2. a text area for users to upload recipe
// 3. a button for users to submit the entered recipe
// 4. a section at the bottom to display nutrition facts
// 5. Get the data from this link: http://localhost:8080/openai/generateinfo
// 6. Name the component RecipeInfo
// 7. Export the component as a module
// */ 
// 

/* q: How do I resolve CORS errors? */

import { useState } from "react";

const RecipeInfo = () => {
  const [recipe, setRecipe] = useState("");
  const [nutrition, setNutrition] = useState("");

  const handleChange = (e) => {
    setRecipe(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/openai/generateinfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe }),
    });

    const data = await response.json();
    setNutrition(data.data);
  };

  return (
    <div className="container">
      <h1>Find Nutrition Facts for any recipe</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          name="recipe"
          id="recipe"
          cols="30"
          rows="10"
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <div className="nutrition">
        <h2>Nutrition</h2>
        <p>{nutrition}</p>
      </div>
    </div>
  );
};

export default RecipeInfo;
