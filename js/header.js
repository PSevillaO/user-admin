// este archivo lo vamos a cargar en todos los HTML
/*
tenemos que obtener el nav y el user info
  *  hay que evaluar si tenemos un usuario logueado
  * Evaluar su role y ver si pintamos el boton de productos y usuario
  * Pintar el boton de logout

Si no tenemos el user logueado

    * No pintamos los botones admin
    * No colocamos el nombre
    * pintamos el boton login
*/

const headerNav = document.getElementById('header-nav');
const userInfoHeader = document.getElementById('header-user');

//veo si tengo un usuario Logueado
const loguedUser = JSON.parse(localStorage.getItem("currentUser"))

if (loguedUser) {
    //tengo un usuario logueado
    // OJO ACA TENGO QUE CACABIAR
    if (loguedUser.role === 'ADMIN_ROLE') {
        const adminProductLink = document.createElement("a");  // crea una etiqueta vacia
        const adminUserLink = document.createElement("a");

        adminProductLink.href = '/page/admin/product-admin.html';
        adminProductLink.innerHTML = "Productos Admin"
        adminProductLink.classList.add("header-link");

        adminUserLink.href = '/page/admin/user-admin.html';
        adminUserLink.innerHTML = "Usuarios Admin"
        adminUserLink.classList.add("header-link");

        headerNav.appendChild(adminUserLink);
        headerNav.appendChild(adminProductLink);
    }

    const userNameHTML = userInfoHeader.querySelector('.user-name')
    userNameHTML.innerHTML = loguedUser.fullname;

    const userImg = document.createElement('img')
    userImg.src = loguedUser.image;
    userImg.alt = `${loguedUser.fullname} profile picture`
    userImg.classList.add('user-profile-picture')

    userInfoHeader.appendChild(userImg)


    const userActionHTML = userInfoHeader.querySelector('.user-action');
    const logoutButton = document.createElement('button');
    logoutButton.classList.add('header-link')
    logoutButton.innerHTML = 'Logout'
    logoutButton.onclick = function(){
        localStorage.removeItem('currentUser')
        window.location.href='/index.html'
    }

    userActionHTML.append(logoutButton)

} else {
    // no tengo un usuario logueado
    const userActionHTML = userInfoHeader.querySelector('.user-action');
    const loginButton = document.createElement('a');
    loginButton.href = '/page/login/login.html';
    loginButton.innerText = 'Ingresar';
    loginButton.classList.add('header-link');

    userActionHTML.appendChild(loginButton)
}