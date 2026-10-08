const date = new Date();
const day = date.getDate()
const month = date.getMonth() + 1
const year = date.getFullYear()
const currentDate = document.querySelector('.currentDate')
if (currentDate) {
  currentDate.innerHTML = `A arena está pronta para novas batalhas. Hoje é <strong>${day}/${month}/${year}</strong>.`
}