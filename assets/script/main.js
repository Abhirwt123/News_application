const Apikey = "b560b6bd642e46b7985f4dd8424aa9c8";
const Url = "https://newsapi.org/v2/everything?q=";

async function fetchData(Query) {
  // fetching the data from api
  const res = await fetch(`${Url}${Query}&apiKey=${Apikey}`);
  const data = await res.json();
  return data;
}

// default it fetching all types of data
fetchData("all").then(data=>renderNewsCard(data.articles));

// creating the card according to the serch result number
function renderNewsCard(arr) {
  let cardWrapper = document.querySelector(".card-parent");
  let mainhtml = "";
  for (let i = 0; i < arr.length; i++) {
    mainhtml += `<div class="card" style="width: 24rem;">
        <img src="${arr[i].urlToImage}" style="margin-top: .6rem;" class="card-img" alt="..." />
        <div class="card-body">
          <h5 class="card-title">
            ${arr[i].title}
          </h5>
          <p class="card-text news-type">
          ${arr[i].source.name} &#x2022
          <span class="card-text publice-date" style="color:grey;">
          ${new Date(arr[i].publishedAt).toLocaleDateString()}
          </span>
          </p>
          <p class="card-desp">
            ${arr[i].description}
          </p>
        </div>
      </div>`;
  }
  cardWrapper.innerHTML=mainhtml;
}

const searchForm=document.querySelector('.search-form');
const searchBtn=document.querySelector('.search-news');

searchForm.addEventListener('submit', async(e)=>{
  let searchBox=document.querySelector('.search-box').value;
  e.preventDefault();
  const data = await fetchData(searchBox);
  renderNewsCard(data.articles)
});



async function SearchMenuList(query){
  const data = await fetchData(query);
  renderNewsCard(data.articles)
}