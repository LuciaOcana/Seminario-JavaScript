//Configuración dell módulo readline: 
//Con esta parte del codigo podremos leer la entrada del usuario desde la consola para poder interactuar a través de ella.
const readline = require('readline');

// Crear interfaz para leer la entrada del usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Función para mostrar el menú principal
function mostrarMenu() {
    console.log("\n--- Menú Principal ---");
    console.log("1. Ver una tarea (TODO) por ID");
    console.log("2. Ver todos los posts de un usuario");
    console.log("3. Procesar posts de un usuario (map, filter, reduce)");
    console.log("0. Salir");
    rl.question("\nSelecciona una opción: ", (opcion) => {
        switch (opcion) {
            case '1':
                obtenerTodoPorId();
                break;
            case '2':
                obtenerPostsDeUsuario();
                break;
            case '3':
                procesarPostsDeUsuario();
                break;
            case '0':
                console.log("Saliendo del programa...");
                rl.close();
                break;
            default:
                console.log("Opción no válida. Intenta de nuevo.");
                mostrarMenu();  // Volver a mostrar el menú si la opción es inválida
                break;
        }
    });
}

// Función para pedir al usuario un ID y hacer la solicitud fetch para obtener una tarea (TODO)
function obtenerTodoPorId() {
    rl.question("Introduce el ID de la tarea que quieres ver: ", (id) => {
        //Realización de la solicitud HTTP a la API para obtener la tarea.
        fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo encontrar la tarea con el ID especificado.');
                }
                return response.json(); //Convierte la respuesta en formato JSON.
            })
            .then(todo => {
                // Mostrar los datos de la tarea (TODO)
                console.log(`\nTarea ID: ${todo.id}`);
                console.log(`Título: ${todo.title}`);
                console.log(`Completada: ${todo.completed ? 'Sí' : 'No'}`);
                mostrarMenu();  // Volver a mostrar el menú después de la acción
            })
            .catch(error => {
                console.error('Error:', error.message);
                mostrarMenu();  // Volver a mostrar el menú en caso de error
            });
    });
}

// Función para pedir al usuario un ID y obtener todos los posts del usuario
function obtenerPostsDeUsuario() {
    rl.question("Introduce el ID del usuario para ver sus posts: ", (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los posts del usuario.');
                }
                return response.json();
            })
            .then(posts => {
                // Mostrar los títulos de los posts del usuario
                console.log(`\nPosts del Usuario ${id}:`);
                posts.forEach(post => {
                    console.log(`- ${post.title}`);
                });
                mostrarMenu();  // Volver a mostrar el menú después de la acción
            })
            .catch(error => {
                console.error('Error:', error.message);
                mostrarMenu();  // Volver a mostrar el menú en caso de error
            });
    });
}

// Función para pedir al usuario un ID y procesar los posts (usando map, filter, reduce)
function procesarPostsDeUsuario() {
    rl.question("Introduce el ID del usuario para procesar sus posts: ", (id) => {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener los posts del usuario.');
                }
                return response.json();
            })
            .then(posts => {
                console.log("\n--- Procesamiento de Posts usando map, filter y reduce ---");

                // Combinación de map, filter y reduce
                const totalCaracteresPostsLargos = posts
                    .map(post => post.title) // 1. Usar map para obtener solo los títulos
                    .filter(title => title.length > 30) // 2. Filtrar títulos con más de 30 caracteres
                    .reduce((acc, title) => acc + title.length, 0); // 3. Contar el número total de caracteres

                console.log(`\nNúmero total de caracteres en los títulos de los posts con más de 30 caracteres: ${totalCaracteresPostsLargos}`);
                mostrarMenu();  // Volver al menú después de procesar
            })
            .catch(error => {
                console.error('Error:', error.message);
                mostrarMenu();  // Volver al menú en caso de error
            });
    });
}

// Iniciar el programa mostrando el menú
mostrarMenu();
