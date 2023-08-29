
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
    
    const colorPalettes = document.querySelectorAll('.color-palette')
    colorPalettes.forEach(colorPalette => {
        colorPalette.addEventListener('click', () => {
            const colorCode = colorPalette.querySelector('.color-hex').innerText
            
            // Copy the color code to the clipboard
            navigator.clipboard.writeText(colorCode)

            // Show the copied message
            copiedMessage.innerText = `${colorCode} copied to clipboard`
            copiedMessage.style.display = 'block'

            // Hide the message after a delay (e.g., 2 seconds)
            setTimeout(() => {
                copiedMessage.style.display = 'none'
            }, 2000)
        });
    });

}

getInitialColorPalette() 



    


 
