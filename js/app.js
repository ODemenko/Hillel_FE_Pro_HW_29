document.getElementById('details-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const personName = document.getElementById('personName').value.trim();
    const personAge = parseInt(document.getElementById('personAge').value, 10);
    const carModel = document.getElementById('carModel').value.trim();
    const carYear = parseInt(document.getElementById('carYear').value, 10);
    const carColor = document.getElementById('carColor').value.trim();

    const form = document.getElementById('details-form');
    const inputs = form.querySelectorAll('input');
    inputs.forEach(function(input) {
        if (!input.checkValidity()) {
            input.classList.add('is-invalid');
        } else {
            input.classList.remove('is-invalid');
        }
    });

    if (form.checkValidity()) {
        try {
            const person = new Person(personName, personAge);
            const car = new Car(carModel, carYear, carColor);
            car.assignOwner(person);

            document.getElementById('person-details').textContent = `Name: ${person.name}, Age: ${person.age}`;
            document.getElementById('car-details').textContent = `Model: ${car.model}, Year: ${car.year}, Color: ${car.color}, Owner: ${person.name}`;
            document.getElementById('details-display').classList.remove('d-none');
        } catch (error) {
            console.error(error.message);
        }
    }
});

function Person(name, age) {
    if (!name || typeof name !== 'string') {
        throw new Error("Invalid name");
    }

    if (age < 18) {
        throw new Error("Person must be at least 18 years old");
    }

    this.name = name;
    this.age = age;
}

function Car(model, year, color) {
    if (!model || !year || !color) {
        throw new Error("Invalid car properties");
    }

    this.model = model;
    this.year = year;
    this.color = color;
    this.owner = null;
}

Car.prototype.assignOwner = function(person) {
    this.owner = person;
};