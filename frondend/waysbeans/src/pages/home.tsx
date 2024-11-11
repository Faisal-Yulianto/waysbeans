import { Box, Stack } from "@mui/material";
import ActionAreaCard from "./card";
import Navbar from "./navbar";

export default function Home() {
  return (
    <Box>
      <Box sx={{ mt: 15 }}>
        <Box
          sx={{
            width: "70%",
            margin: "auto",
            bgcolor: "#DBB699",
            height: "500px",
            p: 10,
          }}
        >
          <Navbar role="user" />
          <Stack direction={"row"}>
            <Box sx={{  }}>
              <img src="assets/Title.png" width={"500px"}/>
            </Box>
            <Box sx={{ ml: 25 }}>
              <img src="assets/walpaper.png" width={"500px"}height={"300px"}/>
            </Box>
          </Stack>
          <Box sx={{ ml: 60, mt: -2}}>
              <img src="assets/waves.png" width={"450px"} height={"150px"} />
            </Box>
        </Box>
        <Stack direction={"row"} sx={{ ml: 10,mt: 10 }} flexWrap={"wrap"}>
          <ActionAreaCard />
          <ActionAreaCard />
          <ActionAreaCard />
          <ActionAreaCard />
        </Stack>
      </Box>
    </Box>
  );
}
