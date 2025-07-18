import React, { useState } from 'react';
import {
  Box, Button, Divider, IconButton, Snackbar, Stack, TextField, Typography
} from '@mui/material';
import { GitHub, Google, Twitter } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  
  const navigate = useNavigate();

  const onSubmit = async (_data) => {
  try {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500)); // simulate API

    setSnackbarSeverity('success');
    setSnackbarMessage('Account created successfully!');
    setSnackbarOpen(true);
    reset();
    localStorage.setItem('signupEmail', _data.email);
    setTimeout(() => {
      navigate('/verify-email');
    }, 1000);
  } catch (_err) {
    setSnackbarSeverity('error');
    setSnackbarMessage('Something went wrong!');
    setSnackbarOpen(true);
  } finally {
    setLoading(false);
  }
};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 460, mx: 'auto', mt: 4, px: 2, py: 3, boxShadow: 2, borderRadius: 2, bgcolor: 'background.paper' }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Sign Up</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Already have an account?{' '}
            <Link to="/signin" style={{ color: '#2e7d32', fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5, flexWrap: 'nowrap' }}>
          <TextField label="First Name" fullWidth size="small" {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} />
          <TextField label="Last Name" fullWidth size="small" {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} />
        </Box>

        <TextField label="Email" fullWidth size="small" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label="Password" type="password" fullWidth size="small" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />

        <Button type="submit" variant="contained" fullWidth size="medium" disabled={loading} sx={{ mt: 0.5, textTransform: 'none', backgroundColor: '#1a1a1a', '&:hover': { backgroundColor: '#333' } }}>
          {loading ? 'Loading...' : 'Sign Up'}
        </Button>

        <Typography variant="caption" textAlign="center" sx={{ fontSize: '0.6rem', lineHeight: 1.4, px: 0.5 }}>
          By signing up, I agree to{' '}
          <Typography component="span" color="success.main" sx={{ fontWeight: 500, cursor: 'pointer' }}>Terms of Service</Typography>{' '}
          and{' '}
          <Typography component="span" color="success.main" sx={{ fontWeight: 500, cursor: 'pointer' }}>Privacy Policy</Typography>.
        </Typography>

        <Divider sx={{ fontSize: '0.65rem', my: 1 }}>OR</Divider>

        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', width: 36, height: 36 }}><Google sx={{ color: '#DB4437', fontSize: 20 }} /></IconButton>
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', width: 36, height: 36 }}><GitHub sx={{ color: '#000000', fontSize: 20 }} /></IconButton>
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', width: 36, height: 36 }}><Twitter sx={{ color: '#1DA1F2', fontSize: 20 }} /></IconButton>
        </Box>
      </Stack>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert severity={snackbarSeverity} sx={{ width: '100%' }}>{snackbarMessage}</MuiAlert>
      </Snackbar>
    </Box>
  );
};

export default SignUpForm;