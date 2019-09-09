import React, { useState, useEffect } from 'react'

import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { isToday, isYesterday, format, fromUnixTime } from 'date-fns'
import { postStyles } from './styles'

const Post = () => {
  const [values, setValues] = useState({
    row: -1,
    loaded: false,
    loadFailed: false,
    rows: [],
  })

  useEffect(() => {
    axios
      .post('http://localhost:5000/api/posts/refresh')
      .then((res: any) => loadDataHandler())
      .catch((res: any) => setValues({ ...values, loadFailed: true }))
  }, [])

  const classes = postStyles()

  const loadDataHandler = (flag?: boolean) =>
    flag || !values.loaded
      ? axios.get('http://localhost:5000/api/posts').then((res: any) =>
          setValues({
            ...values,
            rows: res.data
              .map((item: any) => ({
                id: item.objectID,
                title: `${item.title}.`,
                author: item.author,
                timestamp: item.created_at,
                created_at: isToday(fromUnixTime(item.created_at))
                  ? format(fromUnixTime(item.created_at), 'p')
                  : isYesterday(fromUnixTime(item.created_at))
                  ? 'Yesterday'
                  : format(fromUnixTime(item.created_at), 'LLL dd'),
                url: item.url,
              }))
              .sort((itemA: any, itemB: any) => (itemA.timestamp > itemB.timestamp ? -1 : 1)),
            loaded: true,
          })
        )
      : null

  const openInNewTab = (event: any) => {
    const obj: any = values.rows[event.currentTarget.id]
    const tab = window.open(obj.url, '_blank')
    if (tab) tab.focus()
  }

  loadDataHandler()
  const makeVisibleHandler = (event: any) =>
    setValues({ ...values, row: parseInt(event.currentTarget.id) })
  const makeInvisibleHandler = () => setValues({ ...values, row: -1 })
  const deleteHandler = (event: any) => {
    event.stopPropagation()
    axios
      .delete(`http://localhost:5000/api/posts/${event.currentTarget.id}`)
      .then((res: any) => loadDataHandler(true))
      .catch(err => console.log(err))
  }

  return (
    <Table className={classes.container} onMouseLeave={makeInvisibleHandler}>
      <TableBody>
        {values.rows.length > 0 ? (
          values.rows.map((row: any, index: any) => (
            <TableRow
              hover={true}
              key={index}
              onMouseOver={makeVisibleHandler}
              id={index}
              className={classes.tableRow}
              onClick={openInNewTab}
            >
              <TableCell align="left">
                {row.title} <span className={classes.author}>{` - ${row.author} -`}</span>
              </TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  size="small"
                  id={row.id}
                  className={
                    values.row === index ? classes.visibleDeleteicon : classes.invisibleDeleteicon
                  }
                  onClick={deleteHandler}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : values.loadFailed ? (
          <TableRow
            hover={true}
            key={0}
            onMouseOver={makeVisibleHandler}
            className={classes.tableRow}
          >
            <TableCell align="center">{'Fallò la conexión con el servidor'}</TableCell>
          </TableRow>
        ) : (
          <TableRow
            hover={true}
            key={0}
            onMouseOver={makeVisibleHandler}
            className={classes.tableRow}
          >
            <TableCell align="center">{'Cargando datos ...'}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default Post
