const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Dummy data for doctors and appointments
const doctors = [
  { id: 1, name: 'Dr. Smith', availableSlots: 5 },
  { id: 2, name: 'Dr. Johnson', availableSlots: 3 },
];

const appointments = [];

// API endpoint to list all doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// API endpoint to get details of a specific doctor
app.get('/api/doctors/:doctorId', (req, res) => {
  const doctorId = parseInt(req.params.doctorId);
  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  res.json(doctor);
});

// API endpoint to book an appointment with a specific doctor
app.post('/api/appointments', (req, res) => {
  const { doctorId, patientName, appointmentTime } = req.body;

  const doctor = doctors.find((doc) => doc.id === doctorId);

  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }

  if (doctor.availableSlots > 0) {
    const appointment = {
      doctorId,
      patientName,
      appointmentTime,
    };

    appointments.push(appointment);
    doctor.availableSlots -= 1;

    return res.json({ message: 'Appointment booked successfully' });
  } else {
    return res.status(400).json({ message: 'No available slots for this doctor' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
