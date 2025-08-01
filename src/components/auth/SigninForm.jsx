// src/components/auth/SigninForm.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
  Alert,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {
  Google,
  GitHub,
  Twitter,
  Facebook,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SigninForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      console.log('Form Submitted:', formData);
      await new Promise((res) => setTimeout(res, 1500));
      setSnackbarSeverity('success');
      setSnackbarMessage('Signed in successfully!');
      setSnackbarOpen(true);
      reset();
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } catch {
      setSnackbarSeverity('error');
      setSnackbarMessage('Sign in failed!');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
        maxWidth: 460,
        minWidth: 320,
        mx: 'auto',
        mt: 4,
        px: { xs: 2, sm: 3 },
        py: 3,
        boxShadow: 2,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Sign In</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            Don’t have an account?{' '}
            <Link
              to="/auth/sign-up"
              style={{ color: '#2e7d32', fontWeight: 500, textDecoration: 'none' }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>

        <TextField
          label="Email"
          fullWidth
          size="small"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          fullWidth
          size="small"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Link
            to="/auth/forgot-password"
            style={{ fontSize: '0.75rem', color: '#2e7d32', textDecoration: 'none' }}
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="medium"
          disabled={loading}
          sx={{
            textTransform: 'none',
            backgroundColor: '#1a1a1a',
            '&:hover': { backgroundColor: '#333' },
          }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <Divider sx={{ fontSize: '0.65rem', my: 1 }}>OR</Divider>

        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', width: 36, height: 36 }}>
            <Google sx={{ color: '#DB4437', fontSize: 20 }} />
          </IconButton>
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', width: 36, height: 36 }}>
            <GitHub sx={{ color: '#000000', fontSize: 20 }} />
          </IconButton>
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', width: 36, height: 36 }}>
            <Twitter sx={{ color: '#1DA1F2', fontSize: 20 }} />
          </IconButton>
          <IconButton sx={{ border: '1px solid #e0e0e0', bgcolor: '#fff', width: 36, height: 36 }}>
            <Facebook sx={{ color: '#1d32f2ff', fontSize: 20 }} />
          </IconButton>
        </Box>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SigninForm;