async function fetchProperties() {
    try {
        const response = await fetch("http://localhost:3000/properties");
        const data = await response.json();
        const propertyList = document.getElementById("property-list");
        propertyList.innerHTML = "";

        data.properties.forEach(property => {
            const propertyElement = document.createElement("div");
            propertyElement.innerHTML = `<strong>${property.name}</strong>: ${property.units.join(', ')} <button onclick="deleteProperty('${property.name}')">Delete</button>`;
            propertyList.appendChild(propertyElement);
        });
    } catch (error) {
        console.error("Error fetching properties", error);
    }
}

fetchProperties();