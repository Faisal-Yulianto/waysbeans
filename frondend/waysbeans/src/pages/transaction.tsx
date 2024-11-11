import { Card, CardActionArea, Typography, Box, Stack } from "@mui/material";

interface TransactionCardProps {
  productName: string;
  date: string;
  price: string;
  subtotal: string;
  productImage: string;
  logoImage: string;
}

export default function TransactionCard({
  productName,
  date,
  price,
  subtotal,
  productImage,
  logoImage,
}: TransactionCardProps) {
  return (
    <Card sx={{ m: 5, bgcolor: "#212121" }}>
      <CardActionArea>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Box p={2}>
            <Stack direction={"row"}>
              <Box>
                <img src={productImage} alt={productName} height={"180px"} />
              </Box>
              <Box pl={2}>
                <Stack direction={"column"}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: "secondary.main",
                      mb: 1,
                    }}
                  >
                    {productName}
                  </Typography>
                  <Typography
                    sx={{
                      color: "secondary.main",
                      mb: 1,
                      fontSize: "14px",
                    }}
                  >
                    {date}
                  </Typography>
                  <Typography
                    sx={{
                      color: "primary.main",
                      mb: 10,
                      fontSize: "14px",
                    }}
                  >
                    Price: {price}
                  </Typography>
                  <Typography
                    sx={{
                      color: "primary.main",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    Sub Total: {subtotal}
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box sx={{ p: 5 }}>
            <img src={logoImage} alt="Logo" width={70} />
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
}
