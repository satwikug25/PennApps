import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { withAuthInfo } from '@propelauth/react';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './CustomerCreation.css'; // Add custom CSS for more styling

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  palette: {
    primary: {
      main: '#00796b',
    },
  },
});

const CustomerCreation = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState({
    street_number: '',
    street_name: '',
    city: '',
    state: '',
    zip: ''
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dat = {first_name: firstName,
        last_name: lastName,
        address }
    

    try {
      const response = await axios.post('http://127.0.0.1:5000/create_customer', { dat });
      const customerId = response.data.objectCreated._id
      localStorage.setItem('customerId', customerId);
        navigate("/account");
        setMessage('Customer created successfully!');
      
    } catch (error) {
      setMessage('Error creating customer: ' + error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="background">
        <Container maxWidth="sm">
          <Card className="custom-card" elevation={10}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom style={{ fontWeight: 'bold', color: '#00796b' }}>
                Create Your Customer Account
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Street Number"
                  value={address.street_number}
                  onChange={(e) => setAddress({ ...address, street_number: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Street Name"
                  value={address.street_name}
                  onChange={(e) => setAddress({ ...address, street_name: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="ZIP Code"
                  value={address.zip}
                  onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                  margin="normal"
                  required
                  variant="outlined"
                />
                <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
                  <Button className="custom-button" type="submit" variant="contained" color="primary">
                    Create Customer
                  </Button>
                </Box>
              </form>
              {message && (
                <Alert severity={message.includes('success') ? 'success' : 'error'} sx={{ marginTop: '20px' }}>
                  {message}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default CustomerCreation;
