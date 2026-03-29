document.addEventListener('DOMContentLoaded', function() {
    
    // --- Auth Button Logic (from login/signup pages) ---
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const profileBtn = document.getElementById('profile-btn');
    const logoutBtn = document.getElementById('logout-btn');

    if (isLoggedIn) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (signupBtn) signupBtn.classList.add('hidden');
        if (profileBtn) profileBtn.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (signupBtn) signupBtn.classList.remove('hidden');
        if (profileBtn) profileBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.removeItem('currentUser');
            // Ensure redirect goes to home page
            window.location.href = 'index.html'; 
        });
    }

    // --- BMI Calculator Logic (for bmi-calculator.html) ---
    const bmiCalcBtn = document.getElementById('bmi-calc-btn');
    const bmiResultEl = document.getElementById('bmi-result');
    
    if (bmiCalcBtn) {
        bmiCalcBtn.addEventListener('click', function() {
            const height = parseFloat(document.getElementById('height').value);
            const weight = parseFloat(document.getElementById('weight').value);
            
            if (height > 0 && weight > 0) {
                const heightInMeters = height / 100;
                const bmi = weight / (heightInMeters * heightInMeters);
                const bmiFixed = bmi.toFixed(1);

                let category = '';
                let categoryClass = 'text-green-400';

                if (bmi < 18.5) {
                    category = 'Underweight';
                    categoryClass = 'text-yellow-400';
                } else if (bmi >= 18.5 && bmi <= 24.9) {
                    category = 'Normal weight';
                    categoryClass = 'text-green-400';
                } else if (bmi >= 25 && bmi <= 29.9) {
                    category = 'Overweight';
                    categoryClass = 'text-yellow-500';
                } else {
                    category = 'Obese';
                    categoryClass = 'text-red-500';
                }

                bmiResultEl.innerHTML = `
                    <p class="text-lg">Your BMI is: <strong class="text-2xl text-white">${bmiFixed}</strong></p>
                    <p>You are in the <strong class="${categoryClass}">${category}</strong> range.</p>
                `;
            } else {
                bmiResultEl.innerHTML = '<p class="text-red-400">Please enter valid height and weight.</p>';
            }
        });
    }

    // --- Diet (TDEE) Calculator Logic (for diet-calculator.html) ---
    const tdeeCalcBtn = document.getElementById('tdee-calc-btn');
    const tdeeResultEl = document.getElementById('tdee-result');

    if (tdeeCalcBtn) {
        tdeeCalcBtn.addEventListener('click', function() {
            const age = parseFloat(document.getElementById('age').value);
            const height = parseFloat(document.getElementById('tdee-height').value);
            const weight = parseFloat(document.getElementById('tdee-weight').value);
            const gender = document.getElementById('gender').value;
            const activity = parseFloat(document.getElementById('activity').value);
            const goal = document.getElementById('goal').value; // Get the new goal value

            if (age > 0 && height > 0 && weight > 0) {
                let bmr = 0;
                // Harris-Benedict BMR Formula
                if (gender === 'male') {
                    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
                } else {
                    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
                }

                const tdee = bmr * activity;
                const maintenanceCalories = Math.round(tdee);
                
                let goalCalories = 0;
                let goalText = "";

                if (goal === 'maintenance') {
                    goalCalories = maintenanceCalories;
                    goalText = "To maintain your weight:";
                } else if (goal === 'weight_loss') {
                    goalCalories = maintenanceCalories - 500; // Caloric deficit
                    goalText = "For weight loss:";
                } else if (goal === 'muscle_gain') {
                    goalCalories = maintenanceCalories + 300; // Caloric surplus (safer 300)
                    goalText = "For muscle gain:";
                }

                tdeeResultEl.innerHTML = `
                    <p classs="text-sm text-gray-400">Your maintenance calories are approx. <strong class="text-white">${maintenanceCalories}</strong> kcal/day.</p>
                    <hr class="border-gray-700 my-3">
                    <p class="text-lg">${goalText}</p>
                    <p><strong class="text-3xl text-violet-400">${goalCalories}</strong> <span class="text-gray-400">kcal/day</span></p>
                `;

            } else {
                tdeeResultEl.innerHTML = '<p class="text-red-400">Please fill in all fields with valid numbers.</p>';
            }
        });
    }
});