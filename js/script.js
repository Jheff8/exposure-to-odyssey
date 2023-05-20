// animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting) {
            console.log(entry.isIntersecting)
            entry.target.classList.add('normal')
        } else {
            entry.target.classList.remove('normal')
        }
    })
})

let hiddenElements = document.querySelectorAll('.right-scroll-animation')
hiddenElements = Array.from(hiddenElements).concat(Array.from(document.querySelectorAll('.left-scroll-animation')))
hiddenElements.forEach((el) => observer.observe(el))

// carrousel
const controls = document.querySelectorAll('.controls')

let currentItem = 1
const items = document.querySelectorAll('.items')
const carrosselContainer = document.querySelector('.gallery')

const maxItems = items.length

let carouselTitle = document.querySelector('#carousel-title-text')
let caroutelSubtitle = document.querySelector('#carousel-subtitle-text')
const titleUnderline = document.querySelector('span.white-underline')


const textList = [
    {h2: "Socrates", p: "Socrates was an athenian philosopher considered one of the founders of Western philosophy. He believed that knowledge was the key to virtue and happiness, and his teachings influenced many philosophers and thinkers throughout history."},
    {h2: "Barnabas", p: "Friend and crew member of the game's protagonist, the mercenary <span class='text-gold'>Alexios</span> or <span class='text-gold'>Kassandra</span>. Barnabas is inspired by the historical figure of Barnabas of Tarsus, one of the earliest followers of Jesus Christ."},
    {h2: "Herodotos", p: 'Known as the "father of history," Herodotus was a Greek historian who lived in the 5th century BCE. He traveled the ancient world and wrote about the Greco-Persian Wars and other important events of his time.'},
    {h2: "Pericles", p: "One of the most famous leaders of the Greek city-state of Athens, Pericles lived in the 5th century BCE. He promoted culture, democracy, and the construction of monuments in the city, including the Parthenon."},
    {h2: "Alcibiades", p:"Athenian politician, general, and orator of the 5th century BCE. He was one of the most controversial and charismatic figures of his time, involving himself in political and military intrigues. He was exiled several times and eventually assassinated."}
]

document.addEventListener('DOMContentLoaded', () => {
    // centraliza o elemento atual do carrosel
    carrosselContainer.scrollLeft = items[currentItem].offsetLeft - (carrosselContainer.offsetWidth / 2) + (items[currentItem].offsetWidth / 2)
    // troca o texto de acordo com o elemento atual do carrosel
    carouselTitle.innerHTML = textList[currentItem - 1].h2
    titleUnderline.style.width = `${carouselTitle.offsetWidth}px`
    carouselTitle.innerHTML = titleUnderline.outerHTML + textList[currentItem - 1].h2
    caroutelSubtitle.innerHTML = textList[currentItem - 1].p
})

controls.forEach(control => {
    control.addEventListener('click', () => {
        const isLeft = control.classList.contains('previous-button')
        isLeft ? currentItem-- : currentItem++
        
        if(currentItem >= maxItems - 1) {
            currentItem = 1
        } else if(currentItem < 1) {
            currentItem = maxItems - 2
        }
        items.forEach(item => 
            item.classList.remove('current-item')
        )
        if(currentItem != 0 && currentItem != 7){
            const newTitle = textList[currentItem - 1].h2
            const newSubtitle = textList[currentItem - 1].p
            const textBlock = document.querySelectorAll('.carousel-text-block')
            // efeito fade-out 
            textBlock.forEach((element) =>{
                element.classList.add('hide')
            })
            setTimeout(() => {
                // atualizar o texto de acordo com o elemento atual
                carouselTitle.innerHTML = newTitle
                titleUnderline.style.width = `${carouselTitle.offsetWidth}px`
                carouselTitle.innerHTML = titleUnderline.outerHTML + newTitle
                caroutelSubtitle.innerHTML = newSubtitle
                // efeito fade-in
                textBlock.forEach((element) =>{
                    element.classList.remove('hide')
                })
            }, 600)
            // centralizar elemento atual
            carrosselContainer.scroll({
                left: items[currentItem].offsetLeft - (carrosselContainer.offsetWidth / 2) + (items[currentItem].offsetWidth / 2),
                behavior: 'smooth'
              })
            items[currentItem].classList.add('current-item')
        }
    })
})

// nav
const checkbox = document.querySelector('#menu-hamburguer')
const container = document.querySelector('.nav-format')

document.addEventListener('click', function(event) {
  // verifica se o clique ocorreu fora do container e se a checkbox está marcada
  if (event.target !== container && event.target.parentNode !== container && checkbox.checked) {
    // desmarca a checkbox para fechar o menu
    checkbox.checked = false
  }
})
document.addEventListener('scroll', function() {
    // verifica se a checkbox está marcada
    if (checkbox.checked) {
      checkbox.checked = false
    }
})

// newsletter
const newsletterInput = document.querySelector('#newsletter-input')
const newsletterButton = document.querySelector('.newsletter-btn')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


newsletterButton.addEventListener('click', () => {
    alert('Cadastro concluído com sucesso. Obrigado pela confiança.')
    newsletterInput.value = ''
    newsletterInput.style.border = '0px solid #806916'
    newsletterButton.disabled = true
})

newsletterInput.addEventListener('input', (event) => {
    if(emailRegex.test(event.target.value)) {
        newsletterInput.style.border = '2px solid #806916'
        newsletterButton.disabled = false
    } else if(event.target.value == ''){
        newsletterInput.style.border = '0px solid #806916'
        newsletterButton.disabled = true
    } else {
        newsletterInput.style.border = '2px solid red'
        newsletterButton.disabled = true
    }
})