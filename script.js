let currentStep = 1;
        let isPlaying = false;

        // Define both h1 and h2 content for each step
        const stepsContent = [
            { h1: "INTRO", h2: "Welcome to my online portfolio." },
            { h1: "STAGE 1", h2: "CONNECTING THE AUX" },
            { h1: "DISCLAIMER", h2: "I built this website from scratch so if you see any bugs, no you didn't." },
            { h1: "STAGE 2", h2: "PURPOSE" },
            { h1: "STAGE 3", h2: "PERSONAL FAVOURITES" },
            { h1: "OUTRO", h2: "GOT TO GO" },
            { h1: "REVIEW", h2: "[OPTIONAL]" },
        ];

        document.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', function() {
                //bubbly animation when clicked
                this.classList.add('bubbly-effect');
                
                setTimeout(() => {
                    this.classList.remove('bubbly-effect');
                }, 700);
            });
        });
        
        const audioTracks = [
            "CoffeeBeanInstrumental.mp3",
            "GodsCountryInstrumental.mp3",
            "CinderellaInstrumental.mp3",
            "IceAgeInstrumental.mp3",
            ];

        let currentAudioIndex = 0;

        // Function to play the next audio in the array
        function playNextAudio() {
        const audio = document.getElementById('secondSlideSound');
        currentAudioIndex = (currentAudioIndex + 1) % audioTracks.length; // Loop through the tracks
        audio.src = audioTracks[currentAudioIndex]; // Change the audio source
        audio.play(); // Play the new track
        }

        // Add event listener to skip button
        document.getElementById('skipButton').addEventListener('click', playNextAudio);


        // Function to play the sound
        function playSound() {
            const audio = document.getElementById('talkSound');
            audio.currentTime = 0; // Reset sound to the start
            audio.play();
            audio.volume = 0.6; // Set volume
        }

        function playSecondSlideSound() {
            const audio = document.getElementById('secondSlideSound');
            audio.currentTime = 0;
            audio.play();
        }

        // Attach the playSound function to the button clicks
        document.getElementById('nextButton').addEventListener('click', playSound);
        document.getElementById('backButton').addEventListener('click', playSound);

        function moveNext() {
            currentStep++;

            if (currentStep === 2) {
                playSecondSlideSound();
                isPlaying = true; // Ensure isPlaying reflects the sound state
            }

            if (currentStep === 8) {
                // Refresh the page when at step 11
                location.reload();
                return; // Prevent further execution for step 11
            }

            updateTextContent();
            updateButtons();
        }

        
        // Separate arrays for pausing and playing messages
        const pauseAlertMessages = [
        "Owls are so cool.",
        "No music? Really?",
        "I forget I can literally put whatever I want.",
        "C'mon dude it's weird without music.",
        "Shoutout to myself, this website is kinda fire.",
        "Press play dude.",
        "This is awkwardly quiet."
        ];

        const playAlertMessages = [
        "Yup way better with music.",
        "You ever saw Spiderman and me in the same room together?",
        "Fun fact: If you press buttons fast enough it'll break the site",
        "Less awkward now.",
        "Much better.",
        "Enjoy."
        ];

        // Function to pick a random message from an array
        function getRandomMessage(isPlaying) {
        const messages = isPlaying ? playAlertMessages : pauseAlertMessages;
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];
        }

        // Toggle audio play state and show a random alert
        function middleFunction() {
        const audio = document.getElementById('secondSlideSound');
        const middleButton = document.getElementById('middleButton');

        // Toggle audio play state
        if (isPlaying) {
            audio.pause();
            middleButton.textContent = "PLAY";
            middleButton.classList.add('paused'); // Add 'paused' class when paused
            showCustomAlert(getRandomMessage(false)); // Show a random pause message
        } else {
            audio.play();
            middleButton.textContent = "PAUSE";
            middleButton.classList.remove('paused'); // Remove 'paused' class when playing
            showCustomAlert(getRandomMessage(true)); // Show a random play message
        }

        isPlaying = !isPlaying; // Toggle play state
        }

        // Function to show the custom alert with a message
        function showCustomAlert(message) {
        // Create the alert element
        const alertBox = document.createElement('div');
        alertBox.textContent = message;
        alertBox.className = 'custom-alert'; //class for styling

        // Append the alert to the body
        document.body.appendChild(alertBox);

        setTimeout(() => {
            alertBox.remove();
        }, 4000);
        }

        function typewriterEffect(element, text, totalDuration, callback = null) {
            element.textContent = ''; // Clear the existing text
            let i = 0;
            
            // Disable the button before starting typing
            const nextButton = document.getElementById('nextButton');
            nextButton.disabled = true; // Disable the button during typing
            
            // Calculate delay based on the total duration and text length
            const delay = totalDuration / text.length;
            
            function type() {
                if (i < text.length) {
                    element.textContent += text[i];
                    i++;
                    setTimeout(type, delay); // Add delay between each character
                } else {
                    // Re-enable the button after typing is complete, using the total duration as a delay
                    setTimeout(() => {
                        nextButton.disabled = false; // Re-enable button after typing is finished
                    }, totalDuration);
                    if (callback) {
                        callback(); // Call the callback once typing is done
                    }
                }
            }
            
            type();
        }

        function moveBack() {
            if (currentStep > 1) {
                currentStep--;
                updateTextContent();
                updateButtons();
            }
        }

        function updateButtons() {
            const backButton = document.getElementById('backButton');
            const nextButton = document.getElementById('nextButton');
            const middleButton = document.getElementById('middleButton');
            const skipButton = document.getElementById('skipButton');
            const startButton = document.getElementById('startButton'); // 👈 Add this

            // Show or hide the Back button based on the current step
            if (currentStep === 1) {
                backButton.classList.add('hidden'); // Hide the Back button on the first step
            } else {
                backButton.classList.remove('hidden'); // Show the Back button on other steps
            }
        
            if (currentStep === 1) {
                middleButton.classList.add('hidden');
            } else {
                middleButton.classList.remove('hidden');
            }
        
            if (currentStep === 1) {
                skipButton.classList.add('hidden');
            } else {
                skipButton.classList.remove('hidden');
            }

            if (currentStep === 4) {
                startButton.classList.remove('hidden');
            } else {
                startButton.classList.add('hidden');
            }
        }
        
        // Image Slider Logic
        let currentImageIndex = 0;

        function showImage(index) {
            const images = document.querySelectorAll('.slider-image');
            images.forEach((image, i) => {
                if (i === index) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        }

        function nextImage() {
            const images = document.querySelectorAll('.slider-image');
            currentImageIndex = (currentImageIndex + 1) % images.length;
            showImage(currentImageIndex);
        }

        function prevImage() {
            const images = document.querySelectorAll('.slider-image');
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            showImage(currentImageIndex);
        }

        // Initialize slider display
        showImage(currentImageIndex);

        // Initialize button visibility and text content
        updateTextContent();
        updateButtons();

        //questionnaire on Slide 6
        function updateTextContent() {
        const h1Element = document.querySelector('h1');
        const h2Element = document.querySelector('#textContent h2');
        const currentData = stepsContent[currentStep - 1];

        // Clear the content of h1 and h2 before typing starts
    if (h1Element) {
        h1Element.textContent = ''; // Clear h1 content
    }
    if (h2Element) {
        h2Element.textContent = ''; // Clear h2 content
    }

        if (h1Element && currentData.h1) {
            typewriterEffect(h1Element, currentData.h1, 500, () => {
                // After typing h1, type h2 with a duration of 2.5 seconds
                if (h2Element && currentData.h2) {
                    typewriterEffect(h2Element, currentData.h2, 1000);
                    fadeInOtherElements();
                }
            });
        } else {
            // If there's no h2, trigger fade-in directly
            fadeInOtherElements();
        }

        if (currentStep === 2) {
            setTimeout(() => {
                showCustomSubmitAlert("Whats up dude!, I'm here to walk you through this.");
            }, 2500);
            setTimeout(() => {
                showCustomSubmitAlert("I'd highly recommend using a laptop for the best experience.");
            }, 5500);
        }

        // Show questionnaire section only on Step 6
        const questionnaireSection = document.getElementById('questionnaireSection');
        if (currentStep === 7) {
            questionnaireSection.classList.remove('hidden');
        } else {
            questionnaireSection.classList.add('hidden');
        }


        // Show slider only on Step 5
        const slider = document.getElementById('slider');
        if (currentStep === 5) {
            slider.classList.remove('hidden');
        } else {
            slider.classList.add('hidden');
        }

        // Show Slide outro text
        const outro = document.getElementById('outro');
        if (currentStep === 6) {
            outro.classList.remove('hidden');
        } else {
            outro.classList.add('hidden');
        }

        if (currentStep === 7) {
            setTimeout(() => {
                showCustomSubmitAlert("It's been a real pleasure...");
            }, 3000);
            setTimeout(() => {
                showCustomAlert("unfortunately this is where we part ways.");
            }, 6000); // # milliseconds delay
            setTimeout(() => {
                showCustomSubmitAlert("Hope to hear from you soon :)");
            }, 8500);
        } 

        // Show Slide 4
        const slide4 = document.getElementById('slide4');
        if (currentStep === 4) {
            slide4.classList.remove('hidden');
        } else {
            slide4.classList.add('hidden');
        }

        const stage1 = document.getElementById('stage1');
        if (currentStep === 2) {
            stage1.classList.remove('hidden');
        } else {
            stage1.classList.add('hidden');
        }
        
        const otherElements = document.querySelectorAll('h3, h4, h5, h6, p, .other-content');
        otherElements.forEach((el) => {
            el.classList.remove('visible'); // Remove visibility
            el.classList.add('fade-in');    // Add fade-in class for transition
        });

        setTimeout(() => {
            otherElements.forEach((el) => {
                el.classList.add('visible'); // Add visible after fade-in transition time
            });
        }, 500); // Ensure this happens after fade-in duration
}

        // Function to show the custom submit alert at the top
        function showCustomSubmitAlert(message) {
            const alertBox = document.createElement('div');
            alertBox.textContent = message;
            alertBox.className = 'custom-submit-alert';  // Use the new class for the top alert

            // Append the alert to the body
            document.body.appendChild(alertBox);

            // Remove the alert after the animation ends (4s total)
            setTimeout(() => {
                alertBox.remove();
            }, 6000);
        }

        // Function to show the custom option alert
        function showCustomOptionAlert(message) {
            const alertBox = document.createElement('div');
            alertBox.textContent = message;
            alertBox.className = 'custom-option-alert';

            document.body.appendChild(alertBox);

            setTimeout(() => {
                alertBox.remove();
            }, 6000);
        }

        // Add event listeners to the radio buttons for showing custom alerts
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const message = getAlertMessage(this.name, this.value);  // Get the message for the selected option
                showCustomOptionAlert(message);  // Show the alert
    });
});

    // Function to return a custom message based on the selected option
    function getAlertMessage(question, value) {
        const messages = {
            rating: {
                'Poor': 'Try again.',
                'Decent': 'Nope.',
                'Great': 'Cool with that.',
                'Outstanding': 'You know whats up.',
            },
            rating2: {
                'Not really': 'Come on dude.',
                'Yeah but it could be better': 'Fair enough.',
                'It was fun': 'Thank you.',
            }
        };

    return messages[question][value] || 'Interesting choice!';
}