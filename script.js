const doctors = [
    {
        id: 1,
        name: 'Dr. Rashmi Pawar',
        specialization: 'Homopathy',
        fee: 500,
        experience: '5 years'
    },
    {
        id: 2,
        name: 'Dr. Priya Singh',
        specialization: 'Neurology',
        fee: 600,
        experience: '12 years'
    },
    {
        id: 3,
        name: 'Dr. Arjun Patel',
        specialization: 'Orthopedics',
        fee: 450,
        experience: '10 years'
    },
    {
        id: 4,
        name: 'Dr. Meera Sharma',
        specialization: 'Pediatrics',
        fee: 400,
        experience: '8 years'
    },
    {
        id: 5,
        name: 'Dr. Vikram Desai',
        specialization: 'Dermatology',
        fee: 350,
        experience: '9 years'
    },
    {
        id: 6,
        name: 'Dr. Anjali Verma',
        specialization: 'General Medicine',
        fee: 300,
        experience: '14 years'
    }
];

let appointments = JSON.parse(localStorage.getItem('appointments')) || [];

document.addEventListener('DOMContentLoaded', function() {
    displayDoctors();
    populateDoctorSelect();
    setupEventListeners();
    setMinDateForAppointment();
});

function displayDoctors() {
    const doctorsList = document.getElementById('doctors-list');
    doctorsList.innerHTML = '';

    doctors.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        doctorCard.innerHTML = `
            <h3>${doctor.name}</h3>
            <p class="specialization">🏥 ${doctor.specialization}</p>
            <p><strong>Experience:</strong> ${doctor.experience}</p>
            <p class="fee">₹${doctor.fee} <small>/ Consultation</small></p>
            <button onclick="selectDoctorAndBook(${doctor.id}, '${doctor.name}')">Book Appointment</button>
        `;
        doctorsList.appendChild(doctorCard);
    });
}

function selectDoctorAndBook(doctorId, doctorName) {
    document.getElementById('doctor-select').value = doctorId;
    showPage('booking');
    document.getElementById('patient-name').focus();
}


function populateDoctorSelect() {
    const doctorSelect = document.getElementById('doctor-select');
    doctors.forEach(doctor => {
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = `${doctor.name} - ${doctor.specialization}`;
        doctorSelect.appendChild(option);
    });
}

function showPage(pageName) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    if (pageName === 'doctors') {
        document.getElementById('doctors-page').classList.add('active');
    } else if (pageName === 'booking') {
        document.getElementById('booking-page').classList.add('active');
        document.getElementById('booking-success').classList.remove('show');
    } else if (pageName === 'bookings') {
        document.getElementById('bookings-page').classList.add('active');
        displayBookings();
    }
}

function setupEventListeners() {
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', handleBookingSubmit);

    document.getElementById('patient-name').addEventListener('blur', validatePatientName);
    document.getElementById('doctor-select').addEventListener('change', validateDoctorSelect);
    document.getElementById('appointment-date').addEventListener('change', validateDate);
    document.getElementById('appointment-time').addEventListener('change', validateTime);
}

function setMinDateForAppointment() {
    const dateInput = document.getElementById('appointment-date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

function validatePatientName() {
    const input = document.getElementById('patient-name');
    const error = document.getElementById('error-patient-name');
    const value = input.value.trim();

    input.classList.remove('error');
    error.textContent = '';

    if (!value) {
        input.classList.add('error');
        error.textContent = 'Patient name is required';
        return false;
    }

    if (value.length < 3) {
        input.classList.add('error');
        error.textContent = 'Patient name must be at least 3 characters';
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(value)) {
        input.classList.add('error');
        error.textContent = 'Patient name should only contain letters';
        return false;
    }

    return true;
}

function validateDoctorSelect() {
    const select = document.getElementById('doctor-select');
    const error = document.getElementById('error-doctor-select');

    select.classList.remove('error');
    error.textContent = '';

    if (!select.value) {
        select.classList.add('error');
        error.textContent = 'Please select a doctor';
        return false;
    }

    return true;
}

function validateDate() {
    const input = document.getElementById('appointment-date');
    const error = document.getElementById('error-appointment-date');

    input.classList.remove('error');
    error.textContent = '';

    if (!input.value) {
        input.classList.add('error');
        error.textContent = 'Date is required';
        return false;
    }

    const selectedDate = new Date(input.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        input.classList.add('error');
        error.textContent = 'Cannot book appointments for past dates';
        return false;
    }

    return true;
}

function validateTime() {
    const select = document.getElementById('appointment-time');
    const error = document.getElementById('error-appointment-time');

    select.classList.remove('error');
    error.textContent = '';

    if (!select.value) {
        select.classList.add('error');
        error.textContent = 'Please select a time slot';
        return false;
    }

    return true;
}


function handleBookingSubmit(e) {
    e.preventDefault();

    const isPatientNameValid = validatePatientName();
    const isDoctorValid = validateDoctorSelect();
    const isDateValid = validateDate();
    const isTimeValid = validateTime();

    if (!isPatientNameValid || !isDoctorValid || !isDateValid || !isTimeValid) {
        return;
    }

    const patientName = document.getElementById('patient-name').value.trim();
    const doctorId = parseInt(document.getElementById('doctor-select').value);
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const notes = document.getElementById('notes').value.trim();

    const doctor = doctors.find(d => d.id === doctorId);

    const appointment = {
        id: Date.now(),
        patientName: patientName,
        doctorId: doctorId,
        doctorName: doctor.name,
        specialization: doctor.specialization,
        date: date,
        time: time,
        notes: notes,
        fee: doctor.fee,
        bookingDate: new Date().toLocaleString()
    };
    appointments.push(appointment);

    localStorage.setItem('appointments', JSON.stringify(appointments));

    const successDiv = document.getElementById('booking-success');
    successDiv.innerHTML = `
        <strong>✅ Appointment Booked Successfully!</strong><br>
        <br>
        <strong>Booking Details:</strong><br>
        Patient: ${patientName}<br>
        Doctor: ${doctor.name}<br>
        Specialization: ${doctor.specialization}<br>
        Date: ${formatDate(date)}<br>
        Time: ${formatTime(time)}<br>
        Consultation Fee: ₹${doctor.fee}<br>
        <br>
        <em>A confirmation has been saved to your bookings.</em>
    `;
    successDiv.classList.add('show');

    document.getElementById('booking-form').reset();
    document.getElementById('doctor-select').value = '';

    successDiv.scrollIntoView({ behavior: 'smooth' });

    setTimeout(() => {
        successDiv.classList.remove('show');
    }, 5000);
}


function displayBookings() {
    const bookingsList = document.getElementById('bookings-list');
    bookingsList.innerHTML = '';

    if (appointments.length === 0) {
        bookingsList.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <p>📋 No appointments booked yet</p>
                <p style="font-size: 0.9rem; margin-top: 1rem;">
                    Go to <strong>Doctors</strong> tab to book your first appointment
                </p>
            </div>
        `;
        return;
    }

    appointments.forEach(appointment => {
        const bookingCard = document.createElement('div');
        bookingCard.className = 'booking-card';
        bookingCard.innerHTML = `
            <h4>${appointment.doctorName}</h4>
            <p><strong>Patient Name:</strong> ${appointment.patientName}</p>
            <p><strong>Specialization:</strong> ${appointment.specialization}</p>
            <p><strong>Date:</strong> ${formatDate(appointment.date)}</p>
            <p><strong>Time:</strong> ${formatTime(appointment.time)}</p>
            <p><strong>Consultation Fee:</strong> ₹${appointment.fee}</p>
            ${appointment.notes ? `<p><strong>Notes:</strong> ${appointment.notes}</p>` : ''}
            <p><small><strong>Booked on:</strong> ${appointment.bookingDate}</small></p>
            <div class="booking-actions">
                <button class="btn btn-primary" onclick="editAppointment(${appointment.id})">Edit</button>
                <button class="btn btn-danger" onclick="cancelAppointment(${appointment.id})">Cancel</button>
            </div>
        `;
        bookingsList.appendChild(bookingCard);
    });
}

function cancelAppointment(appointmentId) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
        appointments = appointments.filter(apt => apt.id !== appointmentId);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        displayBookings();
        alert('Appointment cancelled successfully!');
    }
}


function editAppointment(appointmentId) {
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment) {
        document.getElementById('patient-name').value = appointment.patientName;
        document.getElementById('doctor-select').value = appointment.doctorId;
        document.getElementById('appointment-date').value = appointment.date;
        document.getElementById('appointment-time').value = appointment.time;
        document.getElementById('notes').value = appointment.notes;

        appointments = appointments.filter(apt => apt.id !== appointmentId);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        showPage('booking');
        document.getElementById('patient-name').focus();
    }
}


function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;

}

