// login.js — Firebase COMPAT (sin modules)

const firebaseConfig = {
  apiKey: "AIzaSyB6BUBXhC3oU1JlBCEvkqLwe6lx4JHNduI",
  authDomain: "rifas-new.firebaseapp.com",
  projectId: "rifas-new",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorEl = document.getElementById("loginError");

  errorEl.textContent = "";

  auth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      return auth.signInWithEmailAndPassword(email, password);
    })
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(() => {
      errorEl.textContent = "Correo o contraseña incorrectos";
    });
});
