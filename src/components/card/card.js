import { Edit } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import * as React from "react";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CustomCard(props) {
  const {
    name = "Bowling Game",
    description = "Enjoy a classic game of bowling with friends and family!",
    type = "Physical",
    minimumAge = 15,
    pricing = {
      hourly: "$25.00",
      perGame: "$5.00",
    },
    image = {
      description: "Arcade basketball hoop with colorful balls.",
      path: "images/arcade-basketball.jpg",
    },
  } = props;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ backgroundColor: "lightgray" }}>
      <CardHeader
        action={
          <IconButton aria-label="edit">
            <Edit />
          </IconButton>
        }
        title={name}
      />
      <CardMedia
        component="img"
        height="194"
        image={process.env.PUBLIC_URL + image.path}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Type: {type}</Typography>
          <Typography paragraph>Minimum age: {minimumAge}</Typography>
          <Typography paragraph>
            Pricing: {pricing?.hourly} p/h or {pricing?.perGame} p/g
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
