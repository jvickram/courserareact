import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// Push comment in the redux store
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload:  comment
});

// Posting the comment to the server
export const postComment = (dishId, rating, author, comment ) => (dispatch) => {

    const newComment = {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
    newComment.date = new Date().toISOString()

    return fetch(baseUrl + 'comments',{
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(res => res.json())
    .then(response => dispatch(addComment(response)))
    .then(error => { console.log("Post comments", error.message)
            alert('Your comment could not be posted\n Error: '+error.message)})
}

// Thunk Implementaion for Fetching Dishes with Fetch for server call
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
}

// Normal Actions for Dishes
export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess 
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})


// Thunk Implementaion for Fetching Comments
export const fetchComments = () => (dispatch) => {    
    return fetch(baseUrl + 'comments')
    .then(
        response => {
            if(response.ok) {
                return response;
            }
            else {
                var error = new Error("Error " + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

// Normal Actions for Comments
export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


// Thunk Implementaion for Fetching Promos
export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
}

// Normal Actions for Promos
export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

// Thunk Implementaion for Fetching Leaders
export const fetchLeaders = () => (dispatch) => {
    
    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

// Normal Actions for Leaders
export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

// Posting the Feedback to the server
export const postFeedback = (feedback ) => (dispatch) => {

    return fetch(baseUrl + 'feedback',{
        method: 'POST',
        body: JSON.stringify(feedback),
        headers: {
            'Content-Type':'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
            if (response.ok) {
            return response;
            } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(res => res.json())
    .then(response => alert("Thank you for your feedback. \n Feedback: "+ JSON.stringify(response) ))
    .catch(error => { console.log("Post feedback", error.message);
            alert('Your feedback could not be posted\n Error: '+ error.message)
        })
}