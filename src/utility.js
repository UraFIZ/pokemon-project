export const getTypeLabels = (data=[]) => {
    const labels = [];
    for (let label of data) {
      switch (label) {
        case "fire":
          labels.push(`<div class="card__feature card__feature--fire heading-3">${label}</div>`)
          break;
        case "grass":
          labels.push(`<div class="card__feature card__feature--grass heading-3">${label}</div>`)
          break;
        case "electric":
          labels.push(`<div class="card__feature card__feature--electric heading-3">${label}</div>`)
          break;
        case "water":
          labels.push(`<div class="card__feature card__feature--water heading-3">${label}</div>`)
          break;
        case "ground":
          labels.push(`<div class="card__feature card__feature--ground heading-3">${label}</div>`)
          break;
        case "rock":
          labels.push(`<div class="card__feature card__feature--rock heading-3">${label}</div>`)
          break;
        case "fairy":
          labels.push(`<div class="card__feature card__feature--fairy heading-3">${label}</div>`)
          break; 
        case "poison":
          labels.push(`<div class="card__feature card__feature--poison heading-3">${label}</div>`)
          break; 
        case "bug":
          labels.push(`<div class="card__feature card__feature--bug heading-3">${label}</div>`)
          break; 
        case "dragon":
          labels.push(`<div class="card__feature card__feature--dragon heading-3">${label}</div>`)
          break; 
        case "psychic":
          labels.push(`<div class="card__feature card__feature--psychic heading-3">${label}</div>`)
          break; 
        case "flying":
          labels.push(`<div class="card__feature card__feature--flying heading-3">${label}</div>`)
          break; 
        case "fighting":
          labels.push(`<div class="card__feature card__feature--fighting heading-3">${label}</div>`)
          break; 
        default:
          labels.push(`<div class="card__feature card__feature--normal heading-3">${label}</div>`)
          break;
      }
    }
    return labels;
  }

  export const getCapitalize = (data) => {
    return data.name[0].toUpperCase() + data.name.substring(1)
  }

  export const fillDetailTable = (data, address) => {
    const detailType = document.querySelector(`${address} .detail-type`);
    const detailAttack = document.querySelector(`${address} .detail-attack`);
    const detailDefense = document.querySelector(`${address} .detail-defense`);
    const detailHp = document.querySelector(`${address} .detail-hp`);
    const detailSpAttack = document.querySelector(`${address} .detail-sp-attack`);
    const detailSpDefense = document.querySelector(`${address} .detail-sp-defense`);
    const detailSpeed = document.querySelector(`${address} .detail-speed`);
    const detailWeight = document.querySelector(`${address} .detail-weight`);
    const detailTotal = document.querySelector(`${address} .detail-total`);
    const typesArr = data.types.map(type => type.type.name);
    detailType.textContent = typesArr.join(", ");
    data.stats.forEach(stat => {
      switch (stat.stat.name) {
        case 'attack':
          detailAttack.textContent = stat['base_stat'];
          break;
        case 'defense':
          detailDefense.textContent = stat['base_stat'];
          break;
        case 'hp':
          detailHp.textContent = stat['base_stat'];
          break;
        case 'special-attack':
          detailSpAttack.textContent = stat['base_stat'];
          break;
        case 'special-defense':
          detailSpDefense.textContent = stat['base_stat'];
          break;
        case 'speed':
          detailSpeed.textContent = stat['base_stat'];
          break;
        default:
          break;
      }
    });
    detailWeight.textContent = data.weight;
    detailTotal.textContent = data.moves.length;
  }