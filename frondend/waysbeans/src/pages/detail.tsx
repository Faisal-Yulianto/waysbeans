import { Box, Stack, Typography, Button, Card, CardMedia } from "@mui/material";
import Navbar from "./navbar";

export default function Detail() {
  return (
    <Box>
      <Navbar role={"user"} />
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: 15 }}>
        <Card sx={{ width: '600px', m: "50px", height: 410, borderRadius: "10px" }}>
          <CardMedia component="img" height="500" image="assets/walpaper.png" alt="Product" />
        </Card>
        <Box sx={{ color: '#212121', width: '600px', bgcolor: 'white', p: 4, borderRadius: "10px" }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#000' }}>Product Name</Typography>
          <Typography sx={{ fontSize: 15, mb: 3, color: '#000' }}>Stock: 20</Typography>
          <Typography sx={{ fontSize: 15, mb: 5, color: '#000' }}>Product description goes here.</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: '#212121', textAlign: 'end', mt: 2 }}>
            Rp. 150,000
          </Typography>
          <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2, height: "40px",bgcolor: '#DBB699'}}>
            Add To Cart
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
