document.addEventListener('DOMContentLoaded', function () {


    var txtName;
    var hotel;
    var room;
    var nbPerson;
    var nbDays;
    var extOptionVal = [];
    var extOptionTxt = [];
    var hotelIndex;
    var myForm = document.getElementById('myForm');

    var pattern = {
        username: /^[a-zA-Z]+$/i,
        numberOfPerson: /^[1-2]$/,
        numberOfDays: /^[1-9]$/,
    };

    myForm.addEventListener('submit', function (e) {

		e.preventDefault();
		
        txtName = myForm.querySelector('#txtName').value;
        hotel = myForm.querySelector('#cmbHotel').value;
        hotelIndex = myForm.querySelector('#cmbHotel');
        room = myForm.querySelector('#cmbRoom').value;
        nbPerson = myForm.querySelector('#txtNbPerson').value;
        nbDays = myForm.querySelector('#txtDuration').value;


        if (validateTxtBox(txtName, pattern.username, 0)) {
            if (validateSelect(hotel, 0)) {
                if (validateSelect(room, 1)) {
                    if (validateTxtBox(nbPerson, pattern.numberOfPerson, 1)) {
                        if (validateTxtBox(nbDays, pattern.numberOfDays, 2)) {
                            retrieveExtraChBox(document.getElementsByClassName('Extra'));
                            displayBill();
                        }
                    }
                }
            }
        }
    })



    function displayBill() {

        calculateBill();
        var data = "Mr./Mrs. " + txtName + "\n you reserved for " + nbPerson +
            " person, a " + hotelIndex.options[hotelIndex.selectedIndex].text + " Hotel in " + nbDays + " days .\n Extras: " + extOptionTxt + "\n" + total;
        alert(data);



    }


    //Calculate the amount
    function calculateBill() {

        var x = 0;
        for (var i = 0; i < extOptionVal.length; i++) {
            x += parseFloat(extOptionVal[i]);
        }

        var subTotal =((hotel * room * nbDays) + x).toFixed(2);
        var gst = (subTotal * 0.05).toFixed(2);
        var qst = (subTotal * 0.1).toFixed(2);
		console.log(gst);
		console.log(qst);
		console.log(subTotal);
        var sum1 = parseFloat(subTotal) + parseFloat(gst) + parseFloat(qst);
        total = "Subtotal : " + subTotal + "\n GST : " + gst + "\n QST : " + qst + "\n Total : " + sum1.toFixed(2);

    }


    // validation function
    function validateTxtBox(field, regex, flag) {

        if (regex.test(field)) {

            if (flag === 0) {
                myForm.querySelector('#vName').textContent = "";
                return true;
            } else if (flag === 1) {
                myForm.querySelector('#vNbPerson').textContent = "";
                return true;

            } else if (flag === 2) {
                myForm.querySelector('#vDuration').textContent = "";
                return true;

            }

        } else {

            if (flag === 0) {
                myForm.querySelector('#vName').textContent = "Enter a valid Name....";
                return false;
            } else if (flag == 1) {
                myForm.querySelector('#vNbPerson').textContent = "Enter a valid Number....";
                return false;
            } else if (flag == 2) {
                myForm.querySelector('#vDuration').textContent = "Enter a valid Number....";
                return false;

            }

        }
    }



    // Validate Select Boxes
    function validateSelect(params, flag) {

        if (params === 'nostar' || params == "") {

            if (flag == 0) {

                myForm.querySelector('#vHotel').textContent = "Select a Hotel Type....";
                return false;

            } else if (flag == 1) {
                myForm.querySelector('#vRoom').textContent = "Select a Room Type....";
                return false;
            }

        } else {

            if (flag == 0) {

                myForm.querySelector('#vHotel').textContent = "";
                return true;

            } else if (flag == 1) {
                myForm.querySelector('#vRoom').textContent = "";
                return true;
            }
        }

    }



    // CheckBox value and text
    function retrieveExtraChBox(n) {
        for (var i = 0; i < n.length; i++) {
            if (n[i].checked && n[i].type == 'checkbox') {
                extOptionVal.push(n[i].value);
                if (n[i].value == 20) {
                    extOptionTxt.push("City Bus Tour");
                } else if (n[i].value == 80) {
                    extOptionTxt.push("Spa Massage");
                } else if (n[i].value == 200) {
                    extOptionTxt.push("Hockey Ticket");
                }
            }
        }
    }




})