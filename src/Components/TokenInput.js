import React, { useState } from 'react';
import { useNavigate, Navigate, Link as Redirect } from 'react-router-dom';
import { Container, Box, CssBaseline, Avatar, Typography, TextField, Button, Grid, Link } from '@mui/material';
import Swal from 'sweetalert2';
import axios from '../Api/axios';

const TokenInput = () => {
    const navigate = useNavigate();
    const apiToken = localStorage.getItem('apiToken');
    const [values, setValues] = useState({ school: '', token: '' });
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('/validate_token', {
                    base_url: values.school,
                    api_key: values.token
                });
                if (response.data) {
                    localStorage.setItem('apiToken', JSON.stringify(values.token));
                    localStorage.setItem('school', JSON.stringify(values.school));
                    navigate('/');
                } else {
                    Swal.fire('Operation Failed!', 'Token provided is invalid', 'error');
                }
            } catch (err) {
                Swal.fire('Operation Failed!', err.message, 'error');
            }
        }
    };

    const validate = () => {
        let tempErrors = {};
        tempErrors.school = values.school ? '' : 'This field is required.';
        tempErrors.token = values.token ? '' : 'This field is required.';
        setErrors(tempErrors);

        return Object.values(tempErrors).every(x => x === '');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });

        // Update error state only if the field is empty
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: value ? '' : 'This field is required.'
        }));
    };

    if (JSON.parse(apiToken)) {
        return <Navigate to="/" replace />;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, width: 64, height: 64 }} />
            </Box>
            <Box sx={{ mt: 17, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h4" sx={{ fontWeight: "bold", textAlign: 'center' }}>
                    Welcome to AceTask
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }} autoComplete="off" onSubmit={handleSubmit}>
                    <TextField 
                        error={Boolean(errors.school)}
                        helperText={errors.school}
                        value={values.school}
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        id="school-name"
                        label="School Name"
                        name="school"
                        autoFocus
                    />
                    <TextField 
                        error={Boolean(errors.token)}
                        helperText={errors.token}
                        value={values.token}
                        onChange={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        id="canvas-api-token"
                        label="API Token"
                        name="token"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: errors.token ? 1 : 2, mb: 2 }}>
                        Login
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Typography variant="body2" display="inline">
                                How do I get an API token?
                            </Typography>
                            <Link variant="body2" underline="none" component={Redirect} to="/sign-up" ml={1}>
                                Learn here
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default TokenInput;