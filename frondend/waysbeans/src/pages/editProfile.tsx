import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import Navbar from "../pages/navbar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProfile, updateProfile } from "../store/profileSlice";
import { jwtDecode } from "jwt-decode";


export default function EditProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useSelector((state: RootState) => state.profile);

  const [fullname, setFullname] = useState(profile?.user?.fullname || "");
  const [email, setEmail] = useState(profile?.user?.email || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.userId;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    if (!profile) {
      const userId = getUserIdFromToken();
      if (userId) {
        dispatch(fetchProfile(userId)); 
      }
    } else {
      setFullname(profile.user.fullname);
      setEmail(profile.user.email);
    }
  }, [profile, dispatch]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(event.target.files[0]);
    }
  };

  const handleSave = () => {
    const userId = getUserIdFromToken();
    if (userId) {
      dispatch(updateProfile({
        userId: userId,
        profileData: {
          user: {
            email: email,
            fullname: fullname,
          },
        },
        imageBuffer: profileImage || undefined, // Menangani null dan mengirimkan undefined jika tidak ada gambar
      }));
    }
  };

  return (
    <Box>
      <Navbar role={"user"} />
      <Stack direction="row" justifyContent="center" sx={{ mt: 15 }}>
        <Box pl={10} sx={{ width: "50%" }}>
          <Typography
            sx={{
              color: "black",
              pl: 5,
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Edit Profile
          </Typography>
          <Box
            sx={{
              m: 5,
              display: "flex",
              flexDirection: "row",
              height: "460px",
              width: "652px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: 3,
              bgcolor: "#DBB699",
            }}
          >
            <Box
              component="div"
              sx={{
                width: "50%",
                height: "100%",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={profileImage ? URL.createObjectURL(profileImage) : profile?.image || "assets/walpaper.png"}
                alt="Profile Image"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{
                  position: "absolute",
                  width: "50%",
                  height: "50%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </Box>

            <Box
              sx={{
                width: "50%",
                bgcolor: "white",
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Box>
                <Typography sx={{ color: "black" }} variant="h6">
                  Full Name
                </Typography>
                <TextField
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Box>

              <Box>
                <Typography sx={{ color: "black" }} variant="h6">
                  Email
                </Typography>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ mb: 2 }}
                />
              </Box>

              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{ mt: 2 }}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}
