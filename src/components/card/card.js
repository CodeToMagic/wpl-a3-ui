import { Button, CardActions } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function CustomCard(props) {
  const navigate = useNavigate();
  const {
    medicineId,
    medicineName,
    availableQTY,
    cost,
    isPrescriptionNeeded,
    description,
    imageUrl,
  } = props;
  const getCurrentServerUrl = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}/`;
  };
  const handleClick = (id) => {
    navigate("/admin/" + id);
  };
  return (
    <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "lightgray" }}>
      <CardHeader title={medicineName} />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl}
        alt={description}
        style={{ width: "100%", objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick(medicineId)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
