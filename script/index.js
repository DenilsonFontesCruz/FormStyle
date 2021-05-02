// Alertas Personalizados <
function AlertShow (title, text) {

    
    document.querySelector('.container').style.filter = 'blur(10px)'
    document.querySelector('#containerOverlayer').style.display = "flex"
    
    const alertBox = document.querySelector('#alertBox')

    alertBox.style.display = "flex"

    let textsCamp = alertBox.querySelectorAll('p')

    textsCamp = [...textsCamp]

    textsCamp[0].innerHTML = title

    textsCamp[1].innerHTML = text
    
}

function AlertClose () {
    document.querySelector('.container').style = ''
    document.querySelector('#containerOverlayer').style.display = "none"
    document.querySelector('#alertBox').style.display = "none"
}
// > Alertas Personalizados


function imageGet() {

    const file = document.querySelector('#avatarFile').files[0]
    const imageAvatar = document.querySelector('#avatarImage')


    reader = new FileReader()

    reader.onloadend = () => {
        let image = new Image()
        image.src = reader.result

        image.onload = () => {
            if(((image.width % 240) == 0) && ((image.height % 320) == 0)) {
                (imageAvatar.src = reader.result)
            }
            else if(image.width > 240 || image.height > 320){
                if(image.width > image.height) {
                    imageAvatar.style.transform=`scale(${(320 / (image.height / (image.width / 240)))})`
                }
                else if(image.height > image.width) {
                    imageAvatar.style.transform=`scale(${(240 / (image.width / (image.height / 320)))})`
                }

                    imageAvatar.src = reader.result
            }
            else {
                AlertShow('Imagem muito pequena', 'A imagem deve conter no minimo 240px de largura e 320px de comprimento')
                imageAvatar.src = './Images/Profile.png'
            }
        }

    }

    reader.readAsDataURL(file)

}

function verifyEmptyInputs () {

    const form = document.querySelector('#profileForm')

    let textInputs = form.querySelectorAll('input[type=text],[type=email],[type=password],[type=file]')
    let radioInputs = form.querySelectorAll('input[type=radio]')
    let checkboxInputs = form.querySelectorAll('input[type=checkbox]')

    textInputs = [...textInputs]
    radioInputs = [...radioInputs]
    checkboxInputs = [...checkboxInputs]

    textInputs = textInputs.filter(inp => {
        if(inp.value == '') {
            return 1
        }
    })

    radioInputs = radioInputs.reduce((total, inp) => {
        if(inp.checked) {
            return total + 1;
        }else{
            return total
        }
    }, 0)

    checkboxInputs = checkboxInputs.reduce((total, inp) => {
        if(inp.checked) {
            return total + 1;
        }else{
            return total
        }
    }, 0)

    let emptyCamps = ''

    textInputs.forEach(inp => {
        emptyCamps += `${inp.name}<br/>`
    })

    if(radioInputs == 0) {
        emptyCamps += 'Genero<br/>'
    }

    if(checkboxInputs == 0) {
        emptyCamps += 'Linguagens'
    }

    if(emptyCamps != '') {
        AlertShow('Campos não preenchidos', emptyCamps)
        return 1
    }
    else {
        return 0
    }
    
}

document.querySelector('button[type=submit]').addEventListener("click", e => {
    if(verifyEmptyInputs()) {
        e.preventDefault()
    }
    
})
