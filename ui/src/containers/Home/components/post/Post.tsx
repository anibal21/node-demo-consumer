import React, { useState } from 'react'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { postStyles } from './styles'

function createData(name: string, calories: number, fat: number) {
    return { name, calories, fat};
}

const rows = [
    createData('Frozen yoghurt', 159, 1),
    createData('Ice cream sandwich', 237, 1),
    createData('Eclair', 262, 1),
    createData('Cupcake', 305, 1),
    createData('Gingerbread', 356, 1),
];


const Post = () => {

    const [values, setValues] = useState({
        row: -1,
    })

    const classes = postStyles()

    const makeVisibleHandler = (event: any) => setValues({ ...values, row: parseInt(event.currentTarget.id) })
    const makeInvisibleHandler = () => setValues({ ...values, row: -1 })

    return <Table className={classes.container} onMouseLeave={makeInvisibleHandler}>
        <TableBody>
            {rows.map((row: any,index: any) => (
                <TableRow hover={true} key={row.name} onMouseOver={makeVisibleHandler} id={index}>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right" >
                <IconButton aria-label="delete" size="small" className={values.row === index ? classes.visibleDeleteicon : classes.invisibleDeleteicon}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </TableCell>

                </TableRow>
            ))}
        </TableBody>
    </Table>
}

export default Post