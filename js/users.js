const usersArray = [
    {
        fullname: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
        id: '1',
        active: true,
        password: 'password123',
        bornDate: new Date('1993-01-01').getTime(),
        location: 'Buenos Aires',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/7/71/Mk8iconyoshi.png?width=1280'
    },
    {
        fullname: 'Jane Doe',
        age: 25,
        email: 'jane.doe@example.com',
        id: '2',
        active: false,
        password: 'password456',
        bornDate: new Date('1998-05-05').getTime(),
        location: 'Mendoza',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/f/f5/Mk8icondaisy.png?width=1280'
    },
    {
        fullname: 'Alice Johnson',
        age: 35,
        email: 'alice.johnson@example.com',
        id: '3',
        active: true,
        password: 'password789',
        bornDate: new Date('1988-08-08').getTime(),
        location: 'Buenos Aires',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/1/1d/Mk8icontoadette.png?width=325'
    },
    {
        fullname: 'Michael Smith',
        age: 40,
        email: 'michael.smith@example.com',
        id: '4',
        active: false,
        password: 'password101',
        bornDate: new Date('1983-04-10').getTime(),
        location: 'San Luis',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/d/d1/Mk8iconrosalina.png?width=1280'
    },
    {
        fullname: 'Emily Johnson',
        age: 28,
        email: 'emily.johnson@example.com',
        id: '5',
        active: true,
        password: 'password202',
        bornDate: new Date('1995-02-15').getTime(),
        location: 'San Luis',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/5/59/Mk8iconpeach.png?width=325'
    },
    {
        fullname: 'Daniel Lee',
        age: 34,
        email: 'daniel.lee@example.com',
        id: '6',
        active: false,
        password: 'password303',
        bornDate: new Date('1989-07-07').getTime(),
        location: 'Mendoza',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/bf/Mk8iconmario.png?width=325'
    },
    {
        fullname: 'Samantha Davis',
        age: 22,
        email: 'samantha.davis@example.com',
        id: '7',
        active: true,
        password: 'password404',
        bornDate: new Date('2001-11-11').getTime(),
        location: 'Córdoba',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/2/2d/Mk8icondk.png?width=325'
    },
    {
        fullname: 'James Moore',
        age: 45,
        email: 'james.moore@example.com',
        id: '8',
        active: false,
        password: 'password505',
        bornDate: new Date('1978-12-19').getTime(),
        location: 'Buenos Aires',
        image: 'https://m.media-amazon.com/images/I/81wNRtDaTXL.png?width=325'
    },
    {
        fullname: 'Isabella Taylor',
        age: 29,
        email: 'isabella.taylor@example.com',
        id: '9',
        active: true,
        password: 'password606',
        bornDate: new Date('1994-06-24').getTime(),
        location: 'Mendoza',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/3/3a/Mk8iconkoopa.png?width=325'
    },
    {
        fullname: 'Ethan Johnson',
        age: 31,
        email: 'ethan.johnson@example.com',
        id: '10',
        active: false,
        password: 'password707',
        bornDate: new Date('1992-03-03').getTime(),
        location: 'Buenos Aires',
        image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/mario-kart-for-wii-u/b/b7/Mk8iconbowser.png?width=325'
    }
];


const tableBody = document.getElementById('table-body')
const searchInput = document.getElementById('search')
const userForm = document.getElementById('user-form')
const submitBtn = userForm.querySelector('button[type=submit]')

userForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const el = evt.target.elements
    // console.log(evt.target.elements.location.value)

    if (el.password.value !== el.password2.value) {
        alert("La contraseñas no coinciden")
        return
    }
    const emailExists = usersArray.find((user) => {
        if (user.email === el.email.value) {
            return true
        }
    })

    if (emailExists && el.id.value !==emailExists.id ) {
        Swal.fire({
            title:"El Correo ya existe",
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
    console.log(usuariosFiltrados)
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
        <button class = "action-btn btn-danger" title="Borrar Usuario" onClick="borrarUsuario( '${user.id}','git${user.fullname}' ) ">
        <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class = "action-btn " title="Editar Usuario" onClick="editarUsuario( '${user.id}' )">
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        </td>
    </tr>`
    })
}


function borrarUsuario(ID,nombre) {


    const confirmDelete = confirm(`desea borrar el usuario ${nombre}`)
    const indice = usersArray.findIndex( user => user.id === ID)

    if (!confirmDelete) return;

    usersArray.splice(indice, 1)
    pintarUsuario(usersArray)

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

    console.log("chequeado ",el.active.ckecked, userEdit.active)

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