/** @format */

import React, { useContext } from "react";
import { recipeContex } from "./App";

function DialogBox({ selectedDish }) {
  const {
    setData,
    savedRecipe,
    setSavedRecipe,
    SetSelectedDish,
    setShowDetails,
  } = useContext(recipeContex);
  const saveDish = () => {
    console.log({
      id: selectedDish.id,
      title: selectedDish.title,
      image: selectedDish.image,
    });
    let tm = savedRecipe;
    tm.push({
      id: selectedDish.id,
      title: selectedDish.title,
      image: selectedDish.image,
    });
    setSavedRecipe([...tm]);
  };
  console.log(savedRecipe);

  const deleteDish = () => {
    let tm = savedRecipe.filter((ele) => ele.id != selectedDish.id);
    setSavedRecipe(tm);
  };

  const hasdish = () => {
    let tm = false;
    savedRecipe.forEach((ele) => {
      if (ele.id == selectedDish.id) {
        tm = true;
      }
    });

    return tm;
  };

  function closeBox() {
    setShowDetails(false);
    SetSelectedDish();
  }

  return (
    <div className='w-full h-full bg-black/60 z-40 fixed top-0 flex items-center justify-center'>
      <div className='bg-slate-400 rounded-md dbox'>
        <div className='w-full flex items-center justify-between bg-gray-200'>
          <h4 className='text-xl font-medium px-2 text-blue-500'>
            {selectedDish.title}
          </h4>
          <button
            onClick={() => closeBox()}
            className='border-2 rounded-bl-lg border-slate-700 text-xl font-bold px-1 text-slate-700 hover:bg-rose-500 hover:text-white'
          >
            X
          </button>
        </div>
        <div className='grid grid-cols-3'>
          {" "}
          <img src={selectedDish.image} className='col-span-1' alt='' />
          <div className='col-span-2 flex gap-2 items-start justify-center flex-wrap p-2'>
            {selectedDish.dishTypes.map((ele, idx) => (
              <h3
                key={idx}
                className='bg-sky-600 rounded-md border p-1 uppercase font-mono text-gray-200'
              >
                {ele}
              </h3>
            ))}
            <h3
              className={`${
                selectedDish.vegetarian ? "bg-lime-600" : "bg-rose-400"
              } rounded-md border p-1 uppercase font-mono text-gray-200`}
            >
              {selectedDish.vegetarian ? "Vegetarian" : "Non-Vegetarian"}
            </h3>
            <h3 className='bg-sky-600 rounded-md border p-1 uppercase font-mono text-gray-200'>
              Serves-{selectedDish.servings}
            </h3>
            <h3 className='bg-sky-600 rounded-md border p-1 uppercase font-mono text-gray-200'>
              {selectedDish.readyInMinutes}-Minutes
            </h3>
            <div className='self-end w-full flex justify-end'>
              {" "}
              {hasdish() ? (
                <button
                  onClick={() => deleteDish(selectedDish.id)}
                  className='bg-white w-fit px-1 border border-sky-400 hover:rounded-lg hover:bg-slate-200 hover:text-rose-500'
                >
                  Delete -
                </button>
              ) : (
                <button
                  onClick={() => saveDish(selectedDish)}
                  className='bg-white w-fit px-1 border border-sky-400 hover:rounded-lg hover:bg-slate-200 hover:text-sky-500'
                >
                  Save +
                </button>
              )}
            </div>
          </div>
          <div className='text-lg font-medium border col-span-3 p-1'>
            Prepared and uploaded By-{" "}
            <span className='underline text-blue-700'>
              {selectedDish.creditsText || selectedDish.sourceName}{" "}
            </span>
          </div>
        </div>
        <hr className='w-full border-black' />
        <div className='flex flex-col w-full bg-gradient-to-r from-amber-300 to-lime-300 max-h-72 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full  [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 '>
          <h2 className='text-xl font-medium px-2'>Ingredients</h2>
          <hr />{" "}
          <div className='flex flex-wrap items-start justify-start gap-2 p-2'>
            {selectedDish.extendedIngredients.map((ele, idx) => (
              <p
                key={idx}
                className='bg-amber-400 rounded-md px-1 border border-dashed'
              >
                {ele.original}
              </p>
            ))}{" "}
          </div>
          <hr />
          <h2 className='text-xl font-medium px-2'>Instructions</h2>
          {selectedDish.analyzedInstructions[0].steps &&
            selectedDish.analyzedInstructions[0].steps.map((ele, idx) => (
              <div
                key={idx}
                className=' px-2 py-1 text-stone-800 font-semibold'
              >
                <hr />{" "}
                <h3 className='font-medium text-violet-800 underline'>
                  Step-{ele.number}
                </h3>
                <p>{ele.step}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DialogBox;
