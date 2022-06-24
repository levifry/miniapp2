  /*

    apiReq({method, path, payload}, callback)
      adding a lot of movies at once: apiReq('add', 'movies', ['twister','spiderman'])
      modifying a lot of movies at once: apiReq('update', 'movies', [['twister', 'a swirling cloud'],['spiderman', 'flying man-child']])
      deleting a lot of movies at once: apiReq('delete', 'movies', ['twister','spiderman'])
      get all movies: apiReq('get', 'movies')
      get a single movie: apiReq('get', 'movies', 'twister')

  */
 
const apiReq = async (options, callback) => {

  const { method, path, payload } = options

  const runFetch = async () => {

    if (method === 'get') {
      const response = await fetch(`http://localhost:3001/api/${path}`)
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const result = await response.json();
      if (callback) return callback(result);
      console.log('No callback supplied to apiReq');
    }

    if (method === 'post') {
      const response = await fetch(`http://localhost:3001/api/${path}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const result = await response;
      if (callback) return callback(result);
      console.log('No callback supplied to apiReq');
    }

    if (method === 'delete') {
      const response = await fetch(`http://localhost:3001/api/${path}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: payload })
      });
      
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      // const result = await response.text();
      if (callback) return callback();
      console.log('No callback supplied to apiReq');
    }

  }
  
  try {
    return await runFetch();
  } catch (error) {
    return console.log(error.message);
  }

 }

export default apiReq

