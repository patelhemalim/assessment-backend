const baseURL = `http://localhost:4000/api/perfumes`

const complimentBtn = document.getElementById("complimentButton")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
        });
};

complimentBtn.addEventListener('click', getCompliment)


const fortuneBtn = document.getElementById("fortunecookieButton")

const getFortuneCookie = () => {
    axios.get("http://localhost:4000/api/cookie/").then(res => {
        const data = res.data;
        alert(data);
    });
};

fortuneBtn.addEventListener('click',getFortuneCookie)

const perfumesContainer = document.querySelector('#perfumes-container')
const form = document.querySelector('form')

const perfumesCallback = ({ data: perfumes }) => displayPerfumes(perfumes)
const errCallback = err => console.log(err)

const getAllPerfumes = () => axios.get(baseURL).then(perfumesCallback).catch(errCallback)
const creatPerfume = body => axios.post(baseURL,body).then(perfumesCallback).catch(errCallback)
const deletePerfume = id => axios.delete(`${baseURL}/${id}`).then(perfumesCallback).catch(errCallback)
const updatePerfumes =(id,type) => axios.put(`${baseURL}/${id}`,{type}).then(perfumesCallback).catch(errCallback)


function submitHandler(e){
    e.preventDefault()
    let title = document.querySelector('#title')
    let price = document.querySelector('#price')
    let fragrance = document.querySelector('#fragrance')
    let qty = document.querySelector('#qty')
    let imageURL = document.querySelector('#image')
    
    let bodyObj = {
        title:title.value,
        price:price.value,
        fragrance:fragrance.value,
        qty:qty.value,
        imageURL:imageURL.value
    }

    creatPerfume(bodyObj)

    title.value = ''
    price.value = ''
    fragrance.value = ''
    qty.value=''
    imageURL.value = ''
}


function createPerfumeCard(perfume) {
    const perfumeCard = document.createElement('div')
    perfumeCard.classList.add('perfume-card')
    perfumeCard.innerHTML = `<img alt='perfume cover image' src='${perfume.imageURL}' class="perfume-cover-image"/>
    <p class="perfume-title"><b>Title:</b> ${perfume.title}</p>
    <p class="perfume-price"><b>Price:</b> ${perfume.price}$</p>
    <p class="perfume-fragrance"><b>Fragrance:</b> ${perfume.fragrance}</p>

    <div class="btns-container">
        <button onclick="updatePerfumes(${perfume.id}, 'minus')">-</button>
        <p class="perfume-quantity"><b>Quantity:</b> ${perfume.qty}</p>
        <button onclick="updatePerfumes(${perfume.id}, 'plus')">+</button>
    </div>
    <button onclick="deletePerfume(${perfume.id})"><b>Delete</b></button>
    `
    perfumesContainer.appendChild(perfumeCard)
}

function displayPerfumes(arr) {
    perfumesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createPerfumeCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
