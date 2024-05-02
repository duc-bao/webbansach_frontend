import { Button, Icon } from "@mui/material";
import { useState } from "react"
import BookModel from "../../../models/BookModel";

interface SelectQuantityProps {
	max: number | undefined;
	setQuantity?: any;
	quantity?: number;
	add?: any;
	reduce?: any;
	book?: BookModel;
}
const SelectQuantity:React.FC<SelectQuantityProps> = (props) =>{
    const [quantity, setQuantity] = useState(1);
    const reduce = () => {
        setQuantity(quantity - 1);
    }
    const add = () =>{
        setQuantity(quantity + 1);
    }
    return (
        <div className='wrapper-select-quantity d-flex align-items-center rounded'>
			<Button size='small' onClick={() => reduce()}>
				<Icon>remove</Icon>
			</Button>
			<input
				type='number'
				className='inp-number p-0 m-0'
				value={quantity}
				onChange={(e) => setQuantity(parseInt(e.target.value))}
				min={1}
				max={99}
			/>
			<Button size='small' onClick={() => add()}>
				<Icon>add</Icon>
			</Button>
		</div>
    )
}

export default SelectQuantity