import { makeStyles } from '@material-ui/styles'

export const postStyles = makeStyles({
    container:{
        color: '#333',
        fontSize: 13,
    },
    visibleDeleteicon: {
        visibility: 'visible',
    },
    invisibleDeleteicon: {
        visibility: 'hidden',
    },
    tableRow: {
        backgroundColor: '#fff',
        border: '1px #ccc',
        '&&:hover':{
            backgroundColor: '#fafafa'
        }
    },
    author: {
        color: '#999'
    },
})