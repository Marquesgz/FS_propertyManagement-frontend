async function fetchProperties(bedrooms = null) {
    let url = "http://localhost:3000/properties";

    if (bedrooms !== null) {
        url += `?bedrooms=${bedrooms}`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        const propertyList = document.getElementById("property-list");
        propertyList.innerHTML = "";
       if (data.properties.length > 0) {
        data.properties.forEach(property => {
            const unitsText = property.units.map(unit => `${unit.count} ${unit.type}`).join(", ");
            const propertyElement = document.createElement("div");
            propertyElement.innerHTML = `<strong>${property.name}</strong>: ${unitsText} <button onclick="deleteProperty('${property.name}')">Delete</button>`;
            propertyList.appendChild(propertyElement);
      });
    } else {
        propertyList.innerHTML = "<p>No properties found with that number of bedrooms.</p>";
    }

    } catch (error) {
        console.error("Error fetching properties", error);
    }
}

function searchProperties() {
    const bedroomsInput = document.getElementById("filter-bedrooms").value;
    const bedrooms = bedroomsInput ? parseInt(bedroomsInput, 10) : null;
    
    fetchProperties(bedrooms);
    

    
}

async function addProperty() {
    const name = document.getElementById("property-name").value;
    const units = [];
    const unitTypes = ["kitchen", "bathroom", "bedroom", "living-room"];

    unitTypes.forEach((unit) => {
        const checkbox = document.getElementById(unit);
        const countInput = document.getElementById(`${unit}-count`);

        if (checkbox.checked) {
            const count = parseInt(countInput.value, 10);
            if (count > 0) {
                units.push({type: unit, count: count });
            }
        }
    });

    try {
        await fetch("http://localhost:3000/properties", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ name, units}),
        });
        fetchProperties();
    } catch (error) {
        console.error("Error adding property:", error);
    }
}

async function deleteProperty(name) {
    try {
        await fetch("http://localhost:3000/properties", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        fetchProperties();
    } catch (error) {
        console.error("Error deleting property:", error);
    }
}

fetchProperties();