// const marvel = {
//   render: () => {
//     const urlAPI = 'https://gateway.marvel.com/v1/public/comics?ts=1&apikey=476dc1b2d49f463c22c34cb1578bfdd0&hash=653580380735072c47d7edc8e4d8254a';
//     const container = document.querySelector('#comics');
//     let contentHTML = '';

//     fetch(urlAPI)
//       .then(res => res.json())
//       .then((json) => {
//         for (const comic of json.data.results) {
//           console.log(comic);
//           contentHTML += `
//             <div class="divComic">
//                 <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}"  alt="${comic.title}">
//                 <div class="si">
//                   <p class="comicTitulo">${comic.title}</p>
//                 </div>
//             </div>
//           `;
//           /*
//                               <div class="btn-group">
//                       <a href="${comic.urls[0].url}" target="_blank" class="btn btn-sm btn-outline-secondary">View</a>
//                     </div>
//           */
//         }
//         container.innerHTML = contentHTML;

//       })
//   }
// };
// marvel.render();