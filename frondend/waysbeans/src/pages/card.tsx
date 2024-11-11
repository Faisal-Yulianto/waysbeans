import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Link } from 'react-router-dom';

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 355, ml: '20px', mb: 2, height: 430, borderRadius: '10px' }}>
      <CardActionArea component={Link} to="#">
        <CardMedia
          component="img"
          height="312"
          image="assets/walpaper.png"
          alt="Product Image"
        />
        <CardContent sx={{ bgcolor: '#212121', p: 2 }}>
          <Typography gutterBottom variant="h5" sx={{ color: 'white' }}>
            Product Name
          </Typography>
          <Typography variant="body2" sx={{ color:'white', mt: 1 }}>
            Rp. 100,000
          </Typography>
          <Typography variant="body2" sx={{ color: 'white', mt: 1 }}>
            Stock: 10
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
