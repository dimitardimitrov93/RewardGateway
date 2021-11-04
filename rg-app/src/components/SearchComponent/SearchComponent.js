import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Search from '@mui/icons-material/Search';

export default function SearchComponent({ onSearchChange, handleSearch }) {
    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { margin: "2em 0.5em 3em 0.5em", width: '50ch' },
                display: "flex",
                justifyContent: "center",
                alignItems: "center"

            }}
            noValidate
            autoComplete="off"
            data-testid="box-1"
        >
            <TextField
                id="outlined-basic"
                label="Search by label"
                variant="outlined"
                onChange={onSearchChange}
                data-testid="textField-1"
            />

            <Button
                variant="contained"
                sx={{ maxWidth: "1.5em", padding: "1.12em" }}
                onClick={handleSearch}
                type="submit"
                data-testid="button-1"
            >
                <Search />
            </Button>
        </Box>
    );
}