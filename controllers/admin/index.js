const USER_API = '../api/services/admin/administrador.php';
const SIGNUP_FORM = document.getElementById('signupForm');
const LOGIN_FORM = document.getElementById('loginForm');
const MAIN_TITLE = document.getElementById('mainTitle');

document.addEventListener('DOMContentLoaded', async () => {
    const DATA = await fetchData(USER_API, 'readUsers');
    if (DATA.session) {
        location.href = 'inicio_admin.html';
    } else if (DATA.status) {
        MAIN_TITLE.textContent = 'Iniciar sesión';
        LOGIN_FORM.classList.remove('d-none');
        sweetAlert(4, DATA.message, true);
    } else {
        MAIN_TITLE.textContent = 'Registrar primer usuario';
        SIGNUP_FORM.classList.remove('d-none');
        sweetAlert(4, DATA.error, true);
    }
});

SIGNUP_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(SIGNUP_FORM);
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

LOGIN_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(USER_API, 'logIn', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'inicio_admin.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});
