const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "ADMIN_USER"){
    window.location.href = '/index.html';
}