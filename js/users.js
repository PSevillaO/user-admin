

const tableBody = document.getElementById('table-body')
const searchInput = document.getElementById('search')
const userForm = document.getElementById('user-form')
const submitBtn = userForm.querySelector('button[type=submit]')

userForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const el = evt.target.elements
    // console.log(evt.target.elements.location.value)

    // if (el.password.value !== el.password2.value) {
    // alert("La contraseñas no coinciden")
    // return
    // }
    const emailExists = usersArray.find((user) => {
        if (user.email === el.email.value) {
            return true
        }
    })

    if (emailExists && el.id.value !== emailExists.id) {
        Swal.fire({
            title: "El Correo ya existe",
            icon: 'error'
        })
        // alert("El correo ya se encuentra registrado")
        return
    }

    // OPERADOR TERNARIO    
    // let id
    // if(el.id.value){
    //     id = el.id.value
    // }else{
    //     id = crypto.randomUUID()
    // }
    const id = el.id.value ? el.id.value : crypto.randomUUID();



    user = {
        fullname: el.fullname.value,
        age: el.age.valueAsNumber,
        email: el.email.value,
        password: el.password.value,
        active: el.active.ckecked,// esta propiedad da true o false
        bornDate: new Date(el.bornDate.value).getTime(),
        location: el.location.value,
        id: id,
        image: el.image.value
    }

    // pregunto si estoy editando
    if (el.id.value) {
        // editando
        const indice = usersArray.findIndex(usuario => {
            if (usuario.id === el.id.value) {
                return true
            }
        })

        usersArray[indice] = user;
        //Swal.fire('Usuario Editado', 'El usuario se Edito correctamente')

        Swal.fire({
            title: 'Usuario Editado',
            text: 'El usuario se Edito correctamente',
            icon: 'success',
            timer: 1000
        })
    } else {
        // agregando un usuaruo nuevo   
        usersArray.push(user)
        // Swal.fire('Usuario Agregado', 'El usuario se Agrego correctamente')

        Swal.fire({
            title: 'Usuario Agregado',
            text: 'El usuario se Agrego correctamente',
            icon: 'success',
            timer: 1000
        })
    }
    pintarUsuario(usersArray)
    actualizarLocalStorage()
    resetearFormulario();

})

function resetearFormulario() {
    userForm.reset();
    userForm.elements.password.disabled = false
    userForm.elements.password2.disabled = false
    submitBtn.classList.remove('btn-edit')
    submitBtn.innerHTML = "Agregar Usuario"
    userForm.fullname.focus()
}


searchInput.addEventListener('keyup', (evento) => {
    const inputValue = evento.target.value.toLowerCase()
    const usuariosFiltrados = usersArray.filter((usuario) => usuario.fullname.toLowerCase().includes(inputValue))
    pintarUsuario(usuariosFiltrados)
})

pintarUsuario(usersArray)

function pintarUsuario(arrayPintar) {
    tableBody.innerHTML = '';
    arrayPintar.forEach((user, index) => {
        tableBody.innerHTML += `<tr class="table-body">
        <td class="user-image">
            <img src=${user.image}" alt=${user.fullname} avatar>
        </td>
        <td class="user-name">${user.fullname}</td>
        <td class="user-email">${user.email}</td>
        <td class="user-location">${user.location}</td>
        <td class="user-age">${user.age}</td>
        <td class="user-date">${formatDate(user.bornDate)}</td>
        <td> 
        <button class = "action-btn btn-danger" title="Borrar Usuario" onClick="borrarUsuario( '${user.id}','${user.fullname}' ) ">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class = "action-btn " title="Editar Usuario" onClick="editarUsuario( '${user.id}' )">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        </td>
    </tr>`
    })
}

function actualizarLocalStorage() {
    localStorage.setItem("users", JSON.stringify(usersArray));
}


function borrarUsuario(ID, nombre) {

    const confirmDelete = confirm(`desea borrar el usuario ${nombre}`)
    const indice = usersArray.findIndex(user => user.id === ID)

    if (!confirmDelete) return;

    usersArray.splice(indice, 1)
    pintarUsuario(usersArray)
    actualizarLocalStorage()

}



function editarUsuario(id) {
    const userEdit = usersArray.find((usuario) => {
        if (usuario.id === id) {
            return true
        }
    })

    if (!userEdit) {
        Swal.fire('Error al editar', 'No se pudo editar el usuario', 'error')
        console.warn('El Usuario no existe ')
        return
    }


    const el = userForm.elements;
    el.id.value = userEdit.id;

    el.age.value = userEdit.age;
    el.fullname.value = userEdit.fullname;
    el.email.value = userEdit.email;
    el.image.value = userEdit.image;
    el.location.value = userEdit.location;
    el.active.ckecked = userEdit.active;

    console.log("chequeado ", el.active.ckecked, userEdit.active)

    el.password.value = userEdit.password
    el.password.disabled = true
    el.password2 = userEdit.password2
    el.password2.disabled = true
    el.bornDate.value = formatInputName(userEdit.bornDate)


    submitBtn.classList.add('btn-edit')
    submitBtn.innerHTML = 'Editar Usuario'
}


function formatDate(date) {
    const collector = new Intl.DateTimeFormat('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
    const fechaFormateada = collector.format(date)
    return fechaFormateada

}

function formatInputName(fechaInput) {
    const fecha = new Date(fechaInput)

    const year = fecha.getFullYear();
    let month = fecha.getMonth() + 1;
    let date = fecha.getDate()

    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    return (`${year}-${month}-${date}`)
}