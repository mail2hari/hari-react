import * as React from 'react';
import './style.css';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField ';
import List from '@mui/material/List ';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
export default function App() {
  const [searchText, setSearchText] = React.useState('');
  const [searchYear, setSearchYear] = React.useState('');
  const [showLoader, setShowLoader] = React.useState(false);
  const [movieList, setMovieList] = React.useState([]);
  const [nominations, setNomiations] = React.useState([]);
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
    setShowLoader(true);
  };
  const handleYear = (event) => {
    setSearchYear(event.target.value);
  };
  const handleSearchClick = () => {
    //y
    const url =
      'https://omdbapi.com/?apikey=f97600ae&' +
      (searchText ? 's=' + searchText : '') +
      (searchYear ? '&y=' + searchYear : '');
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response == 'True') {
          setMovieList(data.Search);
        } else {
          setMovieList([]);
        }
        setShowLoader(false);
      });
  };
  const nominateMovie = (movie) => {
    let tempNominations = [...nominations];
    tempNominations.push(movie);
    setNomiations(tempNominations);
  };
  const removeMovie = (movie) => {
    let tempNominations = nominations.filter(
      (item) => item.imdbID != movie.imdbID
    );
    setNomiations(tempNominations);
  };
  const checkAvailable = (movie) => {
    return (
      nominations.length >= 5 ||
      !nominations.every((item) => item.imdbID != movie.imdbID)
    );
  };
  return (
    <div style={{ background: '#ccc', height: '100vh' }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item sm={12}>
            <Paper
              elevation={1}
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
              <Grid container spacing={1}>
                <Grid item sm={5}>
                  <TextField
                    size={'small'}
                    label="Titile"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleSearch}
                  />
                </Grid>
                <Grid item sm={5}>
                  <TextField
                    size={'small'}
                    label="Year"
                    type={'number'}
                    value={searchYear}
                    inputProps={{ 'aria-label': 'search google maps' }}
                    onChange={handleYear}
                  />
                </Grid>
                <Grid item sm={1}>
                  <Button
                    variant={'contained'}
                    size={'small'}
                    onClick={handleSearchClick}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              {searchText ? 'Search for "' + searchText + '"' : 'no date'}
              <List>
                {movieList &&
                  movieList.map((item) => {
                    return (
                      <ListItem
                        key={item.imdbID}
                        secondaryAction={
                          <Button
                            edge="end"
                            size={'small'}
                            variant="contained"
                            aria-label="delete"
                            onClick={() => nominateMovie(item)}
                            disabled={checkAvailable(item)}
                          >
                            Nominate
                          </Button>
                        }
                      >
                        {item.Title}
                      </ListItem>
                    );
                  })}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3}>
              <List>
                {nominations &&
                  nominations.map((item) => {
                    return (
                      <ListItem
                        key={item.imdbID}
                        secondaryAction={
                          <Button
                            edge="end"
                            size={'small'}
                            variant="contained"
                            aria-label="delete"
                            onClick={() => removeMovie(item)}
                          >
                            Remove
                          </Button>
                        }
                      >
                        {item.Title}
                      </ListItem>
                    );
                  })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
