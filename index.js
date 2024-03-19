document.addEventListener('DOMContentLoaded', function() {
    const userProfile = {
        gender: "",
        user_looking_gender: "",
        username: "",
        user_Dob: "",
        email: "",
        password: ""
    }

    // Timer functionality
    let timeLeft = 5 * 60; // 5 minutes in seconds
    let timerElement = document.getElementById("countdown-timer");
    let timerId;

    function updateTimerDisplay() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        timerElement.textContent = minutes + ":" + seconds;

        // Check if time is less than 1 minute and add styling
        if (timeLeft < 60) {
            timerElement.classList.add("last-minute");
        }

        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerElement.textContent = "Time's up!";

            document.querySelector('#btn-choose-your-gender').disabled = true;
            document.querySelector('#btn-choose-gender-looking').disabled = true;
            document.querySelector('#btn-profile-info').disabled = true;
            document.querySelector('#btn-profile-details').disabled = true;
        }
    }

    function startTimer() {
        timerId = setInterval(function() {
            timeLeft -= 1;
            updateTimerDisplay();
        }, 1000);
    }


    // Start the timer when the page loads
    startTimer();

    // Listen for visibility change events
    document.addEventListener("visibilitychange", function() {
        (document.visibilityState === 'visible') ? startTimer(): clearInterval(timerId);
    });

    // all steps 
    const stepOne = document.querySelector('.step-one');
    const stepTwo = document.querySelector('.step-two');
    const stepThree = document.querySelector('.step-three');
    const stepFour = document.querySelector('.step-four');
    const stepFive = document.querySelector('.step-five');
    const stepSix = document.querySelector('.step-six');

    // All steps level
    const stepLevelOne = document.querySelector('.step-level-one');
    const stepLevelTwo = document.querySelector('.step-level-two');
    const stepLevelThree = document.querySelector('.step-level-three');
    const stepLevelFour = document.querySelector('.step-level-four');
    const stepLevelFive = document.querySelector('.step-level-five');
    const stepLevelSix = document.querySelector('.step-level-six');

    // All Button 
    const btnMoveToStepThree = document.querySelector('#btn-choose-your-gender');
    const btnMoveToStepFour = document.querySelector('#btn-choose-gender-looking');
    const btnMoveToStepFive = document.querySelector('#btn-profile-info');
    const btnMoveToStepFinal = document.querySelector('#btn-profile-details');
    const btnContinue = document.querySelector('#btn-continue')

    // function to move onto next step 
    function moveToNextStep(currentStep, stepLevel, nextStep, nextStepLevel, nextStepNextBtn) {
        // hide current step
        currentStep.classList.remove('flex');
        currentStep.classList.add('hidden');
        stepLevel.classList.remove('current-step')

        // display next step
        nextStep.classList.remove('hidden');
        nextStep.classList.add('flex');
        nextStepLevel.classList.add('current-step');

        // disable next step btn until form fill in
        if(nextStepNextBtn){
            nextStepNextBtn.disabled = true;
        }
    }

    // function to select gender / looking gender
    const selectGender = (choice, opposite, item, value, nextButton) => {
        choice.style.background = "#FD7401";
        opposite.style.background = "#171717";
        userProfile[item] = value;
        nextButton.disabled = false;
    }

    // function validate email
    const validateEmail = (email) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

    // Move on to step 2 

    const btnEmail = document.querySelector('#register-with-email');

    btnEmail.addEventListener('click', () => {
        moveToNextStep(stepOne, stepLevelOne, stepTwo, stepLevelTwo, btnMoveToStepThree)
    })


    // Move on to step 3

    const genderMaleChoice = document.querySelector('#choose-gender-male');
    const genderFemaleChoice = document.querySelector('#choose-gender-female');

    genderMaleChoice.addEventListener('click', () => {
        selectGender(genderMaleChoice, genderFemaleChoice, 'gender', "Male", btnMoveToStepThree)
    });
    genderFemaleChoice.addEventListener('click', () => {
        selectGender(genderFemaleChoice, genderMaleChoice, 'gender', "Female", btnMoveToStepThree)
    });



    btnMoveToStepThree.addEventListener('click', () => {
        moveToNextStep(stepTwo, stepLevelTwo, stepThree, stepLevelThree, btnMoveToStepFour)
    })


    // Move on to step 4 

    const genderLookingForMaleChoice = document.querySelector('#looking-for-male');
    const genderLookingForFemaleChoice = document.querySelector('#looking-for-female');

    genderLookingForMaleChoice.addEventListener('click', () => {
        selectGender(genderLookingForMaleChoice, genderLookingForFemaleChoice, 'user_looking_gender', "Male", btnMoveToStepFour)
    });
    genderLookingForFemaleChoice.addEventListener('click', () => {
        selectGender(genderLookingForFemaleChoice, genderLookingForMaleChoice, 'gender', "Female", btnMoveToStepFour)
    });


    btnMoveToStepFour.addEventListener('click', () => {
        moveToNextStep(stepThree, stepLevelThree, stepFour, stepLevelFour, btnMoveToStepFive)
    })


    // Move on to step 5

    const username = document.querySelector('#username');
    const usernameError = document.querySelector('.username-error');

    username.addEventListener('change', function() {
        userProfile.username = username.value;
        if(userProfile.username.length > 4){
            username.style.border = 'none'
            usernameError.classList.remove('flex')
            usernameError.classList.add('hidden')
            btnMoveToStepFive.disabled = !(userProfile.username && userProfile.user_Dob);
        } else {
            username.style.border = '1px solid red'
            usernameError.classList.remove('hidden')
            usernameError.classList.add('flex')
        }
    });


    const dobPicker = document.getElementById('dob');
    const today = new Date();
    const minAge = 18;
    
    // Calculate the latest valid date (today - 18 years)
    const maxValidDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate())
        .toISOString()
        .split('T')[0]; // Format YYYY-MM-DD

    dobPicker.setAttribute("max", maxValidDate);

    dobPicker.addEventListener('change', function() {
        userProfile.user_Dob = this.value; 
        btnMoveToStepFive.disabled = !userProfile.user_Dob || !userProfile.username;
    });

    btnMoveToStepFive.addEventListener('click', () => {
        moveToNextStep(stepFour, stepLevelFour, stepFive, stepLevelFive, btnMoveToStepFinal);
    });

    // Move on to step 6

    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const emailError = document.querySelector('.email-error');

    email.addEventListener('change', function() {
        userProfile.email = email.value;
        if (validateEmail(email.value)) {
            email.style.border = 'none'
            emailError.classList.remove('flex')
            emailError.classList.add('hidden')
            btnMoveToStepFinal.disabled = !(userProfile.password && userProfile.email)
        } else {
            email.style.border = '1px solid red'
            emailError.classList.remove('hidden')
            emailError.classList.add('flex')
        }
    })

    password.addEventListener('change', function() {
        userProfile.password = password.value;
        btnMoveToStepFinal.disabled = !(userProfile.password && validateEmail(userProfile.email))
    })

    btnMoveToStepFinal.addEventListener('click', () => {
        moveToNextStep(stepFive, stepLevelFive, stepSix, stepLevelSix, btnContinue)
    })

    //  Move to home page 

    const tAndCsAgreement = document.querySelector('#tandcs');

    tAndCsAgreement.addEventListener('change', function(){
        if(this.checked) {
            btnContinue.disabled = false;
            btnContinue.classList.remove('hidden')
            btnContinue.classList.add('flex')
        } else {
            btnContinue.disabled = true;
        }
    })
});