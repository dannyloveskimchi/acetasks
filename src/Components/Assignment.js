import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"
import { parseISO, intervalToDuration } from 'date-fns';

const Assignment = ({ assignment }) => {
    const duration = intervalToDuration({ start: new Date(), end: parseISO(assignment.due_at) });

    return (
        <Card sx={{ maxWidth: 'auto', height: 'auto', boxShadow: 0, borderStyle: 'solid', border: '0.5px solid #dbdbdb', mb: 3, transition: 'all .15s ease-in-out', '&:hover': { border: '1px solid #2763e6' } }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {assignment.assignment_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left" }}>
                    <b>Course name:</b> {assignment.course_name}
                    <br />
                    <b>Due in:</b> {duration.days} days {duration.hours} hours {duration.minutes} minutes
                    <br />
                    <b>Points:</b> {assignment.points}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href={assignment.url}>Go</Button>
            </CardActions>
        </Card>
    )
}

export default Assignment