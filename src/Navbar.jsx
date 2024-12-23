/** @format */

import axios from "axios";
import logo from "../public/recipe logo2.png";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { recipeContex } from "./App";

function Navbar() {
  const { setData } = useContext(recipeContex);
  const [inputStr, setInputStr] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  const handleInputChange = (e) => {
    const newInputStr = e.target.value;
    setInputStr(newInputStr);
    clearTimeout(timeoutId);
    const newTimeout = setTimeout(() => {
      if (newInputStr.length > 2) {
        // console.log(newInputStr);
        getInputSuggestions();
        //   console.log(first)
      } else {
        setSuggestions([]);
      }
    }, 2000);
    setTimeoutId(newTimeout);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, [timeoutId]);

  const getInputSuggestions = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/autocomplete?number=10&query=${inputStr}&apiKey=${
          import.meta.env.VITE_rf_API_KEY
        }`
      );
      //   console.log(response);
      setSuggestions(response.data);
    } catch (error) {
      alert("An Error Occured Please Try again");
    }
  };

  const getResults = async (query) => {
    try {
      clearTimeout(timeoutId);
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${
          import.meta.env.VITE_rf_API_KEY
        }`
      );
      // console.log(response)
      setData(response.data.results);
      setTimeout(() => {
        setInputStr("");
        setSuggestions([]);
      }, [2000]);
    } catch (error) {
      alert("An Error Occured Please Try again");
    }
  };

  return (
    <header className='fixed -top-0 w-full'>
      <nav className='w-full bg-gradient-to-r from-slate-600 to-slate-800 grid grid-cols-7 items-center py-2'>
        <div className='cols-span-1 hidden md:block'>
          {" "}
          <img src={logo} alt='' className='w-16 mx-auto' />
        </div>
        <div className='flex items-center gap-2 col-span-7 md:col-span-6 justify-center'>
          <div className='w-fit relative'>
            <input
              type='text'
              value={inputStr}
              onChange={handleInputChange}
              placeholder='Search Any Recipe...'
              className='border-2 rounded-sm border-lime-400 outline-sky-300 p-1 text-center'
            />
            <div
              className={`flex flex-col absolute z-20 bg-amber-100 font-medium w-full py-2 rounded-b-lg overflow-x-clip max-h-32 overflow-y-auto ${
                suggestions.length ? "" : "hidden"
              }`}
            >
              {suggestions.map((ele, idx) => {
                return (
                  <>
                    <p
                      key={idx}
                      onClick={() => getResults(ele.title)}
                      className='hover:bg-green-400 hover:text-orange-800 px-2 cursor-pointer'
                    >
                      {ele.title}
                    </p>
                    <hr className='border-b-0 border-slate-500 mx-2' />
                  </>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => getResults(inputStr)}
            className='bg-sky-400 font-medium text-slate-200 p-1 rounded-sm border-2 border-lime-400 hover:bg-lime-300 hover:border-sky-400 hover:text-sky-400'
          >
            Search
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
