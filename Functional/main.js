
//Array de Usuarios
const users = [
    {
        name: "Lucía",
        lastname: "Ocaña",
        username: "luciaocana",
        birthdate: 2001,
        description: "Me gustan las galletas"
    },
    {
        name: "MJ",
        lastname: "Ocaña",
        username: "mjor",
        birthdate: 2006,
        description: "Me gustan las tortitas"
    },
    {
        name: "Seth",
        lastname: "Ramírez",
        username: "sethrs",
        birthdate: 2001,
        description: "Me gusta la carne"
    }
]
// Función para buscar un usuario por username
function buscarUsuario() {
    // Obtener el valor del input (el username)
    const usernameInput = document.getElementById('usernameInput').value;

    // Buscar el usuario en la lista de usuarios
    const usuarioEncontrado = users.find(user => user.username === usernameInput);

    // Referencia al div donde se mostrarán los resultados
    const userDetailsDiv = document.getElementById('userDetails');

    // Limpiar el div antes de mostrar nuevos resultados
    userDetailsDiv.innerHTML = '';

    if (usuarioEncontrado) {
        // Si el usuario fue encontrado, mostrar sus detalles
        const { name, lastname, birthdate, description } = usuarioEncontrado;

        // Calcular la edad del usuario
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthdate;
        
        // Mostrar los datos del usuario en el HTML
        userDetailsDiv.innerHTML = `
            <h2>Datos del Usuario</h2>
            <p><strong>Nombre:</strong> ${name} ${lastname}</p>
            <p><strong>Fecha de nacimiento:</strong> ${birthdate} (${age} años)</p>
            <p><strong>Descripción:</strong> ${description}</p>
        `;
    } else {
        // Si el usuario no fue encontrado, mostrar un mensaje de error
        userDetailsDiv.innerHTML = '<p style="color: red;">Usuario no encontrado. Intenta con otro username.</p>';
    }
}

function userAgesCombination(){
  
    const currentYear = new Date().getFullYear();

    const adultListHTML = users
        .filter(user => {
            //Filtra usuarios mayores de 18 años
            const age = currentYear - user.birthdate;
            return age >= 18;})
        .sort((a, b) => {
            //Ordena a los usuarios mayores de 18 por edad de mayor a menor
            const ageA = new Date().getFullYear() - a.birthdate;
            const ageB = new Date().getFullYear() - b.birthdate;
            return ageB - ageA;})
        .reduce((acc, user) => {
            //Crea una lista de nombres de los adultos
            const age = new Date().getFullYear() - user.birthdate;
            return acc + `<li>${user.name} ${user.lastname} (${age} años) - ${user.description}</li>`;
            }, '');

    // Mostrar los datos en el HTML
    const userDetailsDiv = document.getElementById('userDetails');
    userDetailsDiv.innerHTML = `
        <ul>${adultListHTML}</ul>
    `;
}

