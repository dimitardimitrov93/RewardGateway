import * as React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import validator from 'validator';
import ColorRadioButtons from '../ColorRadioButtons/ColorRadioButtons';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function EmployeeCard({ employee, handleUpdateEmployee }) {
    const [label, setLabel] = React.useState('');
    const [currentLabelField, setCurrentLabelField] = React.useState(null);
    const [backgroundColor, setBackgroundColor] = React.useState('');

    const [expanded, setExpanded] = React.useState(false);

    const sanitizedEmployeeInfo = {};

    for (const key in employee) {
        if (key !== 'avatar') {
            sanitizedEmployeeInfo[key] = validator.escape(sanitizeHTML(employee[key]));
        } else {
            sanitizedEmployeeInfo[key] = employee[key];
        }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function sanitizeHTML(htmlText) {
        const scriptRegExp = /<.*script.*>.*<.*\/.*script.*>/gi;
        const htmlCharsRegex = /&amp;|nbsp;|amp;|&lt;|&gt;|gt;|lt;/gi;
        const tempHtmlText = htmlText.replace(scriptRegExp, '');
        const sanitizedHtmlText = tempHtmlText.replace(htmlCharsRegex, '');
        return sanitizedHtmlText;
    }

    function handleChange(e) {
        e.preventDefault();
        setLabel(e.target.value);
        setCurrentLabelField(e.target);
    }

    function onSubmitLabel() {
        if (!label) return;

        const sanitizedLabel = validator.escape(label);
        setLabel(sanitizedLabel);
        // sanitizedEmployeeInfo[backgroundColor] = backgroundColor;

        handleUpdateEmployee({ ...sanitizedEmployeeInfo, label });

        setLabel('');
        currentLabelField.value = '';
        currentLabelField.blur();
    }

    function onChangeColorSubmit() {
        handleUpdateEmployee({ ...sanitizedEmployeeInfo, backgroundColor });
        // handleExpandClick()
    }

    return (
        <Card sx={{ maxWidth: 450, backgroundColor: sanitizedEmployeeInfo.backgroundColor }}>
            {sanitizedEmployeeInfo.label &&
                <Typography gutterBottom variant="h5" component="div" sx={{ paddingTop: '0.3em' }}>
                    Label: {sanitizedEmployeeInfo.label}
                </Typography>
            }
            <CardActionArea>
                <a href={sanitizedEmployeeInfo.avatar} target="_blank">
                    <CardHeader
                        data-testid="cardHeader-1"
                        avatar={
                            <Avatar
                                aria-label="avatar"
                                src={sanitizedEmployeeInfo.avatar}
                                alt="person's avatar image"
                            >
                                {sanitizedEmployeeInfo.name[0].toUpperCase()}
                            </Avatar>
                        }
                        title={sanitizedEmployeeInfo.name}
                        subheader={sanitizedEmployeeInfo.title}
                        sx={{ '.MuiCardHeader-title': { fontWeight: "bold" } }}
                    />
                </a>
            </CardActionArea>
            <CardContent>
                <Typography data-testid="typography-1" gutterBottom variant="h5" component="div">
                    {sanitizedEmployeeInfo.company}
                </Typography>
                <Typography data-testid="typography-2" color="text.secondary" sx={{ padding: '1em', textAlign: 'justify' }}>
                    {sanitizedEmployeeInfo.bio}
                </Typography>
                <CardActions>
                    <TextField
                        id="standard-basic"
                        label="Label"
                        variant="standard"
                        onChange={handleChange}
                    />
                    <Button sx={{ margin: '1.2em 0 0 1em' }} variant="contained" onClick={onSubmitLabel} size="small" color="primary">
                        Add
                        </Button>

                </CardActions>
            </CardContent>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
            >
                <ExpandMoreIcon />
            </ExpandMore>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <div>
                        <ColorRadioButtons setBackgroundColor={setBackgroundColor} />
                        <Button onClick={onChangeColorSubmit} size="small" color="primary">
                            Change Color
                        </Button>
                    </div>
                </CardContent>
            </Collapse>

        </Card>
    );
}