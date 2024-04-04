
function openModal() {
    var modal = document.getElementById("volunteerModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("volunteerModal");
    modal.style.display = "none";
}

window.onload = function() {
    var modal = document.getElementById("volunteerModal");
    var btn = document.getElementById("submitButton");
    var span = document.getElementsByClassName("close")[0];

    if (!modal || !btn || !span) {
        console.error("Modal, button, or close span could not be found.");
        if (!modal) console.error("Modal not found.");
        if (!btn) console.error("Submit button not found.");
        if (!span) console.error("Close button not found.");
        return;
    }

    btn.onclick = function(event) {
        event.preventDefault();
        if (document.getElementById("volunteer-interest-form").checkValidity()) {
            console.log("Form is valid. Opening modal.");
            openModal();
        } else {
            console.log("Form is invalid. Triggering form validation.");
            document.getElementById("volunteer-interest-form").reportValidity();
        }
    };

    span.onclick = function() {
        closeModal();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    };
};
