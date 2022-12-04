`use strict`;
const API = `https://jsonplaceholder.typicode.com`

const galleryTiles = document.querySelector(`#galleryTiles`);
const albumList = document.querySelector(`#albumList`);

if (galleryTiles) {
    let albumId = JSON.parse(localStorage.getItem(`albumId`))
    fetch(API + `/photos?albumId=` + albumId)
        .then(data => data.ok ? data.json() : Promise.reject(data.statusText))
        .then(data => data.forEach(item => {
            renderCards(item);
        }))
        .catch(err => console.log(`In catch: ${err}.`));

    const renderCards = card => {
        const tile = document.createElement(`div`);
        tile.className = `card`;
        tile.id = card.id;
        tile.style.width = `16rem`

        const thumbnail = document.createElement(`img`);
        thumbnail.className = `card-img-top`
        thumbnail.src = card.thumbnailUrl;
        thumbnail.alt = `Tile pic`

        const cardText = document.createElement(`p`)
        cardText.className = `card-text`
        cardText.innerHTML = card.title;

        tile.append(thumbnail, cardText);
        galleryTiles.append(tile);
    }
}

if (albumList) {
    fetch(API + `/albums`)
        .then(data => data.ok ? data.json() : Promise.reject(data.statusText))
        .then(data => data.forEach(item => {
            renderAlbumList(item);
        }))
        .catch(err => console.log(`In catch: ${err}.`));

    const renderAlbumList = item => {
        const listItem = document.createElement(`a`);
        listItem.className = `list-group-item list-group-item-action`;
        listItem.setAttribute(`userId`, item.userId);
        listItem.id = item.id;
        listItem.style.width = `16rem`
        listItem.innerHTML = item.title
        listItem.href = `album.html`
        listItem.addEventListener(`click`, e => {
            localStorage.setItem(`albumId`, item.userId)
        })
        albumList.append(listItem);
    }
}
