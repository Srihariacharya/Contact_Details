document.addEventListener("DOMContentLoaded", function () {
    loadContacts();

    // Get the phone input field and apply live formatting
    const phoneInput = document.getElementById("phone");
    phoneInput.addEventListener("input", formatPhoneNumber);
});

function formatPhoneNumber(event) {
    let input = event.target.value.replace(/\D/g, ""); // Remove all non-numeric characters

    if (input.length > 3 && input.length <= 6) {
        input = input.slice(0, 3) + "-" + input.slice(3);
    } else if (input.length > 6) {
        input = input.slice(0, 3) + "-" + input.slice(3, 6) + "-" + input.slice(6, 10);
    }

    event.target.value = input.substring(0, 12); // Limit to XXX-XXX-XXXX format
}

function loadContacts() {
    fetch("fetch_contacts.php")
        .then(response => response.json())
        .then(data => {
            const contactList = document.getElementById("contactList");
            contactList.innerHTML = "";
            data.forEach(contact => {
                let li = document.createElement("li");
                li.innerHTML = `
                    Name: ${contact.name} - Email: ${contact.email} - Phone: ${contact.phone}
                    <button class="edit" onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.phone}')">✏️</button>
                    <button class="delete" onclick="deleteContact(${contact.id})">🗑️</button>
                `;
                contactList.appendChild(li);
            });
        });
}
let allContacts = [];

function loadContacts() {
    fetch("fetch_contacts.php")
        .then(response => response.json())
        .then(data => {
            allContacts = data;
            displayContacts(data);
        });
}

function displayContacts(contacts) {
    const contactList = document.getElementById("contactList");
    contactList.innerHTML = "";
    contacts.forEach(contact => {
        let li = document.createElement("li");
        li.innerHTML = `
            Name: ${contact.name} - Email: ${contact.email} - Phone: ${contact.phone}
            <button class="edit" onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.phone}')">✏️</button>
            <button class="delete" onclick="deleteContact(${contact.id})">🗑️</button>
        `;
        contactList.appendChild(li);
    });
}

function searchContacts() {
    const query = document.getElementById("search").value.toLowerCase();
    const filtered = allContacts.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query) ||
        contact.phone.toLowerCase().includes(query)
    );
    displayContacts(filtered);
}

function addContact() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
        alert("All fields are required!");
        return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate phone format (XXX-XXX-XXXX)
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    if (!phonePattern.test(phone)) {
        alert("Phone number must be in the format XXX-XXX-XXXX.");
        return;
    }

    fetch("add_contact.php", {
        method: "POST",
        body: new URLSearchParams({ name, email, phone })
    }).then(() => {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        loadContacts();
    }).catch(err => console.log(err));
}

function editContact(id, name, email, phone) {
    const newName = prompt("Edit Name:", name);
    const newEmail = prompt("Edit Email:", email);
    const newPhone = prompt("Edit Phone:", phone);

    if (!newName || !newEmail || !newPhone) {
        alert("All fields are required!");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!/^\d{3}-\d{3}-\d{4}$/.test(newPhone)) {
        alert("Phone number must be in the format XXX-XXX-XXXX.");
        return;
    }

    fetch("update_contact.php", {
        method: "POST",
        body: new URLSearchParams({ id, name: newName, email: newEmail, phone: newPhone })
    }).then(() => loadContacts());
}
function exportCSV() {
    if (allContacts.length === 0) {
        alert("No contacts to export.");
        return;
    }

    const headers = ["Name", "Email", "Phone"];
    const rows = allContacts.map(c => [c.name, c.email, c.phone]);

    let csvContent = "data:text/csv;charset=utf-8," 
        + headers.join(",") + "\n"
        + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}


function deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact?")) {
        fetch("delete_contact.php", {
            method: "POST",
            body: new URLSearchParams({ id })
        }).then(() => loadContacts());
    }
}

