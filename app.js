const searchEL = document.getElementById("srch");
const btnEl = document.getElementById("btn");
const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const receipecontainerEL = document.getElementById("receipe-container");

const fetchReceipe = async () => {
  try {
    const value = searchEL.value.trim();
    const res = await fetch(`${url}${value}`);

    // Check if the response is OK
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    if (data.meals) {
        receipecontainerEL.innerHTML = "";

      data.meals.forEach((element) => {
        const div = document.createElement("div");
        div.classList.add("receipe");
        div.innerHTML = `
        <div class="receipe">
           <div class="img">
             <img src="${element.strMealThumb}" alt="" />
           </div>
           <h2>${element.strMeal}</h2>
           <button class="btn"><a href="${element.strSource}"> View Recipe</a>
          </button>
         </div>
           `;
        receipecontainerEL.appendChild(div);
        searchEL.value= ""
      });
    } else {
      receipecontainerEL.innerText = "Error";
    }

    console.log(data.meals[0]);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

btnEl.addEventListener("click", fetchReceipe);
