import './scss/main.scss';
import { getTypeLabels, getCapitalize, fillDetailTable } from './utility';

const pokeCardWrapper = document.querySelector(".cards-wrapper");
const loadMoreBtn = document.querySelector(".btn-load-more");
const detailWrapper = document.querySelector(".detail-info-wrapper");

let pokeImg = document.querySelector(".detail-info__img");
const pokeName = document.querySelector(".detail-info-name");
const nameId = document.querySelector(".name-id");

const loader = document.querySelector(".loading");
const selectType = document.querySelector("#select-type");
const selectBtn = document.querySelector(".select-btn");

let loadMoreLink;

const fetchPokemonChunk = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
 
  const { results, next } = data;
  loadMoreLink = next;
  for (let item of results) {
    let urlArr = item.url.split("/");
    let id = urlArr[urlArr.length - 2];
    fetchSinglePokemon(id);
  }
  setTimeout(()=>{
    loader.classList.add("hide");
  }, 200) 
 
}

const fetchSinglePokemon = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  createPokemonCard(data);
}

const getLoadMoreCards = () => {
  if (loadMoreLink) {
    fetchPokemonChunk(loadMoreLink);
  }
}


function showDetailInfoOnMobile(data, address) {
  fillDetailTable(data, address);
  document.querySelector(address).classList.toggle("open");
}

function showDetailInfoDeskTop(data) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${data}`)
    .then(res => res.json())
    .then(data => {
      createDetailCard(data);
      detailWrapper.classList.remove("hidden");
    })
}

function createDetailCard(data) {
  const { name, sprites, id } = data;
  pokeImg.src = sprites.front_default;
  pokeImg.alt = name;
  pokeName.textContent = getCapitalize(data);
  nameId.innerHTML = `#${id.toString().padStart(3, '0')}`;
  fillDetailTable(data, ".detail-info-content");
}

function createPokemonCard(data) {
  const typesArr = data.types.map(type => type.type.name);
  const pokemonItem = document.createElement('div');
  pokemonItem.removeEventListener("click", showDetailInfoOnMobile);
  pokemonItem.removeEventListener("click", showDetailInfoDeskTop);
  pokemonItem.classList.add('card');
  pokemonItem.setAttribute("data-id", data.id);
  const pokemonHtml = `
  <div class="card__desktop">
  <div class="card__img-wrapper">
  <img class="card__img" src="https://pokeres.bastionbot.org/images/pokemon/${data.id}.png" alt="${data.name}" />
  </div>
  <div class="card__content">
      <h3 class="card__name heading-2">${getCapitalize(data)}</h3>
      <div class="card__feature-wrapper">
      ${getTypeLabels(typesArr).join('')}
      </div>
  </div>
</div>
<div class="card__mobile">
  <table class="detail-table">
      <tr>
          <td class="detail-right">Type</td>
          <td class="detail-type"></td>
      </tr>
      <tr>
          <td class="detail-right">Attack</td>
          <td class="detail-attack"></td>
      </tr>
      <tr>
          <td class="detail-right">Defense</td>
          <td class="detail-defense"></td>
      </tr>
      <tr>
          <td class="detail-right">HP</td>
          <td class="detail-hp"></td>
      </tr>
      <tr>
          <td class="detail-right">SP Attack</td>
          <td class="detail-sp-attack"></td>
      </tr>
      <tr>
          <td class="detail-right">SP Defense</td>
          <td class="detail-sp-defense"></td>
      </tr>
      <tr>
          <td class="detail-right">Speed</td>
          <td class="detail-speed"></td>
      </tr>
      <tr>
          <td class="detail-right">Weight</td>
          <td class="detail-weight"></td>
      </tr>
      <tr>
          <td class="detail-right">Total moves</td>
          <td class="detail-total"></td>
      </tr>
  </table>
</div>
  `
  pokemonItem.innerHTML = pokemonHtml;
  if (window.screen.width < 600) {
    pokemonItem.addEventListener("click", showDetailInfoOnMobile.bind(this, data, `[data-id='${data.id}']`));
  } else {
    pokemonItem.addEventListener("click", showDetailInfoDeskTop.bind(this, data.id));
  }
  pokeCardWrapper.appendChild(pokemonItem);

}
loadMoreBtn.addEventListener("click", getLoadMoreCards);

fetchPokemonChunk("https://pokeapi.co/api/v2/pokemon?offset=0&limit=12");

function addFilter(e) {
  const cards = document.querySelectorAll(".card");
    e.preventDefault();
    console.log(selectType.value);
    cards.forEach((card, inx) => {
      let types = [...card.querySelectorAll(".card__feature")];
      const someArr = types.filter(item => item.innerHTML == selectType.value);
      if(someArr.length == 0) {
        card.classList.add("hide");
      }else{
        card.classList.remove("hide");
      }
    })
}

function getFilteredCards() {
  selectBtn.removeEventListener("click", addFilter)
  selectBtn.addEventListener("click", addFilter)
}

getFilteredCards();