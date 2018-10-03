const mockApidata = [
  {
    id: 1,
    name: 'Enter Sandmen',
  },
  {
    id: 3,
    name: 'Welcoe Home',
  },
  {
    id: 3,
    name: 'Master of Puppets',
  },
  {
    id: 4,
    name: 'Fade to Black',
  },
];

export const getTracks = () => dispatch => {
  setTimeout(() => {
    console.log('I got tracks');
    dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: mockApidata });
  }, 2000);
};
