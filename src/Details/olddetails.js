<Grid container spacing={16} direction="row">

  <Grid item xs={6} container direction="column">

    <Grid item xs={12}>
      <Typography>{dish.title}</Typography>
    </Grid>

    <Grid item xs={12}>
      <img src={dish.image} />
    </Grid>

    <Grid item xs={12}>
      <Typography>lorem ipsum</Typography>
    </Grid>

    <Grid item xs={12}>
      <Link to="/search">
        <button>Back to search</button>
      </Link>
    </Grid>

    <Grid item xs={12}>
      <Typography>Preparation</Typography>
    </Grid>

    <Grid item xs={12}>
      <Typography>{dish.instructions}</Typography>
    </Grid>

  </Grid>

  <Grid item xs={6} container>
    <Card>
      <CardContent>
        <Typography>Ingredients for {guests} people</Typography>
        <Divider variant="middle" />
        <Table>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.amount * guests} {row.unit}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Divider variant="middle" />
        <Grid container>
          <Grid item xs={10}>
            <button>Add to menu</button>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              Price: {guests * dish.pricePerServing}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>

</Grid>