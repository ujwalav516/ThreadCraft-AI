function togglePassword(){

    const password = document.getElementById("password");
    const eye = document.querySelector(".toggle-password i");

    if(password.type === "password"){

        password.type = "text";

        eye.classList.remove("fa-eye");
        eye.classList.add("fa-eye-slash");

    }else{

        password.type = "password";

        eye.classList.remove("fa-eye-slash");
        eye.classList.add("fa-eye");

    }

}

function login(){

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    emailError.style.display = "none";
    passwordError.style.display = "none";

    if(email === ""){

        emailError.innerText = "Please enter your email.";
        emailError.style.display = "block";
        return;

    }

    if(!email.includes("@")){

        emailError.innerText = "Enter a valid email.";
        emailError.style.display = "block";
        return;

    }

    if(password === ""){

        passwordError.innerText = "Please enter your password.";
        passwordError.style.display = "block";
        return;

    }

    const btn = document.querySelector(".login-btn");

    btn.disabled = true;
    btn.innerHTML = "Logging in...";

    setTimeout(() => {

        window.location.href = "/";

    },1500);

}