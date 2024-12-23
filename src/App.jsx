/** @format */

import "./App.css";
import { createContext, useState } from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import scrap from "./scrap.json";
import scrap2 from "./scrap2.json";
import axios from "axios";
import DialogBox from "./DialogBox";

export const recipeContex = createContext();

function App() {
  const [data, setData] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDish, SetSelectedDish] = useState();
  const [savedRecipe, setSavedRecipe] = useState([]);
  // console.log(selectedDish.analyzedInstructions[0].steps);

  useEffect(() => {
    let temp = localStorage.getItem("saved_recipe");
    if (temp) {
      // console.log(JSON.parse(temp));
      setSavedRecipe(JSON.parse(temp));
    }
  }, []);

  useEffect(() => {
    // console.log(savedRecipe);
    localStorage.setItem("saved_recipe", JSON.stringify(savedRecipe));
  }, [savedRecipe]);

  const getDetailedRecipe = async (dishId) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${dishId}/information?includeNutrition=false&apiKey=${
          import.meta.env.VITE_rf_API_KEY
        }`
      );
      SetSelectedDish(response.data);
      console.log(response.data);
      setShowDetails(true);
    } catch (error) {
      alert("An Error Occured Please Try again");
    }
  };

  useEffect;
  return (
    <div className='container bg-sky-700 w-full min-h-dvh min-w-full relative'>
      <recipeContex.Provider
        value={{
          setData,
          savedRecipe,
          setSavedRecipe,
          selectedDish,
          SetSelectedDish,
          setShowDetails,
        }}
      >
        <Navbar></Navbar>
        {data.length ? (
          <div className='flex flex-wrap items-center justify-center gap-14 text-center py-20 md:px-20'>
            {data.map((ele, idx) => (
              <div
                key={ele.id}
                onClick={() => getDetailedRecipe(ele.id)}
                className=' overflow-hidden border border-transparent hover:border-lime-400 bg-slate-400 w-60 hover:scale-110 hover:text-sky-700 transition-all '
              >
                <img src={ele.image} className='w-fit' alt='' />
                <h3 className='font-medium text-wrap p-1'>
                  {ele.title.length < 27
                    ? ele.title
                    : ele.title.substring(0, 25) + "..."}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className='hero w-full h-dvh text-white flex items-center justify-center'>
            <div className='bg-orange-400 md:p-6 p-1 rounded-xl text-center'>
              <h1 className='text-sky-200 text-2xl md:text-4xl font-bold'>
                WELCOME TO RECIPE FINDER APP
              </h1>
              <p className=''>
                Solution To All Your Food Related Queries And Needs.
              </p>
            </div>
          </div>
        )}
        {showDetails && <DialogBox selectedDish={selectedDish}></DialogBox>}
        {savedRecipe.length ? (
          <div className='pt-6 pb-16 w-full'>
            <h2 className='text-sky-200 text-2xl font-bold text-center'>
              Favourite Recipes
            </h2>
            <div className='flex flex-wrap items-center justify-center md:justify-start px-16 py-6 gap-10'>
              {savedRecipe.map((ele, idx) => (
                <div
                  key={ele.id}
                  onClick={() => getDetailedRecipe(ele.id)}
                  className=' overflow-hidden border border-transparent hover:border-lime-400 bg-slate-400 w-60 hover:scale-110 hover:text-sky-700 transition-all '
                >
                  <img src={ele.image} className='w-fit' alt='' />
                  <h3 className='font-medium text-wrap p-1'>
                    {ele.title.length < 27
                      ? ele.title
                      : ele.title.substring(0, 25) + "..."}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        <Footer></Footer>
      </recipeContex.Provider>
    </div>
  );
}

export default App;
