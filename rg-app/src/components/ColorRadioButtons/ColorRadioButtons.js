import * as React from 'react';
import { pink, orange, yellow } from '@mui/material/colors';
import Radio from '@mui/material/Radio';

export default function ColorRadioButtons({ setBackgroundColor }) {
	const [selectedValue, setSelectedValue] = React.useState('a');

	const handleChange = (event) => {
		setSelectedValue(event.target.value);
		setBackgroundColor(event.target.value);
	};

	const controlProps = (item) => ({
		checked: selectedValue === item,
		onChange: handleChange,
		value: item,
		name: 'color-radio-button-demo',
		inputProps: { 'aria-label': item },
	});

	return (
		<div style={{ backgroundColor: "#ffffff73", borderRadius: "1em" }}>
			<Radio
				data-testid="radio-yellow"
				{...controlProps('yellow')}
				sx={{
					color: yellow[800],
					'&.Mui-checked': {
						color: orange[600],
					},
				}}
			/>
			<Radio
				data-testid="radio-violet"
				{...controlProps('violet')}
				color="secondary"
			/>
			<Radio
				data-testid="radio-grey"
				{...controlProps('grey')}
				color="default"
			/>
			<Radio
				data-testid="radio-pink"
				{...controlProps('pink')}
				sx={{
					color: pink[800],
					'&.Mui-checked': {
						color: pink[600],
					},
				}}
			/>
			<Radio
				data-testid="radio-orange"
				{...controlProps('orange')}
				sx={{
					color: orange[800],
					'&.Mui-checked': {
						color: orange[600],
					},
				}}
			/>
		</div>
	);
}