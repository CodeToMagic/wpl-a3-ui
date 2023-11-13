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
    _id = "",
    name = "",
    description = "",
    image = {
      description: "",
      path: "",
    },
  } = props;
  const getCurrentServerUrl = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;

    return `${protocol}//${host}/`;
  };
  const handleClick = (id) => {
    navigate("/games/" + id);
  };
  return (
    <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "lightgray" }}>
      <CardHeader title={name} />
      <CardMedia
        component="img"
        height="194"
        image={getCurrentServerUrl() + image.path}
        alt={image.description}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleClick(_id)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
