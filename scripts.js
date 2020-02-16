const mainWrapper = document.getElementById('main-wrapper');
const loading = document.querySelector('.loader');

let limit = 4;
let page = 1;



// Fetch Post from API
async function getAlbums() {
    const response = await fetch(
        `http://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
    );

    const data = await response.json();
    return data;
}


// Show Albums in DOM

async function showAlbums() {
    const albums = await getAlbums();
    albums.forEach(album => {
        const albumEl = document.createElement('div');
        albumEl.classList.add('albums');
        albumEl.innerHTML = `
            <div class="img-album">
                <img src="${album.thumbnailUrl}" alt="">
            </div>
            <div class="post-info">
                <p class="post-body">${album.title}</p>
            </div>`;
            mainWrapper.appendChild(albumEl);
    });
}

// Show loader and fetch more posts

function showLoading() {
    loading.classList.add('show');
    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showAlbums();
        }, 3000);
    }, 1000);
    
}

// Show Initial Albums
showAlbums();

window.addEventListener('scroll', () => {
    // console.log(document.documentElement.scrollTop);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        // console.log(1234);
        showLoading();
    }
    
});



