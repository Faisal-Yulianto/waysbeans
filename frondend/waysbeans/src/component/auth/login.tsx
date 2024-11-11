import { Box, Typography, TextField, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../schemas/loginSchema";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { AppDispatch, RootState } from "../../store/store";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { email, password } = data;
  
    try {
      const resultAction = await dispatch(loginUser({ email, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        // Pastikan token berupa string
        const token = typeof resultAction.payload.token === "string"
          ? resultAction.payload.token
          : JSON.stringify(resultAction.payload.token);
  
        // Simpan token ke localStorage
        localStorage.setItem("token", token);
  
        // Arahkan ke halaman home setelah login berhasil
        navigate("/home");
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      setErrorMessage("Login failed");
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
      <Box bgcolor="white" width="416px" height="auto" p={4} borderRadius={2}>
        <Typography
          variant="h2"
          color="#613D2B"
          fontWeight={"bold"}
          fontSize="26px"
          mb={2}
        >
          Login
        </Typography>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit(onSubmit)}>
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
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <Typography mt={2} color="textSecondary">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "black", fontWeight: "bold" }}>
              Click here
            </Link>
          </Typography>
        </form>
      </Box>
    </Box>
  );
}
