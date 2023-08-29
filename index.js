
const colorBtn = document.getElementById('color-btn')
const colorPicker = document.getElementById('color-picker')
const colorModeSelector = document.getElementById('color-mode-selector')
const copiedMessage = document.getElementById('copied-message')

function getInitialColorPalette(){
    fetch ('https://www.thecolorapi.com/scheme?hex=E63946&mode=monochrome')
        .then (res => res.json())
        .then (colorData => {
            renderColorPallete(colorData)
        })
}

colorBtn.addEventListener('click', function(){
    const finalColor = colorPicker.value.substring(1).toUpperCase()
    const finalScheme = colorModeSelector.value.toLowerCase()

    fetch (`https://www.thecolorapi.com/scheme?hex=${finalColor}&mode=${finalScheme}`)
        .then (res => res.json())
        .then (colorData => {
        renderColorPallete(colorData)
    })
})

function renderColorPallete(colorData) {
    const selectedPalette = colorData.colors.map(color => `
        <div id="color-palette" class="color-pallete" style="background-color:${color.hex.value}"></div>
    `).join('')
    document.getElementById("main-color-scheme").innerHTML = selectedPalette
    
    const selectedHex = colorData.colors.map(color => `
        <p class="color-hex">${color.hex.value}</p>
    `).join('')
    document.getElementById('hex-code').innerHTML = selectedHex  
}

getInitialColorPalette() 



    


 
