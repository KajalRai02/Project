import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
  } from "@mui/material";

import { Link} from "react-router-dom";


const card= ({course}) => (

    <Card variant="outlined" sx={{ height: 300, width: 300 }}>
            <CardMedia
              component="img"
              src={`${course.image}`}
              sx={{ width: 300, height: 170 }}
            />
            <CardContent component="div">{course.title}</CardContent>

            <CardActionArea
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                component={Link}
                to={`/courseView/${1}`}
                variant="contained"
                sx={{ bgcolor: "#167D7F" }}
              >
                VIEW
              </Button>
            </CardActionArea>
          </Card>
)

export const CourseCard= card;