document.addEventListener("DOMContentLoaded", function() {
    var donateButton = document.getElementById("donateButton");
    var formInputs = document.querySelectorAll("#donation-form input[required], #donation-form select[required]");
    var presetDonationButtons = document.querySelectorAll(".donation-amounts button");
    var customAmountInput = document.getElementById("custom-amount");
    var donationAmountSelected = false;


    function checkFormFields() {
        var allFilled = true;
        formInputs.forEach(function(input) {

            if (input === customAmountInput && donationAmountSelected) {
                return;
            }
            if (!input.value) {
                allFilled = false;
            }
        });
        donateButton.disabled = !allFilled;
    }


    formInputs.forEach(function(input) {
        input.addEventListener('change', checkFormFields);
        input.addEventListener('input', checkFormFields);
    });

    

	presetDonationButtons.forEach(function(button) {
		button.addEventListener('click', function() {
			var amount = this.getAttribute("value");
			customAmountInput.value = amount;
			donationAmountSelected = true;
			checkFormFields();
        
			var event = new Event('input', {
				bubbles: true,
				cancelable: true,
			});
			customAmountInput.dispatchEvent(event);
		});
	});

    checkFormFields();
});

function openModal() {
    var modal = document.getElementById("donationConfirmationModal");
    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("donationConfirmationModal");
    modal.style.display = "none";
}

window.onload = function() {
    var modal = document.getElementById("donationConfirmationModal");

    var btn = document.getElementById("donateButton");

    var span = document.getElementsByClassName("close-button")[0]; 

    btn.onclick = function() {
        openModal();
    }

    span.onclick = function() {
        closeModal();
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            closeModal();
        }
    }
};
