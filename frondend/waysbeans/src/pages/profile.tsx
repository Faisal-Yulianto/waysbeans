import { Box, Stack, Typography } from "@mui/material";
import Navbar from "../pages/navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Profile() {
  const { profile } = useSelector((state: RootState) => state.profile);

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
            My Profile
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
              }}
            >
              <Box
                component="img"
                src={profile?.image || "assets/walpaper.png"}
                alt="Profile Image"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Box
              sx={{
                width: "50%",
                bgcolor: "white",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: 2,
              }}
            >
              <Box>
                <Typography sx={{ color: "black" }} variant="h6">
                  Full Name
                </Typography>
                <Typography sx={{ mb: 1, color: "black" }}>
                  {profile?.user.fullname || "Full name not available"}
                </Typography>
              </Box>

              <Box>
                <Typography sx={{ color: "black" }} variant="h6">
                  Email
                </Typography>
                <Typography sx={{ mb: 1, color: "black" }}>
                  {profile?.user.email || "Email not available"}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Link to="/editprofile" style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                display: "inline-block",
                padding: "8px 16px",
                backgroundColor: "#f50057",
                color: "white",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              Edit profile
            </Typography>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}
