import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../../schemas/registerSchema";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data) => {
    try {
      // Kirim aksi registerUser
      await dispatch(registerUser(data)).unwrap();
      navigate("/login"); // Redirect ke dashboard atau halaman lain setelah registrasi sukses
    } catch (error) {
      setErrorMessage("Pendaftaran gagal");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Box bgcolor="white" width="416px" height="443px" p={4} borderRadius={2}>
        <Typography
          variant="h2"
          color="#613D2B"
          fontWeight={"bold"}
          fontSize="26px"
          mb={2}
        >
          Register
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Full Name"
            {...register("fullname")}
            InputProps={{
              sx: {
                bgcolor: "white",
              },
            }}
            error={!!errors.fullname}
            helperText={errors.fullname?.message as string}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Email"
            type="email"
            {...register("email")}
            InputProps={{
              sx: {
                bgcolor: "white",
              },
            }}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Password"
            type="password"
            {...register("password")}
            InputProps={{
              sx: {
                bgcolor: "white",
              },
            }}
            error={!!errors.password}
            helperText={errors.password?.message as string}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 4, height: "50px", bgcolor: "#613D2B" }}
          >
            Register
          </Button>
          <Typography mt={2} color="textSecondary">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "black", fontWeight: "bold" }}>
              Click here
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
}
