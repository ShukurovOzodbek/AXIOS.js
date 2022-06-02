let url = 'http://localhost:3001/users'

function react() {
    axios.get(url)
        .then(res => {
            reload(res.data)
        })
        .catch(err => console.log(err))
}

react()

let form_add = document.forms.add
form_add.onsubmit = (e) => {
    e.preventDefault()
    submit()
    let inps = document.querySelectorAll('.input')

    inps.forEach(element => {
        element.value = ''
    });
}

function submit() {
    let user = {
        id: Math.random()
    }

    let fm = new FormData(form_add)

    fm.forEach((value, key) => {
        user[key] = value 
    });

    axios.post(url, user) 
        .then(res => {
            if(res.status ===  200 || res.status ===  201) {
                react()
            }
        })
        .catch(err => console.log(err))
}



function reload(arr) {
    let boxes1 = document.querySelector('.boxes')
    let boxes2 = document.querySelector('.boxes2')
    let boxes3 = document.querySelector('.boxes3')

    boxes1.innerHTML = ''
    boxes2.innerHTML = ''
    boxes3.innerHTML = ''
    for(let item of arr) {
        if(item.age <= 25) {
            boxes1.innerHTML += `
            <div class="item" id="${item.id}">
                <h3>${item.name}</h3>
                <div class="age">
                    <p>Age</p> 
                    <p>${item.age}</p>
                </div>
                <div class="far">
                    <button>delete</button>
                    <button class="edit">edit</button>
                </div>
            </div>
            `
        }else if(item.age > 25 && item.age <= 50) {
            boxes2.innerHTML += `
            <div class="item" id="${item.id}">
                <h3>${item.name}</h3>
                <div class="age">
                    <p>Age</p> 
                    <p>${item.age}</p>
                </div>
                <div class="far">
                    <button>delete</button>
                    <button class="edit">edit</button>
                </div>
            </div>
            `
        }else if(item.age > 50) {
            boxes3.innerHTML += `
            <div class="item" id="${item.id}">
                <h3>${item.name}</h3>
                <div class="age">
                    <p>Age</p> 
                    <p>${item.age}</p>
                </div>
                <div class="far">
                    <button>delete</button>
                    <button class="edit">edit</button>
                </div>
            </div>
            `
        }
        let btns = document.querySelectorAll('.item button')
        btns.forEach(btn => {
            btn.onclick = (e) => {
                let id = e.target.parentNode.parentNode.id

                axios.delete(`${url}/${id}`)
                    .then(res => {
                        if(res.status === 200 || res.status === 201) {
                            react()
                        }
                    })
                    .catch(err => console.log(err))
            }
        });

        let form_edit = document.forms.edit

        function submit_2(id) {
            let edit_user = {}

            let fm = new FormData(form_edit)

            fm.forEach((value, key) => {
                edit_user[key] = value
            });

            axios.patch(`${url}/${id}`, edit_user)
                .then(res => {
                    if(res.status === 200 || res.status === 201) {
                        react()
                    }
                })
                .catch(err => console.log(err))
        }
        let btns2 = document.querySelectorAll('.far .edit')
        btns2.forEach(element => {
            let block = document.querySelector('.block')
            let back = document.querySelector('.back')
            element.onclick = (event) => {
                back.style.display = 'block'
                setTimeout(() => {
                    back.style.opacity = '1'
                    block.style.top = '20%'
                }, 200);
                back.onclick = () => {
                    block.style.top = '-1420%'
                    back.style.display = 'none'
                    back.style.opacity = '0'
                }
                form_edit.onsubmit = (e) => {
                    e.preventDefault()
    
                    submit_2(event.target.parentNode.parentNode.id)
                    
                    block.style.top = '-1420%'
                    back.style.display = 'none'
                    back.style.opacity = '0'

                }
            }
        });
        

    }   
}
